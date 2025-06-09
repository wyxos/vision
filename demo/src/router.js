import { createRouter, createWebHashHistory } from 'vue-router'
import FormBuilderDemo from './components/FormBuilderDemo.vue'
import ListingDemo from './components/ListingDemo.vue'

const routes = [
  {
    path: '/',
    redirect: '/form'
  },
  {
    path: '/form',
    name: 'form',
    component: FormBuilderDemo
  },
  {
    path: '/listing',
    name: 'listing',
    component: ListingDemo
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
