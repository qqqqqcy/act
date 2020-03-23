function mapProps(props = {}, element) {
    for (const key in props) {
        if (props.hasOwnProperty(key)) {
            const val = props[key];
            if (key === "className") {
                element.setAttribute("class", val);
            }
            else {
                element.setAttribute(key, val);
            }
        }
    }
}
function getVnodeFromFunction(Vnode, container) {
    if (typeof Vnode.tagName === "function") {
        const { tagName, props } = Vnode;
        if (tagName.prototype?.render) {
            // Class
            Vnode = new tagName(props);
            if (Vnode._container) {
                Vnode.componentWillUpdate && Vnode.componentWillUpdate();
            }
            else {
                Vnode.componentWillMount && Vnode.componentWillMount();
            }
            Vnode._container = container;
            return getVnodeFromFunction(Vnode.render(), container);
        }
        else {
            // Function
            return getVnodeFromFunction(tagName(props), container);
        }
    }
    return Vnode;
}
export default function render(Vnode, container) {
    // 简单类型
    Vnode = Vnode === null || Vnode === undefined ? "" : Vnode;
    Vnode = typeof Vnode === "boolean" ? "" : Vnode;
    Vnode = typeof Vnode === "number" ? Vnode + "" : Vnode;
    if (typeof Vnode === "string") {
        const textNode = document.createTextNode(String(Vnode));
        container.appendChild(textNode);
    }
    // Class or Function
    Vnode = getVnodeFromFunction(Vnode, container);
    // Element Vnode
    const { tagName, props, children } = Vnode;
    const element = document.createElement(tagName);
    mapProps(props, element);
    if (children)
        children.map(child => render(child, element));
    container.appendChild(element);
}
