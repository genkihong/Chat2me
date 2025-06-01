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
      path: '/',
      component: () => import('../views/Index.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/Main.vue'),
        },
        {
          path: 'forums',
          name: 'Forums',
          component: () => import('../views/Forums.vue'),
        },
        {
          path: 'popular',
          name: 'Popular',
          component: () => import('../views/Popular.vue'),
        },
      ],
    },
    {
      path: '/user',
      component: () => import('../views/user/Index.vue'),
      children: [
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
          path: 'follow', // /user/forum
          name: 'Follow',
          component: () => import('../views/user/FollowForum.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'favorite', // /user/article
          name: 'Favorite',
          component: () => import('../views/user/FavoriteArticle.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'settings', // /user
          name: 'User',
          component: () => import('../views/user/Settings.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  const isLoggedIn = !!authStore.token
  const publicPages = ['Login', 'SignUp', 'ForgetPassword', 'ResetPassword']
  // 已登入者導向首頁
  if (publicPages.includes(to.name) && isLoggedIn) {
    return { path: '/' }
  }
  // 需要授權的頁面且未登入者導向登入頁
  if (!publicPages.includes(to.name)) {
    if (to.meta.requiresAuth && !isLoggedIn) {
      return {
        path: '/login',
        query: { redirect: to.fullPath },
      }
    }
  }

  return true
})
export default router
