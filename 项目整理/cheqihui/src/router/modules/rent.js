import Layout from '@/layout'

export default {
    path: '/rent',
    component: Layout,
    redirect: '/rent/daifafang',
    name: 'rent',
    meta: {
        title: '租金管理',
        icon: 'sidebar-menu'
    },
    children: [{
            path: 'daifafang',
            name: 'rentDaifafang',
            component: () =>
                import ( /* webpackChunkName: 'rent' */ '@/views/rent/daifafang'),
            meta: {
                title: '待发放列表'
            }
        },
        // {
        //     path: 'dangyuerenwu',
        //     name: 'rentDangyuerenwu',
        //     component: () => import(/* webpackChunkName: 'rent' */ '@/views/rent/dangyuerenwu'),
        //     meta: {
        //         title: '当月任务'
        //     }
        // },
        {
            path: 'lishirenwu',
            name: 'rentLishirenwu',
            component: () =>
                import ( /* webpackChunkName: 'rent' */ '@/views/rent/lishirenwu'),
            meta: {
                title: '历史任务'
            }
        }
    ]
}