// import Act from "./act";
import render from "./render";

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
    if (instance._element) {
      const oldElement = instance._element,
        parentELement = oldElement.parentElement;
      const { vDom: newElement, vNodeAttr } = render(instance);
      parentELement.insertBefore(newElement, oldElement);
      parentELement.removeChild(oldElement);
    }
  }
  componentWillMount() {}
  componentWillUpdate() {}
  render() {}
}
