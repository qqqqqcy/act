import React from "./act";
// setInterval(() => {
// const App = ({ className }) => (
//   <div>
//     <h1>hello!</h1>
//     world!
//     <p className={className}>{new Date().toLocaleTimeString()}</p>
//   </div>
// );
// const Welcome = ({ name }) => {
//   return <p>{name}</p>;
// };
class Welcome extends React.Component {
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
    componentWillUpdate() {
        console.log("componentWillUpdate");
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("p", null, this.props.val),
            React.createElement("p", null, this.state.val)));
    }
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val: new Date().toLocaleTimeString()
        };
    }
    componentWillMount() {
        // console.log("componentWillMount");
        // setInterval(() => {
        //   this.setState({ val: new Date().toLocaleTimeString() });
        // }, 1000);
    }
    componentWillUpdate() {
        // console.log("componentWillUpdate");
    }
    render() {
        return (React.createElement("div", { className: this.props.className },
            React.createElement(Welcome, { name: this.state.val }),
            React.createElement("p", null, this.state.val)));
    }
}
React.render(React.createElement(App, { className: "content" }), document.getElementById("root"));
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
// React.render(<App className="content" />, document.getElementById("root"));
// class App extends React.Component {
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
// React.render(<App className="content" />, document.getElementById("root"));
// console.log(<App className="content" />);
