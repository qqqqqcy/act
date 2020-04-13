// 差异更新的几种类型
const UPDATE_TYPES = {
    MOVE_EXISTING: 1,
    REMOVE_NODE: 2,
    INSERT_MARKUP: 3,
};
export function childrenLeafToMap(childrenLeaf) {
    childrenLeaf = childrenLeaf || [];
    const leafMap = {};
    childrenLeaf.forEach((leaf, index) => {
        const vNode = leaf[leaf.vNodeType];
        const name = leaf && vNode && leaf.key ? leaf.key : index.toString();
        leafMap[name] = leaf;
    });
    return leafMap;
}
export function shouldUpdate(preLeaf, newLeaf) {
    if (preLeaf.vNodeType === newLeaf.vNodeType) {
        const preVNode = preLeaf[preLeaf.vNodeType], newVNode = newLeaf[newLeaf.vNodeType];
        if (preLeaf.vNodeType === "textVNode") {
            return true;
        }
        else if (preLeaf.vNodeType === "elementVNode") {
            return preVNode.tagType === newVNode.tagType;
        }
        else if (preLeaf.vNodeType === "classVNode") {
            return preVNode.tagType === newVNode.tagType;
        }
    }
    return false;
    // if (typeof preVNode === typeof newVNode && )
}
