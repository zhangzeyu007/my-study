/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-14 09:54:50
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-14 14:11:58
 */
const role = 'admin'

const MyPlugin = {
    install(Vue, options) {
        // 1. 添加全局方法或 property
        Vue.myGlobalMethod = function () {
            console.log('张泽雨');
        }
        // 2.添加组件
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
        // 3. 注入组件选项
        Vue.mixin({
            created: function () {
                // this 表示组件实例
                this.hello()
            },
            mounted() {
                // console.log('mixin的mounted')
            },
            methods: {
                hello() {
                    console.log('hello 泽雨');
                }
            }
        })
        // 4. 添加实例方法
        Vue.prototype.$myMethod = function (methodOptions) {
            console.log('我是中国的');
        }
        // 5. 指令
        Vue.directive('permission', {
            inserted(el, binding) {
                console.log(binding);
                if (role !== binding.value) {
                    el.parentElement.removeChild(el)
                }
            }
        })
    }
}


if (typeof window !== 'undifined' && window.Vue) {
    // 使用插件使用Vue.use()
    window.Vue.use(MyPlugin)
}
