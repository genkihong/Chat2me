import { useAuthStore } from '@/stores/authStore'
import { createRouter, createWebHistory } from 'vue-router'

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
      path: '/article/new', //新增文章
      name: 'NewArticle',
      component: () => import('../views/article/NewArticle.vue'),
    },
    {
      path: '/',
      component: () => import('../views/Index.vue'),
      children: [
        {
          path: '',
          name: 'Home', // 首頁
          component: () => import('../views/Main.vue'),
        },
        {
          path: 'forums', //所有看板
          name: 'Forums',
          component: () => import('../views/Forums.vue'),
        },
        {
          path: 'popular', //熱門看板
          name: 'Popular',
          component: () => import('../views/Popular.vue'),
        },
        {
          path: 'article/:id', //熱門看板
          name: 'Article',
          component: () => import('../views/article/Index.vue'),
        },
      ],
    },
    {
      path: '/user',
      component: () => import('../views/user/Index.vue'),
      children: [
        {
          path: 'profile', //個人牆
          name: 'Profile',
          component: () => import('../views/user/Profile.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'message', //訊息
          name: 'Message',
          component: () => import('../views/user/Message.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'follow', //已追蹤看板
          name: 'Follow',
          component: () => import('../views/user/FollowForum.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'favorite', //已收藏文章
          name: 'Favorite',
          component: () => import('../views/user/FavoriteArticle.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'settings', //個人設定
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
