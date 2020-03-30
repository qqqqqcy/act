export default class Component {
    constructor(props = {}) {
        this.state = {};
        this.props = props;
        this._isInstance = true;
    }
    setState(newState) {
        Object.assign(this.state, newState);
        this.updateComponent();
    }
    updateComponent() {
        const instance = this;
        instance._classNode.update();
    }
    componentWillMount() { }
    componentWillUpdate() { }
    render() { }
}
