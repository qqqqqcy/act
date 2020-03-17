import render from "../render";
export class Component {
    constructor(props) {
        this.props = props; //组件的props
        this.state = {}; //组件的state
        // this.nextState = null; //组件的下一个state，用于更新
    }
    setState(partialState) {
        Object.assign(this.state, partialState);
        // this.state = { ...this.state, ...partialState };
        // console.log(this.state);
        const oldVNode = this.VNode;
        const newVNode = this.render();
        updateComponent(this, oldVNode, newVNode);
    }
    render() { } //用户会 重写这个方法，所以我们就放一个壳子在这里
}
function updateComponent(instance, oldVnode, newVnode) {
    const newDom = render(newVnode);
    instance.container.insertBefore(newDom, instance.oldDom);
    instance.container.removeChild(instance.oldDom);
    instance.oldDom = newDom;
}
