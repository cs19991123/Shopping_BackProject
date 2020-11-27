import Vue from 'vue'
import Router from 'vue-router'

import aside from '../store/modules/aside'

Vue.use(Router)

function isHas(url) {
  return aside.state.userInfo.menus_url.some(item => item == url)
}

export let indexRouters = [
  {
    path: '/menu',
    component: () => import('@/views/menu/menu'),
    name: '菜单管理',
    beforeEnter: (to, from, next) => {
      isHas('/menu') ? next() : next('/home')
    }
  },
  {
    path: '/role',
    component: () => import('@/views/role/role'),
    name: '角色管理',
    beforeEnter: (to, from, next) => {
      isHas('/role') ? next() : next('/home')
    }
  },
  {
    path: '/user',
    component: () => import('@/views/user/user'),
    name: '管理员管理',
    beforeEnter: (to, from, next) => {
      isHas('/user') ? next() : next('/home')
    }
  },
  {
    path: '/cate',
    component: () => import('@/views/cate/cate'),
    name: '商品分类',
    beforeEnter: (to, from, next) => {
      isHas('/cate') ? next() : next('/home')
    }
  },
  {
    path: '/specs',
    component: () => import('@/views/specs/specs'),
    name: '商品规格',
    beforeEnter: (to, from, next) => {
      isHas('/specs') ? next() : next('/home')
    }
  },
  {
    path: '/goods',
    component: () => import('@/views/goods/goods'),
    name: '商品管理',
    beforeEnter: (to, from, next) => {
      isHas('/goods') ? next() : next('/home')
    }
  },
  {
    path: '/member',
    component: () => import('@/views/member/member'),
    name: '会员列表',
    beforeEnter: (to, from, next) => {
      isHas('/member') ? next() : next('/home')
    }
  },
  {
    path: '/banner',
    component: () => import('@/views/banner/banner'),
    name: '轮播图列表',
    beforeEnter: (to, from, next) => {
      isHas('/banner') ? next() : next('/home')
    }
  },
  {
    path: '/seck',
    component: () => import('@/views/seck/seck'),
    name: '活动列表',
    beforeEnter: (to, from, next) => {
      isHas('/seck') ? next() : next('/home')
    }
  }
]

let rouetr = new Router({
  routes: [
    {
      path: '/index',
      component: () => import('../pages/index'),
      children: [
        {
          path: '/home',
          component: () => import('@/views/home')
        },
        ...indexRouters,
        {
          path: '',
          redirect: '/home'
        }
      ]
    },
    {
      path: '/login',
      component: () => import('../pages/login')
    },

    {
      path: '*',
      redirect: '/login'
    }
  ]
})

rouetr.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next()
    return
  }
  if (sessionStorage.getItem('userInfo')) {
    next()
    return
  }
  next('/login')
})

export default rouetr