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
  <div class="card bg-dark">
    <div class="card-body">
      <h4 class="mb-5">個人設定</h4>
      <div class="text-center mb-5">
        <!-- 圖片預覽 -->
        <img
          :src="previewUrl"
          class="rounded-circle object-fit-cover"
          alt="avatar"
          width="150"
          height="150"
          v-if="previewUrl"
        />
        <!-- 個人圖片 -->
        <img
          :src="user.imageUrl"
          class="rounded-circle object-fit-cover"
          alt="avatar"
          width="150"
          height="150"
          v-else
        />
        <!-- 上傳圖片按鈕 -->
        <button
          class="position-relative btn upload-btn border-dark-active text-white rounded-circle opacity-50 p-2 bg-dark"
          @click="triggerFileInput"
        >
          <img src="@/assets/images/camera.png" alt="camera" width="24" height="24" />
        </button>
        <input
          type="file"
          class="d-none"
          @change="handleFileChange"
          accept="image/*"
          ref="fileInput"
        />
      </div>
      <form class="row" @submit.prevent="handleSubmit">
        <!-- <div class="col-md-6 mb-3">
          <label for="userId" class="form-label">編號</label>
          <input type="text" class="form-control bg-dark" id="userId" v-model="user.id" readonly />
        </div> -->
        <div class="col-md-6 mb-3">
          <label for="email" class="form-label">電子信箱</label>
          <input
            type="text"
            class="form-control bg-dark"
            id="email"
            v-model="user.email"
            readonly
          />
        </div>
        <div class="col-md-6 mb-3">
          <label for="name" class="form-label">名稱</label>
          <input type="text" class="form-control" id="name" v-model="user.name" />
        </div>
        <div class="mb-3">
          <label for="descrption" class="form-label">自我介紹</label>
          <textarea
            type="text"
            class="form-control"
            id="descrption"
            rows="3"
            v-model="user.description"
          />
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-custom rounded-1 px-3">儲存</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.upload-btn {
  top: 60px;
  right: 30px;
}
textarea {
  resize: none;
}
</style>
