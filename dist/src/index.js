import Act from "./act";
// import App from  './App'
const simpleJSX = (Act.h("div", { class: "wrap" },
    "Hello!",
    Act.h("span", null, "Wolrd")));
console.log(simpleJSX);
// React.render(App, document.getElementById('root'));
