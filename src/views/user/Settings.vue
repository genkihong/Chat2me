<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'
import DOMPurify from 'dompurify'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const fileInput = ref(null)
const selectedFile = ref(null)
const previewUrl = ref(null)
//預防XSS
const sanitized = computed(() => DOMPurify.sanitize(user.value.description || ''))

//點選上傳圖片按鈕
const triggerFileInput = () => {
  fileInput.value.click()
}
//選擇上傳圖片
const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    previewUrl.value = URL.createObjectURL(file)
  }
}
//上傳圖片
const uploadImage = async () => {
  const formData = new FormData()
  formData.append('image', selectedFile.value)
  // console.log(formData.get('image'))
  await userStore.uploadImage(formData)
}
//取得資料
const getUser = async () => {
  const authStore = useAuthStore()
  const userId = authStore.user.id
  await userStore.getUser(userId)
}
//更新資料
const updateUser = async () => {
  await userStore.updateUser({
    id: user.value.id,
    name: user.value.name,
    description: sanitized.value,
  })
}
//儲存設定
const handleSubmit = async () => {
  //有上傳圖片時
  if (selectedFile.value) {
    await Promise.allSettled([uploadImage(), updateUser()])
  } else {
    await updateUser()
  }
  await getUser()
}
onMounted(() => {
  getUser()
})
</script>

<template>
  <div class="col-lg-6 offset-lg-1 pb-3">
    <h3 class="mb-5">個人設定</h3>
    <div class="text-center mb-5">
      <img :src="previewUrl" alt="avator" class="rounded-circle avator-img" v-if="previewUrl" />
      <img :src="user.imageUrl" alt="avator" class="rounded-circle avator-img" v-else />
      <!-- 上傳圖片按鈕 -->
      <button
        class="position-relative btn-upload btn text-white rounded-circle opacity-50 p-2 bg-dark"
        @click="triggerFileInput"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          class="bi bi-camera"
          viewBox="0 0 16 16"
        >
          <path
            d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z"
          />
          <path
            d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"
          />
        </svg>
      </button>
      <input
        type="file"
        class="d-none"
        @change="handleFileChange"
        accept="image/*"
        ref="fileInput"
      />
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="row mb-3">
        <label for="userId" class="col-sm-2 col-form-label">編號</label>
        <div class="col-sm-10">
          <input type="text" class="form-control bg-dark" id="userId" v-model="user.id" readonly />
        </div>
      </div>
      <div class="row mb-3">
        <label for="name" class="col-sm-2 col-form-label">名稱</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="name" v-model="user.name" />
        </div>
      </div>
      <div class="row mb-3">
        <label for="email" class="col-sm-2 col-form-label">電子信箱</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control bg-dark"
            id="email"
            v-model="user.email"
            readonly
          />
        </div>
      </div>
      <div class="row mb-3">
        <label for="descrption" class="col-sm-2 col-form-label">自我介紹</label>
        <div class="col-sm-10">
          <textarea
            type="text"
            class="form-control"
            id="descrption"
            rows="3"
            v-model="user.description"
          />
        </div>
      </div>
      <div class="text-end">
        <button type="submit" class="btn btn-custom rounded-1 px-3">儲存</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.avator-img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  object-position: center;
  margin-left: 100px;
}

.btn-upload {
  top: 60px;
  right: 30px;
  &:active {
    border-color: #040811;
  }
}

textarea {
  resize: none;
}
</style>
