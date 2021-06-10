import Layout from '@/layout'

export default {
    path: '/customer',
    component: Layout,
    redirect: '/customer/daifafang',
    name: 'customer',
    meta: {
        title: '客资管理',
        icon: 'sidebar-menu'
    },
    children: [

        {
            path: 'kehu',
            name: 'customerKehu',
            component: () => import(/* webpackChunkName: 'customer' */ '@/views/customer/kehu'),
            meta: {
                title: '客户列表'
            }
        },
        {
            path: 'daishenhe',
            name: 'customerDaishenhe',
            component: () => import(/* webpackChunkName: 'customer' */ '@/views/customer/daishenhe'),
            meta: {
                title: '待审核列表'
            }
        },
        {
            path: 'lianxiren',
            name: 'customerLianxiren',
            component: () => import(/* webpackChunkName: 'customer' */ '@/views/customer/lianxiren'),
            meta: {
                title: '联系人列表'
            }
        }
    ]
}
