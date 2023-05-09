<template>

  <div>
    <el-upload
      :action="ossUploadUrl"
      :data="dataObj"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :on-success="handleUploadSuccess"
      multiple
      :limit="maxCount"
      :on-exceed="handleExceed"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传不超过{{ maxCount }}个文件
      </div>
    </el-upload>
  </div>
</template>

<script>
import { policy } from '@/api/oss'

export default {
  name: 'MultiFileUpload',
  props: {
    // 文件属性数组
    value: Array,
    // 最大上传文件数量
    maxCount: {
      type: Number,
      default: 3
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
      ossUploadUrl: 'http://centripetal-oss.oss-cn-shanghai.aliyuncs.com'
    }
  },
  computed: {
    fileList() {
      const fileList = []
      for (let i = 0; i < this.value.length; i++) {
        fileList.push({
          name: this.value[i].name,
          url: this.value[i].url
        })
      }
      return fileList
    }
  },
  methods: {
    emitInput(fileList) {
      const value = []
      for (let i = 0; i < fileList.length; i++) {
        value.push({
          name: fileList[i].name,
          url: fileList[i].url
        })
      }
      this.$emit('input', value)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleRemove(file, fileList) {
      this.emitInput(fileList)
    },
    beforeUpload(file) {
      const _self = this
      return new Promise((resolve, reject) => {
        policy()
          .then((response) => {
            _self.dataObj.policy = response.data.policy
            _self.dataObj.signature = response.data.signature
            _self.dataObj.ossaccessKeyId = response.data.accessKeyId
            _self.dataObj.key = response.data.dir + '/${filename}'
            _self.dataObj.dir = response.data.dir
            _self.dataObj.host = response.data.host
            resolve(true)
          })
          .catch((err) => {
            console.log(err)
            reject(false)
          })
      })
    },
    handleUploadSuccess(res, file) {
      const url = this.dataObj.host + '/' + this.dataObj.dir + '/' + file.name
      this.fileList.push({ name: file.name, url: url })
      this.emitInput(this.fileList)
    },
    handleExceed(files, fileList) {
      this.$message({
        message: '最多只能上传' + this.maxCount + '个文件',
        type: 'warning',
        duration: 1000
      })
    }
  }
}
</script>
<style>
</style>

