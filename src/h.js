import { VNode } from './vnode';
import options from './options';


const stack = [];

const EMPTY_CHILDREN = [];

/**
 *
 * @example jsx转为h函数的结构
 *
 * `<div id="foo" name="bar">Hello!</div>`
 *
 * `h('div', { id: 'foo', name : 'bar' }, 'Hello!');`
 *
 * @param {string} nodeName	元素标签名 例如: `div`, `a`, `span`, etc.
 * @param {Object} attributes	jsx上面的属性
 * @param rest	剩下的参数都是子组件
 *
 * @public
 */
export function h(nodeName, attributes) {    
    let children = EMPTY_CHILDREN,
        lastSimple, child, simple, i;

    // 注意顺序：从后往前
    for (i = arguments.length; i-- > 2;) {
        // 把子组件收集起来
        stack.push(arguments[i]);
    }

        // 如果在没传 args 的前提下， attributes 中有 children。则用属性中的 chidren 入栈
    if (attributes && attributes.children != null) {
        if (!stack.length) stack.push(attributes.children);
        delete attributes.children;
    }

    // 处理 stack 直到为空
    while (stack.length) {
        if ((child = stack.pop()) && child.pop !== undefined) {
            // 处理子组件，如果返回的是数组的情况
            for (i = child.length; i--;) stack.push(child[i]);
        } else {
            // 根据 子组件返回的不同类型进行处理
            // - Boolean，转化为 null
            if (typeof child === 'boolean') child = null;

            if ((simple = typeof nodeName !== 'function')) {
                // - null,undefined， 转化为字符串 ''
                if (child == null) child = '';
                // - Number, 转化为字符串
                else if (typeof child === 'number') child = String(child);
                // - string，确认 child 是简单类型
                else if (typeof child !== 'string') simple = false;
            }
            // 将child存进children中
            if (simple && lastSimple) {
                // - 如果这次和上次的 child 都是简单类型，则直接拼接两次的 child
                children[children.length - 1] += child;
            } else if (children === EMPTY_CHILDREN) {
                // - 否则初始化数组
                children = [child];
            } else {
                // - 否则推进数组
                children.push(child);
            }
            // 告诉下一次 child 的，这次的 child 为简单类型
            lastSimple = simple;
        }
    }

    let p = new VNode();
    p.nodeName = nodeName;
    p.children = children;
    p.attributes = attributes == null ? undefined : attributes;
    p.key = attributes == null ? undefined : attributes.key;

    // if a "vnode hook" is defined, pass every created VNode to it
    if (options.vnode !== undefined) options.vnode(p);

    return p;
}