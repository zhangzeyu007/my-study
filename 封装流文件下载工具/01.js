/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2024-03-25 11:57:06
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-25 12:05:10
 * @FilePath: \my-study\封装流文件下载工具\01.js
 */

export const download = (res, type, filename) => {
  // 创建一个新的blob对象，内容为res，类型为type
  const blob = new Blob([res], { type: type });

  // 这里就是创建一个a标签，等下用来模拟点击事件
  const a = document.createElement("a");
  // 兼容webkix浏览器，处理webkit浏览器中href自动添加blob前缀，默认在浏览器打开而不是下载
  const URL = window.URL || window.webkitURL;
  const objectUrl = URL.createObjectURL(blob);
  a.href = objectUrl;
  a.download = filename;
  document.body.appendChild(a);

  // 模拟点击事件
  a.click();

  document.body.removeChild(a);
  // 收尾工作，在内存中移除URL 对象
  window.URL.revokeObjectURL(href);
};
