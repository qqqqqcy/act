import { VNode } from "./vnode/index";
function renderChildren(domNode, children) {
    children?.map(child => {
        /**
         * 处理 child 的多种情况
         * 1. 数组 => 递归 render
         * 2. VNode => 递归 render
         * 3. 其他简单类型 => 转换为对应字符串
         */
        if (Array.isArray(child)) {
            child.map(item => render(item, domNode));
            return;
        }
        else if (child instanceof VNode) {
            render(child, domNode);
        }
        else {
            if (typeof child === "boolean")
                child = "";
            if (typeof child === "number")
                child = "" + child;
            child = !child ? "" : child;
            domNode.append(child);
        }
    });
}
function mapProps(domNode, props) {
    Object.entries(props).map(([key, val]) => {
        if (key === "children") {
            renderChildren(domNode, val);
        }
        else if (key === "className") {
            domNode.setAttribute("class", val);
        }
        else if (key[0] === "o" && key[1] === "n") {
            domNode[key.toLocaleLowerCase()] = val;
        }
        else {
            if (typeof val === "boolean" && val) {
                domNode.setAttribute(key, "");
            }
            else {
                domNode.setAttribute(key, val);
            }
        }
    });
}
function render(VNode, container) {
    const { tagName, props } = VNode;
    if (!tagName)
        return;
    let domNode;
    if (typeof tagName === "string") {
        // 原生 dom
        domNode = document.createElement(tagName);
        mapProps(domNode, props);
    }
    else if (typeof tagName === "function") {
        // Class dom
        domNode = createElementFromVNode(VNode, container);
    }
    container?.appendChild(domNode);
    return domNode;
}
function createElementFromVNode(VNode, container) {
    const { tagName: ComponentClass, props } = VNode;
    const instance = new ComponentClass(props);
    const renderedVnode = instance.render();
    // 备份 VNode
    const domNode = render(renderedVnode, container);
    instance.VNode = renderedVnode;
    instance.container = container;
    instance.oldDom = domNode;
    return domNode;
}
export default render;
