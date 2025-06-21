<script setup>
import ProfileArticle from '@/components/ProfileArticle.vue'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const userStore = useUserStore()
const { profile } = storeToRefs(userStore)

const fileInput = ref(null)
const selectedFile = ref(null)
const previewUrl = ref(null)

//點選上傳圖片按鈕
const triggerFileInput = () => {
  fileInput.value.click()
}
//上傳圖片
const uploadImage = async () => {
  const formData = new FormData()
  formData.append('image', selectedFile.value)
  // console.log(formData.get('image'))
  await userStore.uploadImage(formData)
}
//個人資料
const getProfile = async () => {
  await userStore.getProfile()
}
//選擇上傳圖片
const handleFileChange = async (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    previewUrl.value = URL.createObjectURL(file)
    await uploadImage()
    getProfile()
  }
}
onMounted(() => {
  getProfile()
})
</script>

<template>
  <div class="card bg-dark">
    <div class="profile-bg bg-s-cover"></div>
    <div class="card-body profile">
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
          :src="profile.imageUrl"
          class="rounded-circle object-fit-cover"
          alt="avatar"
          width="150"
          height="150"
          v-else
        />
        <!-- 上傳圖片按鈕 -->
        <button
          class="position-relative upload-btn border-dark-active btn rounded-circle opacity-50 p-2 bg-dark"
          @click="triggerFileInput"
        >
          <img src="@/assets/images/camera.png" alt="camera" width="24" height="24" />
        </button>
        <input
          ref="fileInput"
          type="file"
          class="d-none"
          accept="image/*"
          @change="handleFileChange"
        />
        <h3 class="text-secondary mt-3">{{ profile.name }}</h3>
        <small class="text-body-tertiary">@{{ profile.id }}</small>
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
            <div class="fw-bold text-secondary mb-1">{{ profile.followedCount }}</div>
            <div class="text-body-tertiary">追蹤者</div>
          </button>
        </li>
        <li class="nav-item">
          <button type="button" class="nav-link" data-bs-toggle="tab" data-bs-target="#article">
            <div class="fw-bold text-secondary mb-1">{{ profile.articleCount }}</div>
            <div class="text-body-tertiary">文章</div>
          </button>
        </li>
      </ul>
      <div class="tab-content">
        <!-- 追蹤 -->
        <div class="tab-pane active pt-3" id="followed" role="tabpanel" tabindex="0">
          <div class="d-flex mb-3">
            <img
              src="@/assets/images/avatar12.png"
              class="rounded-circle object-fit-cover me-2"
              alt="avatar"
              width="42"
              height="42"
            />
            <div class="d-flex w-100">
              <div class="me-auto">
                <h6 class="text-secondary mb-1">不想上班族</h6>
                <small class="text-body-tertiary">@abcde</small>
              </div>
              <div class="d-flex align-items-center">
                <button class="btn btn-custom btn-sm">追蹤</button>
                <!-- <button class="btn btn-followed px-3">已追蹤</button> -->
              </div>
            </div>
          </div>
        </div>
        <!-- 文章 -->
        <div class="tab-pane pt-3" id="article" role="tabpanel" tabindex="0">
          <ProfileArticle
            v-for="(article, index) of profile.articleList"
            :key="index"
            :imageUrl="profile.imageUrl"
            v-bind="article"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  margin-top: -100px;
}
.profile-bg {
  background-image: url('@/assets/images/user-bg.png');
  height: 240px;
}
.upload-btn {
  top: 60px;
  right: 30px;
}
// #followed img {
//   width: 50px;
//   height: 50px;
//   object-fit: cover;
//   object-position: center;
// }
</style>
