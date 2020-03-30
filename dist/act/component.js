export default class Component {
    constructor(props = {}) {
        this.state = {};
        this.props = props;
    }
    setState(newState) {
        const instance = this;
        instance._classNode.update(null, newState);
    }
    componentWillMount() { }
    componentWillUpdate() { }
    render() { }
}
