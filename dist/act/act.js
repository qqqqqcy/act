import createElement from "./createElement";
import render from "./render";
import Component from "./component";
export default {
    createElement,
    h: createElement,
    Component,
    render: (vnode, container) => {
        container.innerHTML = "";
        const { vDom, vNodeAttr } = render(vnode);
        container.appendChild(vDom);
    }
};
