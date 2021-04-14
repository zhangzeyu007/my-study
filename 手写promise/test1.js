/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-13 19:41:38
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-13 20:36:19
 */


const test = new Promise((resolve, reject) => {
    resolve('好帅')
})

test.then(res => {
    console.log(res);
})

