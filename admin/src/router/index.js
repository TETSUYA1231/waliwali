import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Category from '../views/categories/Category.vue'
import Usercate from '../views/categories/Usercate.vue'
import Servercate from '../views/categories/Servercate.vue'
import Oparticle from '../views/Oparticle.vue'
import Ident from '../views/idents/Ident.vue'
import UserIdent from '../views/idents/UserIdent.vue'
import OperateIdent from '../views/idents/OperateIdent.vue'
import BackUser from '../views/BackUser.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: Login, meta: { isPubilc: true } },
  {
    path: '/',
    component: Main,
    children: [
      { name: 'home', path: '/', component: Home },
      {
        name: 'category',
        path: '/category',
        component: Category,
        redirect: '/category/usercate',
        children: [
          {
            name: 'usercate',
            path: '/category/usercate',
            component: Usercate
          },
          {
            name: 'servercate',
            path: '/category/servercate',
            component: Servercate
          }
        ]
      },
      {
        name: 'ident',
        path: '/ident',
        component: Ident,
        redirect: '/ident/userident',
        children: [
          {
            name: 'userident',
            path: '/ident/userident',
            component: UserIdent
          },
          {
            name: 'operateident',
            path: '/ident/operateident',
            component: OperateIdent
          }
        ]
      },
      { name: 'oparticle', path: '/oparticle', component: Oparticle },
      {
        name: 'backuser',
        path: '/backuser',
        component: BackUser
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由卫士
router.beforeEach((to, from, next) => {
  if (!to.meta.isPubilc && !localStorage.token) {
    return next('/login')
  } else next()
})

export default router
