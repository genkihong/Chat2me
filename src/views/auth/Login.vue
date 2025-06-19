<script setup>
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const login = async () => {
  const authStore = useAuthStore()
  authStore.login({
    email: email.value,
    password: password.value,
  })
}
</script>

<template>
  <section class="auth-bg vh-100 bg-s-cover">
    <div class="container pt-5">
      <div class="row justify-content-center">
        <div class="col col-md-5">
          <div class="card shadow bg-dark text-light">
            <div class="card-body">
              <h3 class="card-title fw-bold text-center mb-5">登入</h3>
              <form @submit.prevent="login" class="mb-5">
                <div class="mb-3">
                  <label for="email" class="form-label required">電子信箱</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="email"
                    placeholder="請輸入電子信箱"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label required">密碼</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model="password"
                    placeholder="請輸入密碼"
                    required
                  />
                </div>
                <div class="text-end mb-3">
                  <router-link to="/forget-password" class="text-decoration-none">
                    忘記密碼 ?
                  </router-link>
                </div>
                <button type="submit" class="btn btn-custom btn-lg w-100 rounded-1">登入</button>
              </form>
              <div class="text-center">
                還沒有帳號嗎 ? <router-link to="/signup">請點此註冊</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
