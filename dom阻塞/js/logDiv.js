/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2021-01-16 09:53:23
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-01 12:09:10
 * @FilePath: \my-study\dom阻塞\js\logDiv.js
 */


const arr = [];
for (let i = 0; i < 100000000; i++) {
    arr.push(i);
    arr.splice(i % 3, i % 7, i % 5);
}

const div = document.querySelector('div');
console.log(div);