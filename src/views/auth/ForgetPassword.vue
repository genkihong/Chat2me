<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const email = ref('')

const onSubmit = () => {
  const authStore = useAuthStore()
  authStore.forgetPassword(email.value)
}
</script>
<template>
  <section class="auth-bg vh-100 bg-s-cover">
    <div class="container pt-5">
      <div class="row justify-content-center">
        <div class="col col-md-5">
          <div class="card shadow bg-dark text-light">
            <div class="card-body">
              <h3 class="card-title text-center mb-5">忘記密碼</h3>
              <form @submit.prevent="onSubmit">
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
                <div class="fs-7 mb-5">您將會收到重設密碼驗證信</div>
                <div class="d-grid">
                  <button type="submit" class="btn btn-lg btn-custom rounded-1">
                    寄送電子郵件
                  </button>
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
