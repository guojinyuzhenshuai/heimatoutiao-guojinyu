// 权限拦截 导航守卫
import router from '../router'
import progress from 'nprogress'
import 'nprogress/nprogress.css'

// 导航守卫
// 全局前置守卫 => 在每一个路由发生改变之前 会触发这个事件
router.beforeEach((to, from, next) => {
  progress.start() // 开启进度条
  // 判断拦截地址
  // console.log(from)

  if (to.path.startsWith('/home')) {
    // 进行权限判断 如果有token 则放行 如果没有token 则回到登录页
    let token = window.localStorage.getItem('user-token')
    // console.log(token)

    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
// afterEach 关闭
router.afterEach(function () {
  progress.done()
})

// to 即将要进入的目标 路由对象
// from: Route: 当前导航正要离开的路由
// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
// next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
// next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
// next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。
// next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。
