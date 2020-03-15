/**
 * 对于 createElement 存在两种情况
 * 1. 内部元素，类型为 IntrinsicElements
 * React.createElement(“div”)
 * 2. 自定义组件，类型为 Element
 */
interface Props {
  [propName: string]: any;
}

interface Configs {
  [propName: string]: any;
  key?: number | string;
}

interface VNode {
  type: string;
  props: Props;
  children: any;
  key: string | null;
  ref: any;
}

declare module JSX {
  export interface Element {}
  export interface IntrinsicElements {
    [tagName: string]: Props;
  }
}
