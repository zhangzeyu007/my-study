import Layout from '@/layout'

export default {
    path: '/',
    component: Layout,
    redirect: '/probably',
    meta: {
        title: '概况',
        icon: 'sidebar-menu'
    },
    children: [
        {
            path: 'probably',
            name: 'probably',
            component: () => import('@/views/probably/index'),
            meta: {
                title: '概况详情'
            }
        }
    ]
}
