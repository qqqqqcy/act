import Act from "./src/index";
import { Component } from "./src/component/index";

const simpleJSX = (
  <div className="simpleJSX" style="background: yellow">
    Hello!
    {1}
    <span>Wolrd</span>
    <br />
    {["1", "2", "3"].map(val => (
      <p>{val}</p>
    ))}
  </div>
);

class MyComponent extends Component {
  name = "MyComponent";
  constructor(props) {
    super(props);
    this.state.num = props.val;
  }

  addNum = () => {
    this.setState({ num: this.state.num + 1 });
  };
  render() {
    const { num } = this.state;
    return (
      <div className="wrap" style="background: red">
        Hello!
        <p>Wolrd</p>
        <button onClick={this.addNum}>add</button>
        num：{num}
        {simpleJSX}
      </div>
    );
  }
}

export default class App extends Component {
  render() {
    return <MyComponent val={10}></MyComponent>;
  }
}
