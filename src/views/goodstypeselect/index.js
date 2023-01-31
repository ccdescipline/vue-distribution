// 引入组件
import GoodsTypeSelect from './index.vue'
// // 创建个空对象
// const obj = {}
// // 设置安装方法
// obj.install = (Vue) => {
//     // 1. 创建组件构造器
//     const LoadingConstructor = Vue.extend(Loading)
//     // 2. new 的方式，根据组件构造器，可以创建出来一个组件对象
//     const loading = new LoadingConstructor()
//     // 3. 将组件对象手动挂载到某一个元素上挂载会替换元素内容,这里创建了一个div元素来作为被替换内容
//     loading.$mount(document.createElement('div'))
//     // 4. 将组件添加到dom中
//     document.body.appendChild(loading.$el)
//     // 5. 将$loading挂载到Vue的原型上
//     Vue.prototype.$loading = loading
// }

// 自定义组件对象
const GoodsTypeSelectCompoment = {
    // install 是默认的方法。当外界在 use 这个组件的时候，就会调用本身的 install 方法，同时传一个 Vue 这个类的参数
    install: function(Vue) {
      // Vue.component() 与正常的全局注册组件用法相同，可以理解为通过 install 和 Vue.use()函数注册了全局组件
      Vue.component('GoodsTypeSelect', GoodsTypeSelect )
    }
  }
// 导出对象
export default GoodsTypeSelectCompoment