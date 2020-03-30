import createElement from "./createElement";
import render from "./render";
import Component from "./component";
export default {
    createElement,
    h: createElement,
    Component,
    render: (vnode, container) => {
        container.innerHTML = "";
        const vTreeNode = render(vnode);
        container.appendChild(vTreeNode.mount());
    }
};
