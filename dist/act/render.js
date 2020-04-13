import { TextLeaf, ElementLeaf, ClassLeaf, FunctionLeaf } from "./leaf";
// Render vNode to leaf
export default function getLeafFromVNode(vNode) {
    vNode = vNode === null || vNode === undefined ? "" : vNode;
    vNode = typeof vNode === "boolean" ? "" : vNode;
    vNode = typeof vNode === "number" ? vNode + "" : vNode;
    if (typeof vNode === "string") {
        return new TextLeaf(vNode);
    }
    else if (typeof vNode === "object" && typeof vNode.tagType === "string") {
        return new ElementLeaf(vNode);
    }
    else if (typeof vNode === "object" && vNode.tagType.prototype?.render) {
        return new ClassLeaf(vNode);
    }
    else {
        return new FunctionLeaf(vNode);
    }
}
