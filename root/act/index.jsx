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
      val: new Date().toLocaleTimeString(),
    };
  }

  componentWillMount() {
    console.log("componentWillMount");
    // setInterval(() => {
    //   this.setState({ val: new Date().toLocaleTimeString() });
    // }, 1000);
  }
  componentWillUpdate() {
    console.log("componentWillUpdate");
  }
  render() {
    const arr = [
      ["aa", "bb", "cc"],
      ["bb", "aa", "cc"],
      ["cc", "bb", "dd", "ee"],
    ];
    return (
      <div>
        <p>props.name {this.props.name}</p>
        <p>state.val {this.state.val}</p>
        <ul>
          {arr[new Date().getSeconds() % 3].map((key) => {
            return <li key={key}>{key}</li>;
          })}
        </ul>
      </div>
    );
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: "",
      val: new Date().toLocaleTimeString(),
    };
  }
  componentWillMount() {
    // console.log("componentWillMount");
    setInterval(() => {
      this.setState({ val: new Date().toLocaleTimeString() });
    }, 1000);
  }
  componentWillUpdate() {
    // console.log("componentWillUpdate");
  }
  render() {
    const { val } = this.state;
    return (
      <div
        className={this.props.className + " " + val}
        {...(new Date().getSeconds() % 2 ? { id: 1 } : {})}
      >
        <input
          type="text"
          value={this.state.inputVal}
          onInput={(e) => {
            this.setState({
              inputVal: e.currentTarget.value,
            });
          }}
        />
        <h2>{this.state.inputVal}</h2>
        {val}
        <Welcome name={val} />
        {new Date().getSeconds() % 2 ? <p>{val}</p> : <span>{val}</span>}
      </div>
    );
  }
}

React.render(<App className="content" />, document.getElementById("root"));

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
