/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-14 09:54:50
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-14 10:10:25
 */


const MyPlugin = {
    install(Vue, options) {
        Vue.component('heading', {
            props: {
                level: {
                    type: String,
                    require: true
                },
                title: {
                    type: String,
                    default: ""
                },
                icon: {
                    type: String
                }
            },
            render(h) {
                // 子节点数组
                let children = []
                // icon属性处理逻辑
                if (this.icon) {
                    children.push(h(
                        'svg',
                        {
                            class: "icon"
                        },
                        [h('use', { attrs: { 'xlink:href': '#icon-' + this.icon } })]
                    ))
                }

                // 拼接子节点
                children = children.concat(this.$slots.default)

                const vnode = h('h' + this.level, // 参数1 tagname
                    { attrs: { title: this.title } },// 参数2
                    children, // 参数3: 子节点vnode 数组

                )
                return vnode
            }
        })
    }
}


if (typeof window !== 'undifined' && window.Vue) {
    // 使用插件使用Vue.use()
    window.Vue.use(MyPlugin)
}
