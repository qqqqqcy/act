import Act from "./src/index";
import { Component } from "./src/component/index";
const simpleJSX = (Act.h("div", { className: "simpleJSX", style: "background: yellow" },
    "Hello!",
    1,
    Act.h("span", null, "Wolrd"),
    Act.h("br", null),
    ["1", "2", "3"].map(val => (Act.h("p", null, val)))));
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
        return (Act.h("div", { className: "wrap", style: "background: red" },
            "Hello!",
            Act.h("p", null, "Wolrd"),
            Act.h("button", { onClick: this.addNum }, "add"),
            "num\uFF1A",
            num,
            simpleJSX));
    }
}
export default class App extends Component {
    render() {
        return Act.h(MyComponent, { val: 10 });
    }
}
