# Pure Mini React

# 1. createElement

- 处理 key
- 处理 ref
- 处理 Children，拍平
- new Vnode

  ```json
  {
      tagName
      props
      children
      key
      ref
  }
  ```

# 2. render

一般包括 Vnode，container 两个参数

- Vnode 为简单类型 (string|number|boolean...)，直接渲染到 container 之上
- Vnode 为原生 Dom，绑定 props 到 dom 之上
- Vnode 为 Function 组件 - 在 createElement 中处理
- Vnode 为 Class 组件
