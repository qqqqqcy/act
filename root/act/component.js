import Act from "./act";

export default class Component {
  constructor(props = {}) {
    this.state = {};
    this.props = props;
  }

  setState(newState) {
    Object.assign(this.state, newState);
    if (this._container) {
      console.log(this);
      Act.render(this.render(), this._container);
    }
  }

  componentWillMount() {}

  render() {}
}
