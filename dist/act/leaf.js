import getLeafFromVNode from "./render";
import { childrenLeafToMap, shouldUpdate, patch, UPDATE_TYPES } from "./utils";
let updateDepth = 0;
// 全局的更新队列
let diffQueue = [];
class Leaf {
    constructor(type, vNode) {
        this.key = vNode.key;
        /**
         * elementVNode 元素 Dom
         * textVNode 字符串
         * classVNode 类组件
         * functionVNode 函数组件
         */
        this.vNodeType = type;
    }
    // 获取真实 Dom
    mount() { }
    update() { }
}
/**
 * 基础类型 Node
 * vNode: 'hello world'
 * textVNode
 */
export class TextLeaf extends Leaf {
    constructor(vNode) {
        super("textVNode", vNode);
        this.textVNode = vNode;
    }
    mount() {
        const dom = document.createTextNode(String(this.textVNode));
        return (this.dom = dom);
    }
    update(textVNode) {
        if (this.textVNode === textVNode)
            return this.dom;
        this.textVNode = textVNode;
        const dom = document.createTextNode(String(this.textVNode));
        const parentElement = this.dom.parentElement;
        parentElement.insertBefore(dom, this.dom);
        parentElement.removeChild(this.dom);
        this.dom = dom;
    }
}
/**
 * 标准 Node
 * vNode: {
 *    tagType: 'div'
 *    props: {id:...,onClick...}
 *    children:['hello',vNode,vNode...]
 * }
 * elementVNode
 */
export class ElementLeaf extends Leaf {
    constructor(vNode) {
        super("elementVNode", vNode);
        this.elementVNode = vNode;
    }
    mount() {
        const { tagType, props, children } = this.elementVNode;
        const dom = document.createElement(tagType);
        this.dom = dom;
        this._mapProps(props, dom);
        if (children)
            this.childrenLeaf = children.map((child, index) => {
                const leaf = getLeafFromVNode(child);
                leaf.mountIndex = index;
                leaf.fatherLeaf = this;
                this.dom.appendChild(leaf.mount());
                return leaf;
            });
        return this.dom;
    }
    _mapProps(props) {
        if (!props)
            return;
        Object.keys(props).map((key) => {
            const val = props[key];
            if (key === "className") {
                this.dom.setAttribute("class", val);
            }
            else if (key[0] === "o" && key[1] === "n") {
                this.dom[key.toLocaleLowerCase()] = val;
            }
            else {
                this.dom.setAttribute(key, val);
            }
        });
    }
    update(elementVNode) {
        const props = this.elementVNode.props || {};
        const newProps = elementVNode.props || {};
        this.elementVNode = elementVNode;
        // 更新属性
        this._updateProps(props, newProps);
        // 更新子节点
        this._updateChildrenLeaf(elementVNode.children);
    }
    //   更新属性
    _updateProps(props, newProps) {
        Object.keys(props).map((key) => {
            // 移除 newProps 中没有的 prop
            if (!newProps.hasOwnProperty(key)) {
                if (key === "className") {
                    this.dom.removeAttribute("class");
                }
                else {
                    this.dom.removeAttribute(key);
                }
            }
        });
        this._mapProps(newProps);
    }
    //   更新子节点
    _updateChildrenLeaf(elementVNodes) {
        updateDepth++;
        // 拍平
        const leafMap = childrenLeafToMap(this.childrenLeaf);
        const newLeafMap = {};
        const childrenLeaf = elementVNodes.map((elementVNode, index) => {
            const name = elementVNode.key || index.toString();
            const preLeaf = leafMap[name];
            const newLeaf = getLeafFromVNode(elementVNode);
            if (shouldUpdate(preLeaf, newLeaf)) {
                preLeaf.update(elementVNode);
                newLeafMap[name] = preLeaf;
                diffQueue.push({
                    preLeaf,
                    leaf: newLeafMap[name],
                    type: UPDATE_TYPES.MOVE_EXISTING,
                    fromIndex: preLeaf.mountIndex,
                    toIndex: index,
                });
            }
            else {
                newLeafMap[name] = newLeaf;
                diffQueue.push({
                    preLeaf,
                    leaf: newLeafMap[name],
                    type: UPDATE_TYPES.INSERT_LEAF,
                    fromIndex: null,
                    toIndex: index,
                });
            }
            // new index
            newLeafMap[name].mountIndex = index;
            newLeafMap[name].fatherLeaf = this;
            return newLeafMap[name];
        });
        Object.keys(leafMap).map((name) => {
            if (!newLeafMap[name]) {
                diffQueue.push({
                    preLeaf: leafMap[name],
                    leaf: leafMap[name],
                    type: UPDATE_TYPES.REMOVE_LEAF,
                    fromIndex: leafMap[name].mountIndex,
                    toIndex: null,
                });
            }
        });
        updateDepth--;
        if (updateDepth === 0) {
            // 具体的dom渲染
            patch(diffQueue);
            diffQueue = [];
        }
        // new index
        this.childrenLeaf = childrenLeaf;
    }
}
/**
 * Function Node
 * vNode: {
 *    tagType: (props)=>{...}
 *    props: {id:...,onClick...}
 *    children:[]
 * }
 * functionVNode
 */
export class FunctionLeaf extends Leaf {
    constructor(vNode) {
        super("functionVNode", vNode);
        this.functionVNode = vNode;
    }
    mount() {
        const render = this.functionVNode.tagType;
        this.elementVNode = render(this.functionVNode.props);
        const leaf = getLeafFromVNode(elementVNode);
        this.dom = leaf.mount();
        return this.dom;
    }
}
/**
 * Class Node
 * vNode: {
 *    tagType: Class { constructor(props){}...}
 *    props: {id:...,onClick...}
 *    children:[]
 * }
 * classVNode
 */
export class ClassLeaf extends Leaf {
    constructor(vNode) {
        super("classVNode", vNode);
        this.classVNode = vNode;
    }
    mount() {
        this.instance = new this.classVNode.tagType(this.classVNode.props);
        this.instance.componentWillMount?.();
        this.elementVNode = this.instance.render();
        const elementleaf = getLeafFromVNode(this.elementVNode);
        this.dom = elementleaf.mount();
        // RECORD
        this.elementleaf = elementleaf;
        this.instance.leaf = this;
        return this.dom;
    }
    update(classVNode, newState) {
        this.classVNode = classVNode || this.classVNode;
        const instance = this.instance;
        // 获取新的 state, props
        // const nextState = { ...instance.state, ...newState };
        // const nextProps = this.classVNode.props;
        instance.componentWillUpdate?.();
        // 更改 state, props
        instance.state = { ...instance.state, ...newState };
        instance.props = this.classVNode.props;
        const newElementVNode = instance.render();
        const newElementLeaf = getLeafFromVNode(newElementVNode);
        if (shouldUpdate(this.elementleaf, newElementLeaf)) {
            // 本质还是 update elementLeaf
            this.elementleaf.update(newElementVNode);
        }
        else {
            // 更新 dom
            const dom = this.dom, parentELement = dom.parentElement;
            const newDom = newElementLeaf.mount();
            parentELement.insertBefore(newDom, dom);
            parentELement.removeChild(dom);
            this.dom = newDom;
        }
    }
}
