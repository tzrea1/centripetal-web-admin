<template>
  <div>
    <el-upload
      ref="upload"
      :action="ossUploadUrl"
      :data="dataObj"
      :before-upload="handleBeforeUpload"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
      name="file"
      :show-file-list="false"
      style="display: none"
    />
    <div ref="editor" class="editor" :style="styles" />
    <el-button @click="handleSave">保存</el-button>
    <!-- 新增的保存按钮 -->
  </div>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { getToken } from '@/utils/auth'
import { policy } from '@/api/oss' // 导入oss相关的api
import axios from 'axios'

export default {
  name: 'Editor',
  props: {
    value: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: null
    },
    minHeight: {
      type: Number,
      default: null
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    fileSize: {
      type: Number,
      default: 5
    },
    type: {
      type: String,
      default: 'url'
    }
  },
  data() {
    return {
      dataObj: {
        policy: '',
        signature: '',
        key: '',
        ossaccessKeyId: '',
        dir: '',
        host: ''
      },
      ossUploadUrl: 'http://centripetal-oss.oss-cn-shanghai.aliyuncs.com', // 替换为你的 OSS 上传地址
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      Quill: null,
      currentValue: '',
      options: {
        theme: 'snow',
        bounds: document.body,
        debug: 'warn',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['clean'],
            ['link', 'image', 'video']
          ]
        },
        placeholder: '请输入内容',
        readOnly: this.readOnly
      }
    }
  },
  computed: {
    styles() {
      const style = {}
      if (this.minHeight) {
        style.minHeight = `${this.minHeight}px`
      }
      if (this.height) {
        style.height = `${this.height}px`
      }
      return style
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val !== this.currentValue) {
          this.currentValue = val === null ? '' : val
          if (this.Quill) {
            this.Quill.pasteHTML(this.currentValue)
          }
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.Quill = null
  },
  methods: {
    init() {
      const editor = this.$refs.editor
      this.Quill = new Quill(editor, this.options)
      if (this.type === 'url') {
        const toolbar = this.Quill.getModule('toolbar')
        toolbar.addHandler('image', (value) => {
          this.uploadType = 'image'
          if (value) {
            this.$refs.upload.$children[0].$refs.input.click()
          } else {
            this.quill.format('image', false)
          }
        })
      }
      this.Quill.pasteHTML(this.currentValue)
      this.Quill.on('text-change', (delta, oldDelta, source) => {
        const html = this.$refs.editor.children[0].innerHTML
        const text = this.Quill.getText()
        const quill = this.Quill
        this.currentValue = html
        this.$emit('input', html)
        this.$emit('on-change', { html, text, quill })
      })
      this.Quill.on('text-change', (delta, oldDelta, source) => {
        this.$emit('on-text-change', delta, oldDelta, source)
      })
      this.Quill.on('selection-change', (range, oldRange, source) => {
        this.$emit('on-selection-change', range, oldRange, source)
      })
      this.Quill.on('editor-change', (eventName, ...args) => {
        this.$emit('on-editor-change', eventName, ...args)
      })
    },
    handleSave() {
      // console.log("button clicked");
      // 打印编辑器的格式化内容
      // console.log(this.Quill.getContents());

      const html = this.$refs.editor.children[0].innerHTML
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
      // console.log(blob); // 输出Blob对象

      const timestamp = new Date().getTime() // 获取当前时间的时间戳
      const random = Math.floor(Math.random() * 1000) // 获取一个随机数
      const uniqueFileName = `content_${timestamp}_${random}.html` // 使用时间戳和随机数生成一个唯一的文件名

      const file = new File([blob], uniqueFileName)
      // console.log(file); // 输出File对象

      this.handleBeforeUpload(file)
        .then(() => {
          // console.log("handleSave - handleBeforeUpload Success");

          const formData = new FormData()
          formData.append('policy', this.dataObj.policy)
          formData.append('signature', this.dataObj.signature)
          formData.append('key', this.dataObj.key)
          formData.append('ossaccessKeyId', this.dataObj.ossaccessKeyId)
          formData.append('dir', this.dataObj.dir)
          formData.append('host', this.dataObj.host)
          formData.append('file', file)

          // formData.append("success_action_status", "200"); // 如果需要的话

          axios
            .post(this.dataObj.host, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then((response) => {
              // console.log("html Upload successful!");
              // 在这里处理上传成功的情况
              const url = this.dataObj.host + '/' + this.dataObj.dir + '/' + file.name
              // console.log(url);
              // console.log(response);
              this.$emit('html-upload-complete', url)
            })
            .catch((error) => {
              console.log('Upload failed!', error)
              // 在这里处理上传失败的情况
            })
        })
        .catch((err) => {
          console.log('handleSave - handleUpload Failed', err)
        })
    },
    handleBeforeUpload(file) {
      // console.log("handleBeforeUpload - Start");
      const _self = this
      return new Promise((resolve, reject) => {
        policy()
          .then((response) => {
            console.log(
              'handleBeforeUpload - policy response received',
              response
            )
            _self.dataObj.policy = response.data.policy
            _self.dataObj.signature = response.data.signature
            _self.dataObj.ossaccessKeyId = response.data.accessKeyId
            _self.dataObj.key = response.data.dir + '/${filename}'
            _self.dataObj.dir = response.data.dir
            _self.dataObj.host = response.data.host
            resolve(true)
          })
          .catch((err) => {
            console.log('handleBeforeUpload - policy request error', err)
            reject(false)
          })
      })
    },
    handleUploadSuccess(res, file) {
      // console.log("handleUploadSuccess");
      const url = this.dataObj.host + '/' + this.dataObj.dir + '/' + file.name
      console.log(url)

      // 获取富文本组件实例
      const quill = this.Quill
      // 如果上传成功
      //   if (res.code === 200) {
      // 获取光标所在位置
      const length = quill.getSelection().index
      // 插入图片  res.url为服务器返回的图片地址
      quill.insertEmbed(length, 'image', url)
      // 调整光标到最后
      quill.setSelection(length + 1)
    },
    handleUploadError() {
      console.log('handleUploadError')
      this.$message.error('OSS上传失败')
    }
  }
}
</script>

  <style>
.editor,
.ql-toolbar {
  white-space: pre-wrap !important;
  line-height: normal !important;
}
.quill-img {
  display: none;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
</style>
