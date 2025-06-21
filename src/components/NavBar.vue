<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useForumStore } from '@/stores/forumStore'
import { useUserStore } from '@/stores/userStore'
import { getIconUrl } from '@/utils'
import { Offcanvas } from 'bootstrap'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const { userInfo, isLoggedIn } = storeToRefs(authStore)
const forumStore = useForumStore()
const { forum } = storeToRefs(forumStore)
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const offcanvas = ref(null)
let bsOffcanvas = null

const close = () => {
  bsOffcanvas.hide()
}
const logout = () => {
  close()
  authStore.logout()
  // router.push('/')
}

onMounted(() => {
  bsOffcanvas = new Offcanvas(offcanvas.value)
  if (isLoggedIn.value) {
    userStore.getUser(userInfo.value.id)
  }
})
</script>

<template>
  <header class="position-sticky top-0 z-2">
    <!-- navbar -->
    <nav class="navbar navbar-expand-lg bg-dark">
      <div class="container">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileMenu"
        >
          <img src="@/assets/images/burger.png" alt="burger" width="24" height="24" />
        </button>
        <!-- Logo -->
        <RouterLink to="/" class="p-1 me-0">
          <img src="@/assets/images/logo.svg" alt="chat2me" />
        </RouterLink>

        <div class="collapse navbar-collapse" id="navbarContent">
          <!-- 桌機版選單 -->
          <ul class="navbar-nav ms-auto">
            <!-- 登入後 -->
            <template v-if="isLoggedIn">
              <!-- 新增文章 -->
              <li class="nav-item me-3">
                <RouterLink to="/article/new" class="nav-link">
                  <img src="@/assets/images/plus.png" alt="plus" width="24" height="24" />
                </RouterLink>
              </li>
              <!-- 通知 -->
              <li class="nav-item dropdown me-3">
                <a href="" class="nav-link position-relative" data-bs-toggle="dropdown">
                  <img src="@/assets/images/notify.png" alt="notify" width="24" height="24" />
                  <span class="badge-num"> 10 </span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end notify border-light-subtle">
                  <li>
                    <div class="d-flex p-2">
                      <h6 class="fw-bold text-light me-auto mb-0">通知</h6>
                      <small class="text-light">全部已讀</small>
                    </div>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <a href="#" class="dropdown-item d-flex align-items-center">
                      <img
                        src="@/assets/images/ellipse.png"
                        class="me-2"
                        alt="ellipse"
                        width="8"
                        height="8"
                      />
                      <!-- 圖示 -->
                      <div
                        class="rounded-circle opacity-50 bg-dark notify-icon d-flex align-items-center me-3"
                      >
                        <img
                          src="@/assets/images/chat.png"
                          class="mx-auto"
                          alt="chat"
                          width="24"
                          height="24"
                        />
                      </div>
                      <!-- 內容 -->
                      <p class="mb-1">
                        <small class="text-light">#情報 免費領取! 現金一千萬等你來拿!</small>
                      </p>
                      <!-- 時間 -->
                      <div class="fs-7 text-body-tertiary align-self-start ms-auto">13:00</div>
                    </a>
                  </li>
                </ul>
              </li>
              <!-- 訊息 -->
              <li class="nav-item dropdown me-3">
                <a href="" class="nav-link position-relative" data-bs-toggle="dropdown">
                  <img src="@/assets/images/msg.png" alt="msg" width="24" height="24" />
                  <span class="badge-num"> 10 </span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end message border-light-subtle">
                  <li>
                    <div class="d-flex p-2">
                      <h6 class="fw-bold text-light me-auto mb-0">訊息</h6>
                      <small class="text-light">全部已讀</small>
                    </div>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <a href="#" class="dropdown-item d-flex align-items-center">
                      <img
                        src="@/assets/images/ellipse.png"
                        class="me-2"
                        alt="ellipse"
                        width="8"
                        height="8"
                      />
                      <!-- 圖示 -->
                      <img
                        src="@/assets/images/avatar06.png"
                        class="rounded-circle object-fit-cover"
                        alt="chat"
                        width="42"
                        height="42"
                      />
                      <div class="ms-2">
                        <div class="d-flex">
                          <!-- 留言者 -->
                          <small class="text-light fw-bold">小美</small>
                          <!-- 時間 -->
                          <div class="fs-7 text-body-tertiary ms-auto">13:00</div>
                        </div>
                        <!-- 內容 -->
                        <p class="text-light mb-0">
                          <small>阿呆，你最近都不理我，你484在外面有別的女人!!!</small>
                        </p>
                      </div>
                    </a>
                  </li>
                </ul>
              </li>
              <!-- 個人資料 -->
              <li class="nav-item dropdown">
                <a href="" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                  <img
                    :src="user.imageUrl"
                    alt="avatar"
                    class="rounded-circle object-fit-cover"
                    width="28"
                    height="28"
                  />
                </a>
                <ul class="dropdown-menu dropdown-menu-end settings border-light-subtle">
                  <li>
                    <RouterLink class="dropdown-item" to="/user/profile">
                      <img
                        src="@/assets/images/wall.png"
                        class="me-2"
                        alt="profile"
                        width="16"
                        height="16"
                      />
                      <span class="align-middle">我的個人牆</span>
                    </RouterLink>
                  </li>
                  <!-- <li>
                    <RouterLink class="dropdown-item" to="/user/message">
                      <img
                        src="@/assets/images/comment.png"
                        class="me-2"
                        alt="message"
                        width="16"
                        height="16"
                      />
                      <span class="align-middle">我的訊息</span>
                    </RouterLink>
                  </li> -->
                  <li>
                    <RouterLink class="dropdown-item" to="/user/follow">
                      <img
                        src="@/assets/images/followed.png"
                        class="me-2"
                        alt="follow"
                        width="16"
                        height="16"
                      />
                      <span class="align-middle">我的追蹤</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink class="dropdown-item" to="/user/favorite">
                      <img
                        src="@/assets/images/bookmark-outline.png"
                        class="me-2"
                        alt="favorite"
                        width="16"
                        height="16"
                      />
                      <span class="align-middle">我的收藏</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink class="dropdown-item" to="/user/settings">
                      <img
                        src="@/assets/images/setting.png"
                        class="me-2"
                        alt="settings"
                        width="16"
                        height="16"
                      />
                      <span class="align-middle">個人設定</span>
                    </RouterLink>
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <a href="#" class="dropdown-item" @click="logout">
                      <img
                        src="@/assets/images/logout.png"
                        class="me-2"
                        alt="logout"
                        width="16"
                        height="16"
                      />
                      <span class="align-middle">登出</span>
                    </a>
                  </li>
                </ul>
              </li>
            </template>
            <!-- 未登入 -->
            <li class="nav-item" v-else>
              <RouterLink to="/login" class="btn btn-secondary rounded-1">登入</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- 手機版選單 -->
    <div
      ref="offcanvas"
      class="offcanvas offcanvas-start"
      tabindex="-1"
      id="mobileMenu"
      aria-labelledby="offcanvasLeLabel"
    >
      <div class="offcanvas-header">
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav ms-auto">
          <!-- 登入後 -->
          <template v-if="isLoggedIn">
            <!-- 新增文章 -->
            <li class="nav-item me-3">
              <RouterLink to="/article/new" class="nav-link" @click="close">
                <img src="@/assets/images/plus.png" alt="plus" width="24" height="24" />
              </RouterLink>
            </li>
            <!-- 通知 -->
            <li class="nav-item dropdown me-3">
              <a href="" class="nav-link position-relative" data-bs-toggle="dropdown">
                <img src="@/assets/images/notify.png" alt="notify" width="24" height="24" />
                <span class="badge-num"> 10 </span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end notify border-light-subtle">
                <li>
                  <div class="d-flex p-2">
                    <h6 class="fw-bold text-light me-auto mb-0">通知</h6>
                    <small class="text-light">全部已讀</small>
                  </div>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <a href="#" class="dropdown-item d-flex align-items-center">
                    <img
                      src="@/assets/images/ellipse.png"
                      class="me-2"
                      alt="ellipse"
                      width="8"
                      height="8"
                    />
                    <!-- 圖示 -->
                    <div
                      class="rounded-circle opacity-50 bg-dark notify-icon d-flex align-items-center me-3"
                    >
                      <img
                        src="@/assets/images/chat.png"
                        class="mx-auto"
                        alt="chat"
                        width="24"
                        height="24"
                      />
                    </div>
                    <!-- 內容 -->
                    <p class="mb-1">
                      <small class="text-light">#情報 免費領取! 現金一千萬等你來拿!</small>
                    </p>
                    <!-- 時間 -->
                    <div class="fs-7 text-body-tertiary align-self-start ms-auto">13:00</div>
                  </a>
                </li>
              </ul>
            </li>
            <!-- 訊息 -->
            <li class="nav-item dropdown me-3">
              <a href="" class="nav-link position-relative" data-bs-toggle="dropdown">
                <img src="@/assets/images/msg.png" alt="msg" width="24" height="24" />
                <span class="badge-num"> 10 </span>
              </a>
              <ul
                class="dropdown-menu dropdown-menu-end message border-light-subtle"
                style="max-width: 375px"
              >
                <li>
                  <div class="d-flex p-2">
                    <h6 class="fw-bold text-light me-auto mb-0">訊息</h6>
                    <small class="text-light">全部已讀</small>
                  </div>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li class="overflow-auto">
                  <a href="#" class="dropdown-item d-flex align-items-center">
                    <img
                      src="@/assets/images/ellipse.png"
                      class="me-2"
                      alt="ellipse"
                      width="8"
                      height="8"
                    />
                    <!-- 圖示 -->
                    <img
                      src="@/assets/images/avatar06.png"
                      class="rounded-circle object-fit-cover"
                      alt="chat"
                      width="42"
                      height="42"
                    />
                    <div class="ms-2">
                      <div class="d-flex">
                        <!-- 留言者 -->
                        <small class="text-light fw-bold">小美</small>
                        <!-- 時間 -->
                        <div class="fs-7 text-body-tertiary ms-auto">13:00</div>
                      </div>
                      <!-- 內容 -->
                      <p class="text-light mb-0">
                        <small>阿呆，你最近都不理我，你484在外面有別的女人!!!</small>
                      </p>
                    </div>
                  </a>
                </li>
              </ul>
            </li>
            <!-- 個人資料 -->
            <li class="nav-item dropdown">
              <a href="" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                <img
                  :src="user.imageUrl"
                  alt="avatar"
                  class="rounded-circle"
                  width="24"
                  height="24"
                />
              </a>
              <!-- 下拉選單 -->
              <ul class="dropdown-menu settings border-light-subtle">
                <li>
                  <RouterLink class="dropdown-item" to="/user/profile" @click="close">
                    <img
                      src="@/assets/images/wall.png"
                      class="me-2"
                      alt="profile"
                      width="16"
                      height="16"
                    />
                    <span class="align-middle">我的個人牆</span>
                  </RouterLink>
                </li>
                <!-- <li>
                  <RouterLink class="dropdown-item" to="/user/message" @click="close">
                    <img
                      src="@/assets/images/comment.png"
                      class="me-2"
                      alt="message"
                      width="16"
                      height="16"
                    />
                    <span class="align-middle">我的訊息</span>
                  </RouterLink>
                </li> -->
                <li>
                  <RouterLink class="dropdown-item" to="/user/follow" @click="close">
                    <img
                      src="@/assets/images/followed.png"
                      class="me-2"
                      alt="follow"
                      width="16"
                      height="16"
                    />
                    <span class="align-middle">我的追蹤</span>
                  </RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="/user/favorite" @click="close">
                    <img
                      src="@/assets/images/bookmark-outline.png"
                      class="me-2"
                      alt="favorite"
                      width="16"
                      height="16"
                    />
                    <span class="align-middle">我的收藏</span>
                  </RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="/user/settings" @click="close">
                    <img
                      src="@/assets/images/setting.png"
                      class="me-2"
                      alt="settings"
                      width="16"
                      height="16"
                    />
                    <span class="align-middle">個人設定</span>
                  </RouterLink>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a href="#" class="dropdown-item" @click="logout">
                    <img
                      src="@/assets/images/logout.png"
                      class="me-2"
                      alt="logout"
                      width="16"
                      height="16"
                    />
                    <span class="align-middle">登出</span>
                  </a>
                </li>
              </ul>
            </li>
          </template>
          <!-- 未登入 -->
          <li class="nav-item mb-3" v-else>
            <RouterLink to="/login" class="btn btn-secondary rounded-1" @click="close"
              >登入</RouterLink
            >
          </li>
        </ul>
        <div class="list-group rounded-0">
          <RouterLink
            :to="{ path: '/forums' }"
            class="list-group-item list-group-item-action p-3"
            @click="close"
          >
            <img src="@/assets/images/board.png" class="me-2" alt="board" width="20" height="20" />
            <span class="align-middle">所有看板</span>
          </RouterLink>
          <RouterLink
            :to="{ path: '/popular' }"
            class="list-group-item list-group-item-action p-3"
            @click="close"
          >
            <img src="@/assets/images/hot.png" class="me-2" alt="hot" width="20" height="20" />
            <span class="align-middle">即時熱門看板</span>
          </RouterLink>
        </div>
        <div class="bg-dark p-3">
          <small class="text-secondary">即時熱門看板</small>
        </div>
        <!-- 看板選單 -->
        <div class="list-group rounded-0">
          <a
            href="#"
            class="list-group-item list-group-item-action p-3"
            v-for="item in forum.all"
            :key="item.forum_id"
          >
            <img :src="getIconUrl(item.icon)" class="me-3" alt="icon" width="20" height="20" />
            <span class="align-middle">{{ item.forum_name }}</span>
          </a>
          <!-- <RouterLink
                to="#"
                class="list-group-item list-group-item-action p-3"
                v-for="item in sidebarItems"
                :key="item"
              >
                <img :src="item.icon" class="me-2" alt="" width="20" />
                <span class="align-middle">{{ item.title }}</span>
              </RouterLink> -->
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
header > .navbar {
  height: 60px;
}
/* .nav-link .badge {
  top: 12px;
  right: -12px;
} */
.notify-icon {
  width: 42px;
  height: 42px;
}
.badge-num {
  color: #fff;
  width: 30px;
  height: 20px;
  background: #991f1f;
  border-radius: 50px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 20px;
  top: 0;
  font-size: 12px;
}

/* .dropdown-menu::before,
.dropdown-menu::after {
  border: solid transparent;
  content: '';
  width: 0;
  height: 0;
  position: absolute;
  border-width: 0 10px 10px 10px;
  border-bottom-color: #1d2938;
}
.dropdown-menu::before {
  border-width: 0 10px 10px 10px;
  border-bottom-color: #4c5a67;
}
.dropdown-menu::after {
  border-width: 0 12px 12px 12px;
  border-bottom-color: #1d2938;
}
.notify::before,
.message::before {
  top: -10px;
  left: 60px;
}
.notify::after,
.message::after {
  top: -9px;
  left: 58px;
}
.settings::before {
  top: -10px;
  left: 35px;
}
.settings::after {
  top: -9px;
  left: 33px;
} */
</style>
