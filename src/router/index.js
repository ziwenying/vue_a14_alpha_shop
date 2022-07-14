import Vue from 'vue'
import VueRouter from 'vue-router'
import Form from '../views/Form.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/form/1'
  },
  {
    path: '/form/',
    name: 'form',
    redirect: '/form/1',
    component: Form,
    children: [
      {
        name: 'form-address',
        path: '1',
        component: () => import('../views/FormAddress')
      },
      {
        name: 'form-delivery',
        path: '2',
        component: () => import('../views/FormDelivery')
      },
      {
        name: 'form-pay',
        path: '3',
        component: () => import('../views/FormPay')
      }
    ]
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
