import changeVNodeToVTreeNode from "./render";
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
class VTreeNode {
    constructor(vNode, type = "element") {
        this.vNode = vNode;
        /**
         * element 元素 Dom
         * string 字符串
         * class 类组件
         * function 函数组件
         */
        this.nodeType = type;
    }
    // 获取真实 Dom
    mount() { }
}
// 基础类型
export class StringNode extends VTreeNode {
    constructor(vNode) {
        super(vNode, "string");
    }
    mount() {
        const textNode = document.createTextNode(String(this.vNode));
        return (this._textNode = textNode);
    }
    update(vNode) {
        this._textNode.deleteData(0, this.vNode.length);
        this._textNode.appendData(vNode);
    }
}
/**
 * 标准 Node
 * vNode: {  tagType: 'div'
 *    props: {id:...,onClick...}
 *    children:['hello',vNode,cNode...] }
 */
export class ElementNode extends VTreeNode {
    constructor(vNode) {
        super(vNode);
    }
    mount() {
        const { tagType, props, children } = this.vNode;
        const element = document.createElement(tagType);
        mapProps(props, element);
        if (children)
            this._children = children.map(child => {
                const vTreeNode = changeVNodeToVTreeNode(child);
                element.appendChild(vTreeNode.mount());
                return vTreeNode;
            });
        return (this._element = element);
    }
    update(newElementVNode) {
        const props = this.vNode.props || {};
        const newProps = newElementVNode.props || {};
        this.vNode = newElementVNode;
        // 更新属性
        this._updateDOMProperties(props, newProps);
        this._updateDOMChildren(newElementVNode.children);
    }
    //   更新属性
    _updateDOMProperties(props, newProps) {
        Object.keys(props).map(key => {
            if (props.hasOwnProperty(key) && !newProps.hasOwnProperty(key)) {
                if (key === "className") {
                    this._element.removeAttribute("class");
                }
                else {
                    this._element.removeAttribute(key);
                }
            }
        });
        mapProps(newProps, this._element);
    }
    //   更新子节点
    _updateDOMChildren(newChildren) {
        const children = this._children;
        newChildren.map((vNode, idx) => {
            const currentVTreeNode = changeVNodeToVTreeNode(vNode);
            if (currentVTreeNode.nodeType === children[idx].nodeType) {
                children[idx].update(vNode);
            }
        });
        // console.log(newChildren);
        // console.log(this._children);
    }
}
/**
 * Function Node
 * vNode: {  tagType: (props)=>{...}
 *    props: {id:...,onClick...}
 *    children:[] }
 */
export class FunctionNode extends VTreeNode {
    constructor(vNode) {
        super(vNode, "function");
    }
    mount() {
        const fNode = this.vNode;
        const vTreeNode = changeVNodeToVTreeNode(fNode.tagType(fNode.props));
        return vTreeNode.mount();
    }
}
/**
 * Class Node
 * vNode: {  tagType: Class { constructor(props){}...}
 *    props: {id:...,onClick...}
 *    children:[] }
 */
export class ClassNode extends VTreeNode {
    constructor(vNode) {
        super(vNode, "class");
    }
    mount() {
        this.instance = new this.vNode.tagType(this.vNode.props);
        this.instance.componentWillMount?.();
        this._elementVNode = this.instance.render();
        const vTreeNode = changeVNodeToVTreeNode(this._elementVNode);
        const mounted = vTreeNode.mount();
        // RECORD
        this._vTreeNode = vTreeNode;
        this._element = mounted;
        this.instance._classNode = this;
        return mounted;
    }
    update(newVNode, newState) {
        this.vNode = newVNode || this.vNode;
        const instance = this.instance;
        // 获取新的state,props
        const nextState = { ...instance.state, ...newState };
        const nextProps = this.vNode.props;
        instance.componentWillUpdate?.();
        // 更改state,props
        instance.state = nextState;
        instance.props = nextProps;
        const newElementVNode = instance.render();
        const newVTreeNode = changeVNodeToVTreeNode(newElementVNode);
        if (newElementVNode?.tagType === this._elementVNode?.tagType) {
            // 更新
            this._vTreeNode.update(newElementVNode);
        }
        else {
            const oldElement = this._element, parentELement = oldElement.parentElement;
            const newElement = newVTreeNode.mount();
            parentELement.insertBefore(newElement, oldElement);
            parentELement.removeChild(oldElement);
            this._element = newElement;
        }
    }
}
