import { createApp, createRenderer, h } from 'vue'
import App from './App.vue'
import './index.css'
import CanvasApp from './components/CanvasApp.vue'
import EditTodo from './components/todos/EditTodo.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './view/Home.vue'
import About from './view/About.vue'
import NotFound from './view/404.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [{
        path: "/",
        name: "home",
        component: Home
    }, {
        path: '/:pathMatch(.*)*',
        name: "not-found",
        component: NotFound
    }
    ],
    scrollBehavior(to, from, savePosition) {
        console.log(savePosition);
        if (savePosition) {
            return savePosition;
        } else {
            return { top: 0 }
        }

    }
})
//使用命名导航至404页面
router.resolve({
    name: "not-found",
    params: {
        pathMatch: ['not', 'found']
    }
})
// 特性 动态路由的添加
router.addRoute({
    path: "/about",
    name: 'about',
    component: About
})

router.addRoute({
    path: "/about/info",
    name: 'info',
    component: {
        render() {
            return h('div', 'info page')
        }
    }
})
// composition 结合

// 创建APP
createApp(App).use(router)
    .component('comp', {
        render() {
            return h('div', 'I am')
        },
    })
    .component("EditTodo", EditTodo)
    .directive('highlight', {
        beforeMount(el, binding, vnode) {
            el.style.color = binding.value
        }
    })
    .mount('#app')

let ctx, canvas
const draw = (el, noClear) => {

}
// 自定义渲染器
const nodeOps = {
    createElement(tag) {
        // 处理元素的创建逻辑
        return { tag }
    },
    insert(child, parent, anchor) {
        // 处理元素的插入逻辑
        // 1. 如果是子元素,不是真实dom ,此时只需要将数据保存到前面虚拟对象上
        child.parent = parent
        if (!parent.childs) {
            parent.childs = [child]
        } else {
            parent.childs.push(chid)
        }
        // 2.如果是真实的dom元素, 在这里会是canvas, 需要绘制
        if (parent.nodeType == 1) {
            draw(child)
            // 事件处理
            if (child.onClick) {
                canvas.addEventListener('click', () => {
                    child.onClick()
                    setTimeout(() => {
                        draw(child)
                    }, 0)
                })
            }
        }
        return
    },
    remove: child => { },
    createText: text => { },
    patchProp(el, key, preValue, nextValue) {
        // 属性的更新
        el[key] = nextValue

    }
}

const canvasRenderer = createRenderer(nodeOps)

// 扩展mount:首先创建一个画布元素
function createCanvasApp(App) {
    const app = canvasRenderer.createApp(App)
    const mount = app.mount
    app.mount = function (selector) {
        //创建并插入画布
        canvas = document.createElement('canvas')
        ctx = canvas.getContext('2d')
        //设置画布基础属性
        canvas.width = 600
        canvas.height = 400
        document.querySelector(selector).appendChild(canvas)
        // 执行默认mount
        mount(canvas)
    }
    return app
}

createCanvasApp(CanvasApp).mount('#demo')