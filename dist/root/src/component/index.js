import { mapProps } from "../render";
export class Component {
    constructor(props) {
        this.props = props; //组件的props
        this.state = {}; //组件的state
        // this.nextState = null; //组件的下一个state，用于更新
    }
    setState(partialState) {
        Object.assign(this.state, partialState);
        const oldVNode = this.VNode;
        const newVNode = this.render();
        updateComponent(this, oldVNode, newVNode);
    }
    render() { } //用户会 重写这个方法，所以我们就放一个壳子在这里
}
function updateComponent(instance, oldVnode, newVnode) {
    if (oldVnode.type === newVnode.type) {
        oldVnode._domNode.innerHTML = "";
        console.log(oldVnode);
        mapProps(oldVnode._domNode, newVnode.props); //更新节点
    }
    else {
        //remove
    }
    // const newDom = render(newVnode);
    // instance.container.insertBefore(newDom as any, instance.oldDom);
    // instance.container.removeChild(instance.oldDom);
    // instance.oldDom = newDom;
}
