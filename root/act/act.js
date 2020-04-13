import createElement from "./createElement";
import getLeafFromVNode from "./render";
import Component from "./component";

export default {
  createElement,
  h: createElement,
  Component,
  render: (vNode, container) => {
    container.innerHTML = "";
    const leaf = getLeafFromVNode(vNode);
    container.appendChild(leaf.mount());
  },
};
