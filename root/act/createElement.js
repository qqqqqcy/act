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

function createElement(tagName, props = {}, ...children) {
  return {
    tagName,
    props,
    children
  };
}

export default createElement;
