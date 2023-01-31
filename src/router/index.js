import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

const RouterOrigin = [
  
    {
      path: '/login',
      component: () => import('@/views/login/index'),
      hidden: true
    },
  
    {
      path: '/404',
      component: () => import('@/views/404'),
      hidden: true
    },
  
    {
      path: '/login1',
      component: Layout,
      hidden: true,
      children: [{
        path: 'login1',
        name: 'login1',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }]
    },
  
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      
      children: [{
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '主页', icon: 'dashboard' }
      }]
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/login1',
    component: Layout,
    hidden: true,
    children: [{
      path: 'login1',
      name: 'login1',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '主页', icon: 'dashboard' },
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },
  // 404 page must be placed at the end !!!
  //{ path: '*', redirect: '/404', hidden: true }

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   name: 'Nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',

  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // {
  //   path: 'test',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/test',
  //       component: () => import('@/views/testpage/index'),
  //       meta: { title: 'test', icon: 'nested' }
  //     }
  //   ]
  // },
  // {
  //   path: '/system',
  //   name: 'system',
  //   component: Layout,
  //   redirect: '/system/userinfo',
  //   meta: {
  //     title: '系统管理',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: '/userinfo',
  //       component: () => import('@/views/system/userinfo'),
  //       meta: { title: '用户管理', icon: 'test' }
  //     },
  //     {
  //       path: '/goodstypeinfo',
  //       component: () => import('@/views/system/goodsinfo/goodstype'),
  //       meta: { title: '商品类型管理', icon: 'test' }
  //     },
  //     {
  //       path: '/goodsinfo',
  //       component: () => import('@/views/system/goodsinfo/goods'),
  //       meta: { title: '商品管理', icon: 'test' }
  //     }
  //   ]
  // },
  // {
  //   path: '/supplier',
  //   name: '供应商',
  //   component: Layout,
  //   meta: {
  //     title: '供应商',
  //     icon: 'nested'
  //   }, children: [
  //     {
  //       path: '/inStorage',
  //       name:'inStorage',
  //       component: () => import('@/views/supplier/goodsinfo'),
  //       meta: { title: '商品管理', icon: 'test' }
  //     },
  //     {
  //       path: '/supplierOrder',
  //       name:'supplierOrder',
  //       component: () => import('@/views/supplier/order'),
  //       meta: { title: '订单信息', icon: 'test' }
  //     }
  //   ]
  // },
  // {
  //   path: '/dealer',
  //   name: '采购商',
  //   component: Layout,
  //   meta: {
  //     title: '采购商',
  //     icon: 'nested'
  //   }
  //   , children: [
  //     {
  //       path: '/MarketPage',
  //       name:'MarketPage',
  //       component: () => import('@/views/dealer/GoodsMarket'),
  //       meta: { title: '采购中心', icon: 'test' }
  //     },
  //     {
  //       path: '/dealerOrder',
  //       name:'dealerOrder',
  //       component: () => import('@/views/dealer/order'),
  //       meta: { title: '订单信息', icon: 'test' }
  //     }
  //   ]
  // },


]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter() 

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
   const newRouter = createRouter()
   router.matcher = newRouter.matcher // reset router
  console.log("路由重置成功");
}

export default router
