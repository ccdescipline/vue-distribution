import Vue from 'vue'
import Router from 'vue-router'

import { constantRouterMap } from '@/router'
 
// 传入当前router
export function resetRouter (router) {
  const createRouter = () =>
    new Router({
      mode: 'history',
      routes: constantRouterMap
    })
  // 用初始化的matcher替换当前router的matcher
  router.matcher = createRouter.matcher 
}