<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
  // router.push('/')
}
</script>

<template>
  <header class="position-sticky top-0 z-2">
    <!-- navbar -->
    <nav class="navbar navbar-expand-lg bg-dark">
      <div class="container">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <img src="@/assets/images/burger.png" alt="burger" width="24" height="24" />
        </button>
        <!-- Logo -->
        <router-link to="/" class="p-1 me-0">
          <img src="@/assets/images/logo.svg" alt="chat2me" />
        </router-link>
        <!-- 手機版選單 -->
        <div class="collapse navbar-collapse" id="navbarContent">
          <!-- 桌機版選單 -->
          <ul class="navbar-nav ms-auto">
            <!-- 登入後 -->
            <template v-if="authStore.isLoggedIn">
              <!-- 新增文章 -->
              <li class="nav-item me-3">
                <router-link to="/article/new" class="nav-link">
                  <img src="@/assets/images/plus.png" alt="plus" width="24" height="24" />
                </router-link>
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
                    src="@/assets/images/avatar06.png"
                    alt="avatar"
                    class="rounded-circle"
                    width="24"
                    height="24"
                  />
                </a>
                <ul class="dropdown-menu dropdown-menu-end settings border-light-subtle">
                  <li>
                    <router-link class="dropdown-item" to="/user/profile">
                      <img
                        src="@/assets/images/wall.png"
                        class="me-2"
                        alt="profile"
                        width="16"
                        height="16"
                      />
                      <span class="align-middle">我的個人牆</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" to="/user/message">
                      <img
                        src="@/assets/images/comment.png"
                        class="me-2"
                        alt="message"
                        width="16"
                        height="16"
                      />
                      <span class="align-middle">我的訊息</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" to="/user/follow">
                      <img
                        src="@/assets/images/followed.png"
                        class="me-2"
                        alt="follow"
                        width="16"
                        height="16"
                      />
                      <span class="align-middle">我的追蹤</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" to="/user/favorite">
                      <img
                        src="@/assets/images/bookmark-outline.png"
                        class="me-2"
                        alt="favorite"
                        width="16"
                        height="16"
                      />
                      <span class="align-middle">我的收藏</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" to="/user/settings">
                      <img
                        src="@/assets/images/setting.png"
                        class="me-2"
                        alt="settings"
                        width="16"
                        height="16"
                      />
                      <span class="align-middle">個人設定</span>
                    </router-link>
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
              <router-link to="/login" class="btn btn-secondary rounded-1">登入</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
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
/*.dropdown-menu::before,
.dropdown-menu::after {
  border: solid transparent;
  content: '';
  width: 0;
  height: 0;
  position: absolute;
  // border-width: 0 10px 10px 10px;
  // border-bottom-color: #1d2938;
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
}
  */
</style>
