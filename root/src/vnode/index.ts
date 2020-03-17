// 类型别名
export type TagName = string;

// type KeyType = string | number | null;

export interface PropsType {
  // key?: string | number;
  children?: (VNode | string)[];
  [prop: string]: any;
}

// 类
export class VNode {
  // 节点类型
  public tagName: TagName;
  // 属性
  public props: PropsType;
  // key
  // public key?: KeyType;
  // 子元素
  // public children: (VNode | string)[];

  public constructor(tagName: TagName, props: PropsType) {
    this.tagName = tagName;
    this.props = props;
  }
}
