export default class Component {
    constructor(props = {}) {
        this.leaf = {};
        this.state = {};
        this.props = props;
    }
    setState(newState) {
        this.leaf.update(null, newState);
    }
    componentWillMount() { }
    componentWillUpdate() { }
    render() { }
}
