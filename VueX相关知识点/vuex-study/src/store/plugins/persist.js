/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-27 12:25:47
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-27 12:47:36
 */

export default store => {
    // store 初始化的时候, 将存储在localStoreage 中的状态还原
    if (localStorage) {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            store.commit('login', user.username)
        }
    }
    //如果用户相关状态发生变化 ,自动存入localstorge
    store.subscribe((mutation, state) => {
        // {type:'user/login'}
        // console.log(mutation.type);
        if (mutation.type === 'user/login') {
            const user = JSON.stringify(state.user)
            localStorage.setItem('user', user)
        } else if (mutation.type === 'user/loginOut') {
            localStorage.removeItem('user')
        }
    })
}