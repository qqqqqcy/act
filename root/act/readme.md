# Pure Mini React

# 1. createElement(tagType, props, ...children) => vNode

- 处理 key
- 处理 ref
- 处理 Children，拍平
- new vNode

  ```json
  {
      tagType
      props
      children
      key
      ref
  }

  ```

# 2. getLeafFromVNode(vNode) => leaf

转换 vNode 为叶子节点，需要注意叶子节点的分类，一共有四类

- vNode 为简单类型 (string|number|boolean...)，TextLeaf
- vNode 为原生 Dom，ElementLeaf
- vNode 函数组件，FunctionLeaf。通过 `vNode.tagType(vNode.props)` 转变为原生 Dom 的 vNode
- vNode 类组件，ClassLeaf。`new vNode.tagType(vNode.props).render()` 转变为原生 Dom 的 vNode

以上四种都继承于 Leaf

```ts
class Leaf {
  type: "text" | "element" | "function" | "class";
  vNode;
  // 渲染
  mount(): HTMLELEMENT {}
  // 更新
  update() {}
}
```

# 3. Leaf.mount()

# 3. diff 算法

假设有 vNode

- 比较 vNode.tagType
- 比较 props
- 比较 children
  - 顺序
  - 递归
