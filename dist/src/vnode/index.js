// 类
export class VNode {
    // key
    // public key?: KeyType;
    // 子元素
    // public children: (VNode | string)[];
    constructor(tagName, props) {
        this.tagName = tagName;
        this.props = props;
    }
}
