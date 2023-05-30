<!--
  该实现为精简版，取消了使用this.$emit('input', val)
  转而使用this.$emit('update:value', val)直接修改双向绑定的数据

  外部调用方法示例：
  父组件：<single-file-upload :value.sync="form.fileUrl" />
 -->
<template>
  <div>
    <el-upload
      :action="ossUploadUrl"
      :data="dataObj"
      :multiple="false"
      :show-file-list="showFileList"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <!-- <div slot="tip" class="el-upload__tip">只能上传文档/视频/图片类型文件，且不超过10MB</div> -->
    </el-upload>
  </div>
</template>
<script>
import { policy } from '@/api/oss'

export default {
  name: 'SingleFileUpload',
  props: {
    value: String
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
        // callback:'',
      },
      ossUploadUrl: 'http://centripetal-oss.oss-cn-shanghai.aliyuncs.com'
    }
  },
  computed: {
    fileUrl() {
      return this.value
    },
    fileName() {
      if (this.value != null && this.value !== '') {
        return this.value.substr(this.value.lastIndexOf('/') + 1)
      } else {
        return null
      }
    },
    fileList() {
      return [{
        name: this.fileName,
        url: this.fileUrl
      }]
    },
    showFileList: {
      get: function() {
        return this.value !== null && this.value !== '' && this.value !== undefined
      },
      set: function(newValue) {
      }
    }
  },
  methods: {
    emitInput(val) {
      // this.$emit('input', val)
      this.$emit('update:value', val)
    },
    handleRemove(file, fileList) {
      this.emitInput('')
    },
    beforeUpload(file) {
      const _self = this
      return new Promise((resolve, reject) => {
        policy().then(response => {
          _self.dataObj.policy = response.data.policy
          _self.dataObj.signature = response.data.signature
          _self.dataObj.ossaccessKeyId = response.data.accessKeyId
          _self.dataObj.key = response.data.dir + '/${filename}'
          _self.dataObj.dir = response.data.dir
          _self.dataObj.host = response.data.host
          // _self.dataObj.callback = response.data.callback;
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    },
    handleUploadSuccess(res, file) {
      this.showFileList = true
      this.fileList.pop()
      const url = this.dataObj.host + '/' + this.dataObj.dir + '/' + file.name
      this.fileList.push({ name: file.name, url: url })
      this.emitInput(this.fileList[0].url)
    }
  }
}
</script>
<style>

</style>

