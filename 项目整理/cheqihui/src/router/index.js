import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style

Vue.use(VueRouter)

import Layout from '@/layout'
import EmptyLayout from '@/layout/empty'

const constantRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login'),
        meta: {
            title: '登录',
            i18n: 'route.login'
        }
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('@/views/index'),
                meta: {
                    title: store.state.settings.dashboardTitle,
                    i18n: 'route.dashboard'
                }
            },
            {
                path: 'personal',
                component: EmptyLayout,
                redirect: '/personal/setting',
                meta: {
                    title: '个人中心',
                    breadcrumb: false
                },
                children: [
                    {
                        path: 'setting',
                        name: 'personalSetting',
                        component: () => import('@/views/personal/setting'),
                        meta: {
                            title: '个人设置',
                            i18n: 'route.personal.setting'
                        }
                    },
                    {
                        path: 'edit/password',
                        name: 'personalEditPassword',
                        component: () => import('@/views/personal/edit.password'),
                        meta: {
                            title: '修改密码',
                            i18n: 'route.personal.editpassword'
                        }
                    }
                ]
            },
            {
                path: 'reload',
                name: 'reload',
                component: () => import('@/views/reload')
            }
        ]
    },
    {
        path: 'createku',
        name: 'CreateKu',
        component: () => import('@/views/customer/createKu'),
        meta: {
            title: '新增客户'
        }
    },
    {
        path: 'createlr',
        name: 'createLr',
        component: () => import( '@/views/customer/createLr'),
        meta: {
            title: '创建联系人'
        }
    },
    {
        path: 'contractupload',
        name: 'contractUpload',
        component: () => import('@/views/customer/contractUpload'),
        meta: {
            title: '合同上传'
        }
    },
]

import Rent from './modules/rent'
import Customer from './modules/customer'
import Probably from './modules/probably'

// 当 children 不为空的主导航只有一项时，则隐藏
let asyncRoutes = [
    {
        meta: {
            title: '演示',
            icon: 'sidebar-default'
        },
        children: [
            Probably,
            Rent,
            Customer
        ]
    }
]

const lastRoute = [{
    path: '*',
    component: () => import('@/views/404'),
    meta: {
        title: '404',
        sidebar: false
    }
}]

const router = new VueRouter({
    routes: constantRoutes
})

// 解决路由在 push/replace 了相同地址报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
}

router.beforeEach(async(to, from, next) => {
    store.state.settings.enableProgress && NProgress.start()
    // 已经登录，但还没根据权限动态生成并挂载路由
    if (store.getters['user/isLogin'] && !store.state.menu.isGenerate) {
        // 挂载动态路由的同时，根据当前帐号复原固定标签栏
        store.state.settings.enableTabbar && store.commit('tabbar/recoveryStorage', store.state.user.account)
        /**
         * 重置 matcher
         * https://blog.csdn.net/baidu_28647571/article/details/101711682
         */
        router.matcher = new VueRouter({
            routes: constantRoutes
        }).matcher
        const accessRoutes = await store.dispatch('menu/generateRoutes', {
            asyncRoutes,
            currentPath: to.path
        })
        router.addRoutes(accessRoutes)
        router.addRoutes(lastRoute)
        next({ ...to, replace: true })
    }
    if (store.state.menu.isGenerate) {
        store.commit('menu/setHeaderActived', to.path)
    }
    if (store.getters['user/isLogin']) {
        if (to.name) {
            if (to.matched.length !== 0) {
                // 如果已登录状态下，进入登录页会强制跳转到控制台页面
                if (to.name == 'login') {
                    next({
                        name: 'dashboard',
                        replace: true
                    })
                } else if (!store.state.settings.enableDashboard && to.name == 'dashboard') {
                    // 如果未开启控制台页面，则默认进入第一个固定标签栏或者侧边栏导航第一个模块
                    if (store.state.settings.enableTabbar && store.state.tabbar.list.length > 0) {
                        next({
                            path: store.state.tabbar.list[0].path,
                            replace: true
                        })
                    } else {
                        next({
                            path: store.getters['menu/sidebarRoutes'][0].path,
                            replace: true
                        })
                    }
                }
            } else {
                // 如果是通过 name 跳转，并且 name 对应的路由没有权限时，需要做这步处理，手动指向到 404 页面
                next({
                    path: '/404'
                })
            }
        }
    } else {
        if (to.name != 'login') {
            next({
                name: 'login',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    }
    next()
})

router.afterEach(() => {
    store.state.settings.enableProgress && NProgress.done()
})

export default router
