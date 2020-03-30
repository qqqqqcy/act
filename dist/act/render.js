import { StringNode, ElementNode, ClassNode, FunctionNode } from "./vTreeNode";
// Render vNode to vTreeNode
export default function changeVNodeToVTreeNode(vNode) {
    vNode = vNode === null || vNode === undefined ? "" : vNode;
    vNode = typeof vNode === "boolean" ? "" : vNode;
    vNode = typeof vNode === "number" ? vNode + "" : vNode;
    if (typeof vNode === "string") {
        return new StringNode(vNode);
    }
    else if (typeof vNode === "object" && typeof vNode.tagType === "string") {
        return new ElementNode(vNode);
    }
    else if (typeof vNode === "object" && vNode.tagType.prototype?.render) {
        return new ClassNode(vNode);
    }
    else {
        return new FunctionNode(vNode);
    }
}
