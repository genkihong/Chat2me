import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Index.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/auth/Login.vue'),
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/auth/Signup.vue'),
    },
    {
      path: '/forget-password',
      name: 'ForgetPassword',
      component: () => import('../views/auth/ForgetPassword.vue'),
    },
    {
      path: '/reset-password/:token?',
      name: 'ResetPassword',
      component: () => import('../views/auth/ResetPassword.vue'),
    },
    {
      path: '/user',
      component: () => import('../views/user/Index.vue'),
      children: [
        {
          path: 'settings', // /user
          name: 'User',
          component: () => import('../views/user/Settings.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'profile', // /user/profile
          name: 'Profile',
          component: () => import('../views/user/Profile.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'message', // /user/message
          name: 'Message',
          component: () => import('../views/user/Message.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'article', // /user/article
          name: 'Article',
          component: () => import('../views/user/Article.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'forum', // /user/forum
          name: 'Forum',
          component: () => import('../views/user/Forum.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  const isLoggedIn = !!authStore.token
  const pathName = ['Login', 'SignUp', 'ForgetPassword', 'ResetPassword']

  if (!pathName.includes[to.name]) {
    if (to.meta.requiresAuth && !isLoggedIn) {
      // 此路由需要授权，请检查是否已登录
      // 如果没有，则重定向到登录页面
      return {
        path: '/login',
        // 保存我们所在的位置，以便以后再来
        query: { redirect: to.fullPath },
      }
    }
  }
})
export default router
