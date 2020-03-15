const h = (type, config, ...children) => {
    let { props, key, ref } = {
        props: {},
        key: null,
        ref: null
    }, childLength = children.length;
    if (config) {
        // 巧妙的将 key 转化为字符串或者 nul
        key = config.key === undefined ? null : "" + config.key;
        //元素的ref可能是
        ref = config.ref === undefined ? null : config.ref;
        /**这一步就是将 config 属性放进 props 里 */
        for (let propName in config) {
            // 除去一些不需要的属性：key、ref 等
            // 注意，我们的 props 里不要出现 key、ref 这些蛋疼的东西
            // 在我们使用 React 的时候，props 里也没有 key
            if (propName === "key" || propName === "ref")
                continue;
            //保证所有的属性都不是 undefined
            if (config.hasOwnProperty(propName)) {
                props[propName] = config[propName];
            }
        }
    }
    // 把 children 丢进 props 里，就可以了
    // 还记得我们 React 的 children 的用法吗？
    // this.props.children 就是在这里加进来的
    if (childLength === 1) {
        props.children = children[0];
    }
    else {
        props.children = children;
    }
    return { type, props, children, key, ref };
};
export default {
    h
};
