import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Swal from 'sweetalert2'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: () => import('../views/FavouritesView.vue')
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('@/views/OrdersView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    }, {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/Admin.vue'),
      children: [
        {
          path: '/admin/customize-homepage',
          name: 'admin-customize-homepage',
          component: () => import('@/views/admin/HomepageView.vue'),
        },
        {
          path: '/admin/general',
          name: 'admin-general',
          component: () => import('@/views/admin/GeneralView.vue'),
        },
        {
          path: '/admin/products',
          name: 'admin-products',
          component: () => import('@/views/admin/ProductsView.vue'),
        }
      ]
    }
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(getAuth(), (user) => {
      removeListener()
      resolve(user)
    }, reject)
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next()
    } else {
      Swal.fire({
        title: 'You have no access!',
        text: 'Please login first.',
        color: 'white',
        icon: 'info',
        background: '#475569',
        confirmButtonColor: '#22c55e',
        iconColor: '#22c55e'
      })
      next(false)
    }
  } else {
    next()
  }
})

export default router
