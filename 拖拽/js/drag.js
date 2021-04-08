/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-19 12:34:34
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-07 10:11:22
 */

const empty = document.querySelector('div.empty')
const h1 = document.querySelector('h1')
let username;

document.addEventListener('dragstart', (e) => {
    e.target.style.border = '5px dashed red'
    username = e.target.alt
}, false)

document.addEventListener('drag', (e) => {
    e.target.style.border = '5px dashed red'
    empty.style.border = "5px dashed red"
}, false)

document.addEventListener('dragend', (e) => {
    e.target.style.border = 'none'
    empty.style.border = "none"
    // h1.innerHTML = "拖拽你喜欢的动漫"
    h1.style.color = "black"
}, false)

empty.addEventListener('dragenter', (e) => {
    if (empty.firstChild) {
        empty.removeChild(empty.firstChild)
    }
    h1.innerHTML = username
    e.target.style.color = "red"
}, false)
// 拖入进来
empty.addEventListener("dragover", (e) => {
    e.preventDefault()
}, false)
// dragleave拖出

empty.addEventListener('drop', (e) => {
    e.preventDefault()
    e.target.appendChild(document.querySelector(`img[alt=${username}]`))
    let domImg = document.querySelector(`img[alt=${username}]`)
    domImg.style.width = 100 + '%'
    domImg.style.height = 100 + '%'
    e.target.style.border = "none"
}, false)




