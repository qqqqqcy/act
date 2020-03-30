import render from "./render";

function mapProps(props = {}, element) {
  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      const val = props[key];
      if (key === "className") {
        element.setAttribute("class", val);
      } else {
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
  mount() {}
}

// 基础类型
export class StringNode extends VTreeNode {
  constructor(vNode) {
    super(vNode, "string");
  }
  mount() {
    const textNode = document.createTextNode(String(this.vNode));
    return textNode;
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
      children.map(child => {
        const vTreeNode = render(child);
        element.appendChild(vTreeNode.mount());
      });
    return element;
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
    const vTreeNode = render(fNode.tagType(fNode.props));
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

    const vTreeNode = render(this.instance.render());
    const mounted = vTreeNode.mount();
    // RECORD

    // this.instance._vTreeNode = vTreeNode;
    this.instance._element = mounted;
    this.instance._classNode = this;

    return mounted;
  }

  update() {
    this.instance.componentWillUpdate?.();
    const newVTreeNode = render(this.instance.render());
    const oldElement = this.instance._element,
      parentELement = oldElement.parentElement;

    const newElement = newVTreeNode.mount();

    parentELement.insertBefore(newElement, oldElement);
    parentELement.removeChild(oldElement);

    this.instance._element = newElement;
  }
}
