<script setup>
import '@/assets/styles/custom-ckeditor.css'
import { useArticleStore } from '@/stores/articleStore'
import { useForumStore } from '@/stores/forumStore'
import CustomUploadAdapter from '@/utils/custom-upload-adapter.js'
import { Ckeditor } from '@ckeditor/ckeditor5-vue'
import {
  Alignment,
  Autoformat,
  AutoImage,
  Autosave,
  Bold,
  ClassicEditor,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  HorizontalLine,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Paragraph,
  RemoveFormat,
  SimpleUploadAdapter,
  TextTransformation,
  Underline,
} from 'ckeditor5'
import 'ckeditor5/ckeditor5.css'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'

const articleStore = useArticleStore()
const forumStore = useForumStore()

const { newArticle } = storeToRefs(articleStore)
const { forumList } = storeToRefs(forumStore)

const editor = ClassicEditor

// 這裡不能用箭頭函式，因為回傳值是一個類別
function CustomUploadAdapterPlugin(editor) {
  // editor.plugins.get('FileRepository').on('change:uploaded', (evt) => {
  //   console.log('Image uploaded!')
  //   console.log(evt)
  //   // do something here
  // })
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    const articleStore = useArticleStore()
    return new CustomUploadAdapter(loader, articleStore)
  }
}
const config = computed(() => {
  return {
    // simpleUpload: {
    //   uploadUrl: `${import.meta.env.VITE_API_URL}/api/v1/article/upload`,
    //   headers: {
    //     Authorization: `Bearer ${authStore.token}`,
    //   },
    // },
    extraPlugins: [CustomUploadAdapterPlugin],
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'heading',
        '|',
        'fontSize',
        'fontFamily',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        'removeFormat',
        '|',
        'horizontalLine',
        'link',
        'insertImage',
        '|',
        'alignment',
        '|',
        'bulletedList',
        'numberedList',
        'outdent',
        'indent',
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      Alignment,
      Autoformat,
      AutoImage,
      Autosave,
      Bold,
      Essentials,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      GeneralHtmlSupport,
      Heading,
      HorizontalLine,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      Paragraph,
      RemoveFormat,
      SimpleUploadAdapter,
      TextTransformation,
      Underline,
    ],
    fontFamily: {
      supportAllValues: true,
    },
    fontSize: {
      options: [10, 12, 14, 'default', 18, 20, 22],
      supportAllValues: true,
    },
    heading: {
      options: [
        {
          model: 'paragraph',
          title: 'Paragraph',
          class: 'ck-heading_paragraph',
        },
        {
          model: 'heading1',
          view: 'h1',
          title: 'Heading 1',
          class: 'ck-heading_heading1',
        },
        {
          model: 'heading2',
          view: 'h2',
          title: 'Heading 2',
          class: 'ck-heading_heading2',
        },
        {
          model: 'heading3',
          view: 'h3',
          title: 'Heading 3',
          class: 'ck-heading_heading3',
        },
        {
          model: 'heading4',
          view: 'h4',
          title: 'Heading 4',
          class: 'ck-heading_heading4',
        },
        {
          model: 'heading5',
          view: 'h5',
          title: 'Heading 5',
          class: 'ck-heading_heading5',
        },
        {
          model: 'heading6',
          view: 'h6',
          title: 'Heading 6',
          class: 'ck-heading_heading6',
        },
      ],
    },
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true,
        },
      ],
    },
    image: {
      toolbar: [
        // 'toggleImageCaption',
        // 'imageTextAlternative',
        // '|',
        'imageStyle:inline',
        // 'imageStyle:wrapText',
        'imageStyle:breakText',
        '|',
        'resizeImage',
      ],
    },
    licenseKey: 'GPL',
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file',
          },
        },
      },
    },
    placeholder: 'Chat2me',
  }
})

const addArticle = async () => {
  articleStore.postNewArticle(newArticle.value)
}

const onReady = (editorInstance) => {
  // 當內容變動時，解析圖片 URL
  editorInstance.model.document.on('change:data', () => {
    const html = editorInstance.getData()
    const div = document.createElement('div')
    div.innerHTML = html
    const imageUrls = Array.from(div.querySelectorAll('img')).map((img) => img.src)
    // console.log('圖片 URLs：', imageUrls)
  })
}
onMounted(() => {
  forumStore.getForumList()
})
</script>

<template>
  <section class="bg-dark vh-100">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10 py-3">
          <div class="card bg-dark">
            <div class="card-body">
              <h4 class="mb-5">發表文章</h4>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label" for="forum">選擇看板</label>
                  <select id="forum" class="form-select" v-model="newArticle.forum_id">
                    <option :value="item.forum_id" v-for="item of forumList" :key="item.forum_id">
                      {{ item.forum_name }}
                    </option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="title" class="form-label">文章標題</label>
                  <input id="title" type="text" class="form-control" v-model="newArticle.title" />
                </div>
              </div>
              <div class="mb-3">
                <ckeditor
                  v-model="newArticle.content"
                  :editor="editor"
                  :config="config"
                  @ready="onReady"
                />
              </div>
              <div class="text-end">
                <button type="button" class="btn btn-custom rounded-1 px-3" @click="addArticle">
                  確定
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.ck-editor__editable_inline {
  /* 設定最低高度 */
  min-height: 250px;
  max-height: 500px;
  color: black;
}
</style>
