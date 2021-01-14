<template>
  <div class="myEditor">
    <quill-editor
      v-model="content"
      ref="myTextEditor"
      :options="editorOption"
      @change="onChange"
    >
      <div id="toolbar" slot="toolbar">
        <select class="ql-size">
          <option value="small"></option>
          <!-- Note a missing, thus falsy value, is used to reset to default -->
          <option selected></option>
          <option value="large"></option>
          <option value="huge"></option>
        </select>
        <!-- Add subscript and superscript buttons -->
        <span class="ql-formats">
          <button class="ql-script" value="sub"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-script" value="super"></button>
        </span>
        <span class="ql-formats">
          <button type="button" class="ql-bold"></button>
        </span>
        <span class="ql-formats">
          <button type="button" class="ql-italic"></button>
        </span>
        <span class="ql-formats">
          <button type="button" class="ql-blockquote"></button>
        </span>
        <span class="ql-formats">
          <button type="button" class="ql-list" value="ordered"></button>
        </span>
        <span class="ql-formats">
          <button type="button" class="ql-list" value="bullet"></button>
        </span>
        <span class="ql-formats">
          <button type="button" class="ql-link"></button>
        </span>
        <span class="ql-formats">
          <button type="button" @click="imgClick" style="outline:none">
            <svg viewBox="0 0 18 18">
              <rect class="ql-stroke" height="10" width="12" x="3" y="4" />
              <circle class="ql-fill" cx="6" cy="7" r="1" />
              <polyline
                class="ql-even ql-fill"
                points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"
              />
            </svg>
          </button>
        </span>
        <span class="ql-formats">
          <button type="button" class="ql-video"></button>
        </span>
      </div>
    </quill-editor>
  </div>
</template>

<script>
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
// import { quillEditor } from 'vue-quill-editor'
// import Quill from 'quill'
// import { ImageResize } from 'quill-image-resize-module'
// Quill.register('modules/imageResize', ImageResize)

export default {
  name: 'myEditor',

  props: {
    value: {
      type: String
    },
    /*上传图片的地址*/
    uploadUrl: {
      type: String,
      default: '/'
    },
    /*上传图片的file控件name*/
    fileName: {
      type: String,
      default: 'file'
    },
    maxUploadSize: {
      type: Number,
      default: 1024 * 1024 * 500
    }
  },

  data() {
    return {
      content: '',
      editorOption: {
        modules: {
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          },
          toolbar: '#toolbar'
        }
      }
    }
  },

  computed: {
    editor() {
      return this.$refs.myTextEditor.quill
    }
  },

  methods: {
    onChange() {
      this.$emit('input', this.content)
    },
    /*点击上传图片按钮*/
    imgClick() {
      if (!this.uploadUrl) {
        console.log('no editor uploadUrl')
        return
      }
      /*内存创建input file*/
      var input = document.createElement('input')
      input.type = 'file'
      input.name = this.fileName
      input.accept = 'image/jpeg,image/png,image/jpg,image/gif'
      input.onchange = this.onFileChange
      input.click()
    },
    /*监听 onchange*/
    onFileChange(e) {
      const file = e.target.files[0]
      if (file.length === 0) {
        return
      }
      this.editor.focus()
      if (file.size > this.maxUploadSize) {
        this.$message('图片不能大于500KB,图片尺寸过大')
      } else {
        this.uploadImage(file)
      }
    },
    // 上传方法
    async uploadImage(file) {
      var data = new FormData()
      data.append(this.fileName, file)
      this.$http.post(this.uploadUrl, data).then(res => {
        if (res.data) {
          this.editor.insertEmbed(
            this.editor.getSelection().index,
            'image',
            res.data.url
          )
        }
      })
    }
  },

  components: {
    // quillEditor
  },

  mounted() {
    this.content = this.value
  },

  watch: {
    value(newVal) {
      if (this.editor) {
        if (newVal !== this.content) {
          this.content = newVal
        }
      }
    }
  }
}
</script>

<style lang="scss">
.myEditor {
  width: 100%;
  margin-bottom: 2rem;
}
.quill-editor {
  height: 500px;
  .ql-tooltip {
    left: 0 !important;
  }
}

.limit {
  height: 30px;
  border: 1px solid #ccc;
  line-height: 30px;
  text-align: right;
  padding: 0;
  margin: 0;
  margin: 10px 0;

  span {
    color: #ee2a7b;
  }
}
</style>
