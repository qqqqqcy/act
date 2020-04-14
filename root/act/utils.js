// 差异更新的几种类型
export const UPDATE_TYPES = {
  MOVE_EXISTING: 1,
  REMOVE_LEAF: 2,
  INSERT_LEAF: 3,
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
  if (!preLeaf) return false;
  if (preLeaf.vNodeType === newLeaf.vNodeType) {
    const preVNode = preLeaf[preLeaf.vNodeType],
      newVNode = newLeaf[newLeaf.vNodeType];
    if (preLeaf.vNodeType === "textVNode") {
      return true;
    } else if (preLeaf.vNodeType === "elementVNode") {
      return preVNode.tagType === newVNode.tagType;
    } else if (preLeaf.vNodeType === "classVNode") {
      return preVNode.tagType === newVNode.tagType;
    }
  }
  return false;
  // if (typeof preVNode === typeof newVNode && )
}

function insertLeaf(leaf, toIndex) {
  const currentDom = leaf.dom,
    fatherDom = leaf.fatherLeaf.dom,
    siblingDom = fatherDom.children;
  if (siblingDom.length <= toIndex) {
    fatherDom.appendChild(currentDom);
  } else {
    fatherDom.insertBefore(currentDom, siblingDom[toIndex]);
  }
}
function removeLeaf(leaf) {
  if (!leaf) return;
  const currentDom = leaf.dom,
    fatherDom = leaf.fatherLeaf.dom;
  fatherDom.removeChild(currentDom);
}

export function patch(diffQueue) {
  diffQueue.map(({ preLeaf, leaf, type, fromIndex, toIndex }) => {
    switch (type) {
      case UPDATE_TYPES.MOVE_EXISTING:
        if (fromIndex !== toIndex) {
          insertLeaf(leaf, toIndex);
        }
        break;
      case UPDATE_TYPES.INSERT_LEAF:
        removeLeaf(preLeaf);
        leaf.mount();
        insertLeaf(leaf, toIndex);
        break;
      case UPDATE_TYPES.REMOVE_LEAF:
        removeLeaf(preLeaf);
        break;
      default:
        break;
    }
  });
}
