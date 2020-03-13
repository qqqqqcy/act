import Preact from "./src/preact.js"
// 1. change <div id="foo" name="bar">Hello!</div> => VNode
// console.log(
//     Preact.h('h1', { id: 'title' }, "Hello!"),
// );
const HelloMessage =()=>{
    // render() {
        return (
            Preact.h('h1', { id: 'title', onClick: () => console.log(new Date().getSeconds()) }, "Hello!")
        );
    // }
}

Preact.render(
    // Preact.h('div', { class: 'wrap' }, Preact.h('h1', { id: 'title' }, "Hello!")),
    Preact.h(HelloMessage),
    document.getElementById('root'),
    document.getElementById('wrap'),

);