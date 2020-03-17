export class Component {
    constructor(props) {
        this.state = {};
        this.props = props; //组件的props
        this.state = this.state || {}; //组件的state
        // this.nextState = null; //组件的下一个state，用于更新
    }
    setState(partialState) {
        //看下面的解释
    }
    render() { } //用户会 重写这个方法，所以我们就放一个壳子在这里
}
