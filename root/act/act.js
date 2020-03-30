import createElement from "./createElement";
import changeVNodeToVTreeNode from "./render";
import Component from "./component";

export default {
  createElement,
  h: createElement,
  Component,
  render: (vNode, container) => {
    container.innerHTML = "";
    const vTreeNode = changeVNodeToVTreeNode(vNode);
    container.appendChild(vTreeNode.mount());
  }
};
