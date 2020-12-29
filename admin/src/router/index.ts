import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import ResourceCrud from '../views/ResourceCrud.vue'
// import ArticleList from '../views/articles/ArticleList.vue'
// import ArticleEdit from '../views/articles/ArticleEdit.vue'


Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Main,
    children: [
      { name: 'home', path: '/', component: Home },
      { name: 'articles-crud', path: '/:resource/list', component: ResourceCrud, props: true }
      // { name: 'articles-list', path: '/articles/list', component: ArticleList },
      // { name: 'articles-edit', path: '/articles/edit/:id', component: ArticleEdit, props: true },
      // { name: 'articles-create', path: '/articles/create', component: ArticleEdit }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
