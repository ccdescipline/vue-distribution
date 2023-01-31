import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

import roleRouter from '@/router/routerRole'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  
  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  //router.options.routes.push({ path: '*', redirect: '/404', hidden: true })

  if (hasToken) {


    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ ...to, replace: true })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          let res =  await store.dispatch('user/getInfo')

          console.log(res);

          console.log(roleRouter);
          roleRouter.forEach((item)=>{
            if(res.role === item.role){
              console.log(res.role);
              console.log(router.options.routes);
              router.addRoutes([item])
              router.options.routes.push(item)
              console.log(router.options.routes);
            }
          })




          console.log(router);

          //next()
           next({ ...to, replace: true })
          //next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if(to.path === '/login'){
      console.log(router.options.routes);
      //移除路由
      router.options.routes.forEach((item,index)=>{
        if(item.role != undefined){
          console.log("要移除");
          console.log(item);
          router.options.routes.splice(index,1)
        }
      })
    }

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.

     


      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

