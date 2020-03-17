import { VNode, TagName, PropsType } from "./vnode/index";
// import { flat } from "./utils";

export default (tagName: TagName, config: PropsType, ...children: any[]) => {
  let props: PropsType = { children: [] };

  // Set props.children 同时 拍平
  // props.children = flat(children || config.children || []);
  props.children = children || config.children || [];

  // Set props
  if (config) {
    props = { ...props, ...config };
  }

  return new VNode(tagName, props);
};
