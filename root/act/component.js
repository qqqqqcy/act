// import Act from "./act";
import render from "./render";

export default class Component {
  isComponent = true;

  constructor(props = {}) {
    this.state = {};
    this.props = props;
  }
  setState(newState) {
    Object.assign(this.state, newState);
    if (this._element) {
      // Act.render(this.render(), this._container);
      const oldElement = this._element,
        newElement = render(this),
        parentELement = oldElement.parentElement;
      parentELement.insertBefore(newElement, oldElement);
      parentELement.removeChild(oldElement);
    }
  }

  componentWillMount() {}
  componentWillUpdate() {}

  render() {}
}
