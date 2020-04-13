import getLeafFromVNode from "./render";
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
export class TextLeaf extends VTreeNode {
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
export class ElementLeaf extends VTreeNode {
    constructor(vNode) {
        super(vNode);
    }
    mount() {
        const { tagType, props, children } = this.vNode;
        const element = document.createElement(tagType);
        mapProps(props, element);
        if (children)
            this._children = children.map(child => {
                const leaf = getLeafFromVNode(child);
                element.appendChild(leaf.mount());
                return leaf;
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
            const currentVTreeNode = getLeafFromVNode(vNode);
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
export class FunctionLeaf extends VTreeNode {
    constructor(vNode) {
        super(vNode, "function");
    }
    mount() {
        const fNode = this.vNode;
        const leaf = getLeafFromVNode(fNode.tagType(fNode.props));
        return leaf.mount();
    }
}
/**
 * Class Node
 * vNode: {  tagType: Class { constructor(props){}...}
 *    props: {id:...,onClick...}
 *    children:[] }
 */
export class ClassLeaf extends VTreeNode {
    constructor(vNode) {
        super(vNode, "class");
    }
    mount() {
        var _a, _b;
        this.instance = new this.vNode.tagType(this.vNode.props);
        (_b = (_a = this.instance).componentWillMount) === null || _b === void 0 ? void 0 : _b.call(_a);
        this._elementVNode = this.instance.render();
        const leaf = getLeafFromVNode(this._elementVNode);
        const mounted = leaf.mount();
        // RECORD
        this._leaf = leaf;
        this._element = mounted;
        this.instance._classLeaf = this;
        return mounted;
    }
    update(newVNode, newState) {
        var _a, _b;
        this.vNode = newVNode || this.vNode;
        const instance = this.instance;
        // 获取新的state,props
        const nextState = Object.assign(Object.assign({}, instance.state), newState);
        const nextProps = this.vNode.props;
        (_a = instance.componentWillUpdate) === null || _a === void 0 ? void 0 : _a.call(instance);
        // 更改state,props
        instance.state = nextState;
        instance.props = nextProps;
        const newElementVNode = instance.render();
        const newVTreeNode = getLeafFromVNode(newElementVNode);
        if ((newElementVNode === null || newElementVNode === void 0 ? void 0 : newElementVNode.tagType) === ((_b = this._elementVNode) === null || _b === void 0 ? void 0 : _b.tagType)) {
            // 本质还是 update ElementLeaf
            this._leaf.update(newElementVNode);
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
