# act

My react-mini

**Reference:**

- [「造轮子 1」周末和方正一起 Luy(撸)](https://zhuanlan.zhihu.com/p/30677179)
- [「造轮子 2」周末和方正一起 Luy(撸)](https://zhuanlan.zhihu.com/p/30726665)
- [Preact.js 源码学习](https://github.com/flytam/preact-source-learn)
- [从 preact 了解一个类 React 的框架是怎么实现的(一): 元素创建](https://github.com/MrErHu/blog/issues/22)
- [了不起的 Virtual DOM(二): 使用 TypeScript 开发简易 Virtual DOM 库](https://juejin.im/post/5d3c1786e51d4556db694ae2#heading-10)
- [从零开始实现一个 React（一）：JSX 和虚拟 DOM - hujiulong](https://segmentfault.com/a/1190000013842289)
- [从头实现一个简易版 React（一）- NANA](https://segmentfault.com/a/1190000013504156)

# 一、creatElement

第一步是转换 jsx

```html
<div id="wrap">
  hello
</div>
```

为 React.createElement 方法, 这一步由 babel 或者 tsc 来执行。

```js
React.creatElement("div", { id: "wrap" }, "hello");
```

我们需要把 React.createElement 转换为 VNode

```js
    {
        type:'div',
        props:{
            id: 'wrap'
            children: 'hello',
        },
        // key: null,
        // ref: null
    }
```
