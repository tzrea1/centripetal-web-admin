<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px">
      <!-- ... 其他表单项 ... -->

      <el-form-item label="上传图片">
        <multi-image-upload
          :value.sync="form.images"
          @input="updateImages"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm"
        >打印所有文件url信息</el-button>
      </el-form-item>

      <el-form-item>
        <p>---------分界线----------</p>
      </el-form-item>
      <el-form-item label="上传文件">
        <single-image-upload
          :value.sync="form.fileUrl"
          @input="updateFileUrl"
        />
      </el-form-item>
      <el-form-item>
        <p>---------分界线----------</p>
      </el-form-item>
      <el-form-item label="上传文件">
        <multi-file-upload
          :value.sync="form.files"
          @input="updateFiles"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import MultiImageUpload from '@/components/OssUpload/multiImageUpload.vue'
import SingleImageUpload from '@/components/OssUpload/singleImageUpload.vue'
import MultiFileUpload from '@/components/OssUpload/multiFileUpload.vue'

export default {
  name: 'TestOss',
  components: {
    MultiImageUpload,
    SingleImageUpload,
    MultiFileUpload
  },
  data() {
    return {
      form: {
        // ... 其他表单项 ...
        images: [],
        fileUrl: '',
        files: []
      }
    }
  },
  created() {},
  methods: {
    updateImages(images) {
      this.form.images = images
    },
    updateFileUrl(fileUrl) {
      this.form.fileUrl = fileUrl
    },
    updateFiles(files) {
      this.form.files = files
    },
    submitForm() {
      // 提交表单的逻辑，将 form 对象发送给后端
      console.log(this.form.images)
    }
  }
}
</script>

<style>
</style>
