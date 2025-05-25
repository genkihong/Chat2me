<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'
import ArticleCard from '@/components/ArticleCard.vue'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const fileInput = ref(null)
const selectedFile = ref(null)
const previewUrl = ref(null)

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
    // uploadImage()
  }
}
//上傳圖片
const uploadImage = async () => {
  const formData = new FormData()
  formData.append('image', selectedFile.value)
  // console.log(formData.get('image'))
  await userStore.uploadImage(formData)
}
</script>

<template>
  <div class="profile col-lg-9">
    <div class="card bg-dark">
      <div class="profile-bg bg-s-cover position-relative">
        <!-- 編輯按鈕 -->
        <button
          class="position-absolute edit-btn btn text-white rounded-circle opacity-50 p-2 bg-dark"
          @click=""
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            class="bi bi-pencil"
            viewBox="0 0 16 16"
          >
            <path
              d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"
            />
          </svg>
        </button>
      </div>
      <div class="card-body main px-2">
        <div class="d-flex flex-column align-items-center mb-3">
          <div class="z-1 mb-3 position-relative">
            <!-- 圖片預覽 -->
            <img
              :src="previewUrl"
              alt="avator"
              class="rounded-circle avator-img"
              v-if="previewUrl"
            />
            <!-- 個人圖片 -->
            <img
              src="https://fakeimg.pl/50x50"
              alt="avator"
              class="rounded-circle avator-img"
              v-else
            />
            <!-- 上傳圖片按鈕 -->
            <button
              class="position-absolute upload-btn btn text-white rounded-circle opacity-50 p-2 bg-dark"
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
          </div>
          <h3 class="text-light">我是來自東方的龍</h3>
          <small class="text-secondary">@taiwan1</small>

          <input
            type="file"
            class="d-none"
            @change="handleFileChange"
            accept="image/*"
            ref="fileInput"
          />
        </div>
        <!-- 切換Tab -->
        <ul class="nav nav-underline nav-fill">
          <li class="nav-item">
            <button
              type="button"
              class="nav-link active"
              data-bs-toggle="tab"
              data-bs-target="#followed"
            >
              <div class="fw-bold text-light mb-1">10</div>
              <div class="text-secondary">追蹤者</div>
            </button>
          </li>
          <li class="nav-item">
            <button type="button" class="nav-link" data-bs-toggle="tab" data-bs-target="#article">
              <div class="fw-bold text-light mb-1">10</div>
              <div class="text-secondary">文章</div>
            </button>
          </li>
        </ul>

        <div class="tab-content">
          <!-- 追蹤 -->
          <div class="tab-pane active px-2 py-3" id="followed" role="tabpanel" tabindex="0">
            <div class="d-flex mb-3">
              <div class="me-2">
                <img src="https://fakeimg.pl/250x100/" class="rounded-circle" alt="..." />
              </div>
              <div class="d-flex w-100">
                <div class="me-auto">
                  <h6 class="text-light mb-1">不想上班族</h6>
                  <small class="text-secondary">@abcde</small>
                </div>
                <div class="d-flex align-items-center">
                  <button class="btn btn-primary px-3">追蹤</button>
                </div>
              </div>
            </div>
          </div>
          <!-- 文章 -->
          <div class="tab-pane p-3" id="article" role="tabpanel" tabindex="0">
            <ArticleCard />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile .main {
  margin-top: -100px;
}
.profile-bg {
  background-image: url('/images/user-bg.png');
  height: 240px;
}
.avator-img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  object-position: center;
}
.edit-btn {
  top: 20px;
  right: 20px;
  &:active {
    border-color: #040811;
  }
}
.upload-btn {
  right: -10px;
  bottom: 0;
  &:active {
    border-color: #040811;
  }
}
#followed img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  object-position: center;
}
</style>
