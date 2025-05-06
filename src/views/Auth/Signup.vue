<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
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
  <div class="container mt-5">
    <div class="row justify-content-center align-items-center h-100">
      <div class="col col-md-5">
        <div class="card shadow">
          <h1 class="p-3 text-center">Chat2me</h1>
          <div class="card-body">
            <h3 class="card-title mb-4 text-center">註冊</h3>
            <form @submit.prevent="signup">
              <div class="form-floating mb-3">
                <input
                  v-model="name"
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="您的名稱"
                  required
                />
                <label for="name">名稱</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  v-model="email"
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
                  v-model="password"
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="請輸入密碼"
                  required
                />
                <label for="password">密碼</label>
              </div>
              <div class="form-floating mb-5">
                <input
                  v-model="confirmPassword"
                  type="password"
                  class="form-control"
                  id="confirmPassword"
                  placeholder="請確認密碼"
                  required
                />
                <label for="confirmPassword">確認密碼</label>
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-lg btn-primary rounded-1">註冊</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
