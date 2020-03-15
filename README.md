# act

My react-mini

**Reference:**

- [「造轮子 1」周末和方正一起 Luy(撸)](https://zhuanlan.zhihu.com/p/30677179)
- [Preact.js 源码学习](https://github.com/flytam/preact-source-learn)
- [从 preact 了解一个类 React 的框架是怎么实现的(一): 元素创建](https://github.com/MrErHu/blog/issues/22)

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
        attr:{
            id: 'wrap'
        },
        children:'hello',
    }
```
