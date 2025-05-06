<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

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
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col col-md-5">
        <div class="card shadow">
          <h1 class="p-3 text-center">Chat2me</h1>
          <div class="card-body">
            <h3 class="card-title mb-4 text-center">登入</h3>
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="email"
                  placeholder="您的電子信箱"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">密碼</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                  placeholder="請輸入密碼"
                  required
                />
              </div>
              <div class="d-flex mb-5 justify-content-between">
                <div>
                  <router-link to="/signup">註冊</router-link>
                </div>
                <div>
                  <router-link to="/forget-password">忘記密碼</router-link>
                </div>
              </div>
              <button type="submit" class="btn btn-primary btn-lg w-100 rounded-1">登入</button>
            </form>
          </div>
        </div>
        <!-- <form>
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="您的電子信箱"
              required
            />
            <label for="email">電子信箱</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="請輸入密碼"
              required
            />
            <label for="password">密碼</label>
          </div>

          <div class="d-flex mb-5 justify-content-between">
            <div>
              <router-link to="/signup">註冊</router-link>
            </div>
            <div>
              <a href="#" class="forgot-pass">忘記密碼</a>
            </div>
          </div>

          <div class="d-grid">
            <button type="submit" class="btn btn-lg btn-primary">登入</button>
          </div>
        </form> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
