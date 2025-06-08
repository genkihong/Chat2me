export default class CustomUploadAdapter {
  constructor(loader, articleStore) {
    this.loader = loader
    this.articleStore = articleStore
  }

  // 上傳檔案
  async upload() {
    const file = await this.loader.file
    const url = await this.articleStore.uploadImage(file)
    return { default: url } // CKEditor 會插入這個圖片網址
  }
  // upload() {
  //   return this.loader.file.then((file) => {
  //     return this.articleStore.uploadImage(file).then((url) => {
  //       return {
  //         default: url,
  //       }
  //     })
  //   })
  // }

  // 中止上傳（可選）
  abort() {
    // 實作取消邏輯（例如 abortController）
  }
}
