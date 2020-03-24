function mapProps(props = {}, element) {
  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      const val = props[key];
      if (key === "className") {
        element.setAttribute("class", val);
      } else {
        element.setAttribute(key, val);
      }
    }
  }
}

function getVnodeFromFunction(Vnode) {
  if (Vnode.isComponent || Vnode.tagName?.prototype?.render) {
    const { tagName, props } = Vnode;
    // Class
    if (Vnode._element) {
      Vnode.componentWillUpdate && Vnode.componentWillUpdate();
    } else {
      Vnode = new tagName(props);
      Vnode.componentWillMount && Vnode.componentWillMount();
    }
    // Vnode._element = ;
    // return getVnodeFromFunction(Vnode.render());
    return {
      instance: Vnode,
      Vnode: Vnode.render()
    };
  }
  if (typeof Vnode.tagName === "function") {
    const { tagName, props } = Vnode;
    // Function
    // return getVnodeFromFunction(tagName(props));
    return {
      Vnode: tagName(props)
    };
  }
  return { Vnode };
}

// render vnode to vdom
export default function render(Vnode) {
  // 简单类型
  Vnode = Vnode === null || Vnode === undefined ? "" : Vnode;
  Vnode = typeof Vnode === "boolean" ? "" : Vnode;
  Vnode = typeof Vnode === "number" ? Vnode + "" : Vnode;
  if (typeof Vnode === "string") {
    const textNode = document.createTextNode(String(Vnode));
    return textNode;
  }

  // Class or Function
  const { Vnode: tmpVnode, instance } = getVnodeFromFunction(Vnode);
  Vnode = tmpVnode;
  // Element Vnode
  const { tagName, props, children } = Vnode;
  const element = document.createElement(tagName);

  if (instance) {
    instance._element = element;
  }

  mapProps(props, element);
  if (children) children.map(child => element.appendChild(render(child)));
  return element;
}
