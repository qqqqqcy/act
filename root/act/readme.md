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

一般包括 vNode，container 两个参数

- vNode 为简单类型 (string|number|boolean...)，直接渲染到 container 之上
- vNode 为原生 Dom，绑定 props 到 dom 之上
- vNode - fNode - Function 组件 - 执行
- vNode - cNode - instance - 为 Class 组件 - new -> 执行 render

# 3. diff 算法

假设有 vNode

- 比较 vNode.tagType
- 比较 props
- 比较 children
  - 顺序
  - 递归
