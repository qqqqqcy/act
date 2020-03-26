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
function getVNodeFromFunction(fNode) {
    return fNode.tagType(fNode.props);
}
function getVNodeFromClass(cNode) {
    // 可能传进来 instance 或 Class
    const instance = cNode.render ? cNode : new cNode.tagType(cNode.props);
    return instance;
}
//
// Node 包括 Document, Element, CharacterData(Parent of Text, Comment, etc.).
// Render vNode to VDom
export default function render(vNode, vNodeAttr = { children: [], nodeType: "element" }) {
    vNode = vNode === null || vNode === undefined ? "" : vNode;
    vNode = typeof vNode === "boolean" ? "" : vNode;
    vNode = typeof vNode === "number" ? vNode + "" : vNode;
    /**
     * Text Node
     * vNode: 'hello world'
     */
    if (typeof vNode === "string") {
        const textNode = document.createTextNode(String(vNode));
        vNodeAttr.nodeType = "string";
        return { vDom: textNode, vNodeAttr };
    }
    /**
     * Class Node
     * vNode: {  tagType: Class { constructor(props){}...}
     *    props: {id:...,onClick...}
     *    children:[] }
     */
    let cNode, instance;
    if (vNode._isInstance ||
        (typeof vNode.tagType === "function" && vNode.tagType.prototype?.render)) {
        cNode = vNode;
        instance = getVNodeFromClass(vNode);
        if (instance._element) {
            instance.componentWillUpdate?.();
        }
        else {
            instance.componentWillMount?.();
        }
        vNode = instance.render();
    }
    /**
     * Function Node
     * vNode: {  tagType: (props)=>{...}
     *    props: {id:...,onClick...}
     *    children:[] }
     */
    let fNode;
    if (typeof vNode.tagType === "function") {
        fNode = vNode;
        vNode = getVNodeFromFunction(fNode);
    }
    /**
     * 标准 Node
     * vNode: {  tagType: 'div'
     *    props: {id:...,onClick...}
     *    children:['hello',vNode,cNode...] }
     */
    const { tagType, props, children } = vNode;
    const element = document.createElement(tagType);
    if (instance) {
        instance._element = element;
        instance._cNode = cNode;
    }
    mapProps(props, element);
    if (children)
        children.map(child => {
            const { vDom: childVDom, vNodeAttr: childVNodeAttr } = render(child);
            element.appendChild(childVDom);
            vNodeAttr.children.push(childVNodeAttr);
        });
    return { vDom: element, vNodeAttr };
}
