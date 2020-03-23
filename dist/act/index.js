import Act from "./act";
// setInterval(() => {
// const App = ({ className }) => (
//   <div>
//     <h1>hello!</h1>
//     world!
//     <p className={className}>{new Date().toLocaleTimeString()}</p>
//   </div>
// );
const Welcome = ({ name }) => {
    return Act.h("p", null, name);
};
// class Welcome extends Act.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return <p>{this.props.name}</p>;
//   }
// }
class App extends Act.Component {
    constructor(props) {
        super(props);
        this.state = {
            val: new Date().toLocaleTimeString()
        };
    }
    componentWillMount() {
        console.log("componentWillMount");
        setInterval(() => {
            this.setState({ val: new Date().toLocaleTimeString() });
        }, 1000);
    }
    render() {
        return (
        // <div className={this.props.className}>
        Act.h(Welcome, { name: this.state.val })
        // <p>{this.state.val}</p>
        // {new Date().toLocaleTimeString()}
        // </div>
        );
    }
}
Act.render(Act.h(App, { className: "content" }), document.getElementById("root"));
// }, 1000);
// const Welcome = ({ name }) => {
//   return <p>{name}</p>;
// };
// const App = ({ className }) => {
//   return (
//     <div className={className}>
//       <Welcome name="zhang3" />
//       {new Date().toLocaleTimeString()}
//     </div>
//   );
// };
// Act.render(<App className="content" />, document.getElementById("root"));
// class App extends Act.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       val: 1
//     };
//   }
//   render() {
//     return (
//       <div className={this.props.className}>
//         <p>{this.val}</p>
//         {new Date().toLocaleTimeString()}
//       </div>
//     );
//   }
// }
// Act.render(<App className="content" />, document.getElementById("root"));
// console.log(<App className="content" />);