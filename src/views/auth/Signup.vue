<script setup>
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const clearForm = () => {
  name.value = ''
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
}
const signup = async () => {
  const authStore = useAuthStore()

  if (password.value !== confirmPassword.value) {
    toast.error('兩次密碼輸入不一致', {
      theme: 'colored',
    })
    return
  }

  await authStore.signup({
    name: name.value,
    email: email.value,
    password: password.value,
  })

  clearForm()
}
</script>

<template>
  <section class="auth-bg vh-100 bg-s-cover">
    <div class="container pt-5">
      <div class="row">
        <div class="col-lg-5">
          <div class="card shadow bg-dark text-light">
            <div class="card-body">
              <h3 class="card-title fw-bold mb-5">建立帳號</h3>
              <form @submit.prevent="signup" class="mb-5">
                <div class="mb-3">
                  <label for="name" class="form-label required">名稱</label>
                  <input
                    v-model="name"
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="請輸入您的名稱"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label required">電子信箱</label>
                  <input
                    v-model="email"
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="請輸入電子信箱"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label required">設定密碼</label>
                  <input
                    v-model="password"
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="至少8個字元，包含大小寫與數字"
                    required
                  />
                </div>
                <div class="mb-5">
                  <label for="confirmPassword" class="form-label required">確認密碼</label>
                  <input
                    v-model="confirmPassword"
                    type="password"
                    class="form-control"
                    id="confirmPassword"
                    placeholder="請再次輸入密碼"
                    required
                  />
                </div>
                <div class="d-grid">
                  <button type="submit" class="btn btn-lg btn-custom rounded-1">註冊</button>
                </div>
              </form>
              <div class="text-center">
                已經有帳號 ? <router-link to="/login">請點此登入</router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-7 bg-p-center signup-bg"></div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.signup-bg {
  background-image: url(../../assets/images/signup.png);
}
</style>
