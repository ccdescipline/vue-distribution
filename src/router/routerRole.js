/* Layout */
import Layout from '@/layout'

const rolesrouter = [


    {
        path: '/system',
        name: 'system',
        component: Layout,
        redirect: '/system/userinfo',
        role:"管理员",
        meta: {
            title: '系统管理',
            icon: 'nested'
        },
        children: [
            {
                path: '/userinfo',
                component: () => import('@/views/system/userinfo'),
                meta: { title: '用户管理', icon: 'test' }
            },
            {
                path: '/goodstypeinfo',
                component: () => import('@/views/system/goodsinfo/goodstype'),
                meta: { title: '商品类型管理', icon: 'test' }
            },
            {
                path: '/goodsinfo',
                component: () => import('@/views/system/goodsinfo/goods'),
                meta: { title: '商品管理', icon: 'test' }
            }
        ]
    },
    {
        path: '/supplier',
        name: '供应商',
        role:"供应商",
        component: Layout,
        meta: {
            title: '供应商',
            icon: 'nested'
        }, children: [
            {
                path: '/inStorage',
                name: 'inStorage',
                component: () => import('@/views/supplier/goodsinfo'),
                meta: { title: '商品管理', icon: 'test' }
            },
            {
                path: '/supplierOrder',
                name: 'supplierOrder',
                component: () => import('@/views/supplier/order'),
                meta: { title: '订单信息', icon: 'test' }
            }
        ]
    },
    {
        path: '/dealer',
        name: '经销商',
        role:"经销商",
        component: Layout,
        meta: {
            title: '采购商',
            icon: 'nested'
        }
        , children: [
            {
                path: '/MarketPage',
                name: 'MarketPage',
                component: () => import('@/views/dealer/GoodsMarket'),
                meta: { title: '采购中心', icon: 'test' }
            },
            {
                path: '/dealerOrder',
                name: 'dealerOrder',
                component: () => import('@/views/dealer/order'),
                meta: { title: '订单信息', icon: 'test' }
            }
        ]
    },
]

export default rolesrouter;