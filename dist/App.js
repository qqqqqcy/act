import { Component } from "./src/component/index";
const simpleJSX = (React.createElement("div", { className: "simpleJSX", style: "background: yellow" },
    "Hello!",
    1,
    React.createElement("span", null, "Wolrd"),
    React.createElement("br", null),
    ["1", "2", "3"].map((val) => (React.createElement("p", null, val)))));
class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.name = "MyComponent";
        this.addNum = () => {
            this.setState({ num: this.state.num + 1 });
        };
        this.state.num = props.val;
    }
    render() {
        const { num } = this.state;
        return (React.createElement("div", { className: "wrap", style: "background: red" },
            "Hello!",
            React.createElement("p", null, "Wolrd"),
            React.createElement("button", { onClick: this.addNum }, "add"),
            "num\uFF1A",
            num,
            simpleJSX));
    }
}
export default class App extends Component {
    render() {
        return React.createElement(MyComponent, { val: 10 });
    }
}
