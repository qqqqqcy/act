/**
 * ---------------------------------------
 * Title: createElement
 * Description: 生成 vnode 对象
 * ---------------------------------------
 * Time: 15-42-32
 * Date: 2020-03-23
 * Creator : Quincy
 * ---------------------------------------
 **/
function createElement(tagType, props, ...children) {
  if (children[0] instanceof Array) {
    children = [...children[0]];
  }
  const { key } = props || {};

  return {
    tagType,
    props,
    children,
    key,
  };
}
export default createElement;
