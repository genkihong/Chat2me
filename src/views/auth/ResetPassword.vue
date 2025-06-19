<script lang="ts" setup>
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const password = ref('')
const confirmPassword = ref('')

const onSubmit = () => {
  const authStore = useAuthStore()
  authStore.resetPassword({
    token: route.params.token,
    newPassword: password.value,
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
              <h3 class="card-title text-center mb-5">重設密碼</h3>
              <form @submit.prevent="onSubmit">
                <div class="mb-3">
                  <label for="password" class="form-label required">設定新密碼</label>
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
                  <button type="submit" class="btn btn-lg btn-custom rounded-1">重設密碼</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
