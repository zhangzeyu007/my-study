/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-16 09:53:23
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-16 11:06:16
 */

const arr = [];
for (let i = 0; i < 100000000; i++) {
    arr.push(i);
    arr.splice(i % 3, i % 7, i % 5);
}

const div = document.querySelector('div');
console.log(div);