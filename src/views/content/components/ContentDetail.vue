<template>
  <div
    class="createPost-container"
    style="display: flex; justify-content: center"
  >
    <el-card style="width: 80%; margin-top: 20px; margin-bottom: 30px">
      <el-form
        ref="postForm"
        :model="postForm"
        :rules="rules"
        class="form-container"
      >
        <sticky
          :z-index="10"
          :class-name="'sub-navbar ' + postForm.status"
          style="margin-top: 10px"
        >
          <el-button
            v-if="!isEdit"
            v-loading="loading"
            style="margin-left: 45%"
            type="success"
            @click="submitForm"
          >
            上传
          </el-button>
          <el-button
            v-if="!isEdit"
            v-loading="loading"
            type="warning"
            @click="draftForm"
          >
            暂存
          </el-button>
          <el-button
            v-if="isEdit"
            v-loading="loading"
            style="margin-left: 45%"
            type="success"
            @click="updateForm"
          >
            更新
          </el-button>
        </sticky>

        <div class="createPost-main-container">
          <el-row>
            <el-col :span="4">
              <strong>封面图片：</strong>
            </el-col>
            <el-col :span="20">
              <el-form-item prop="image_uri" style="margin-bottom: 30px">
                <Upload v-model="postForm.image_uri" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item style="margin-bottom: 40px" prop="title">
                <MDinput
                  v-model="postForm.title"
                  :maxlength="100"
                  name="name"
                  required
                >
                  标题
                </MDinput>
              </el-form-item>

              <div class="postInfo-container">
                <el-form-item
                  label-width="90px"
                  label="创建者ID:"
                  class="postInfo-container-item"
                >
                  <el-input
                    v-model="postForm.creater_id"
                    :maxlength="200"
                    placeholder="ID内容"
                  />
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-form-item
            style="margin-bottom: 40px"
            label-width="70px"
            label="描述:"
          >
            <el-input
              v-model="postForm.description"
              :rows="1"
              type="textarea"
              class="content-textarea"
              autosize
              placeholder="请输入内容"
            />
            <span
              v-show="descriptionLength"
              class="word-counter"
            >{{ descriptionLength }}words</span>
          </el-form-item>

          <el-form-item prop="content" style="margin-bottom: 30px">
            <Tinymce ref="editor" v-model="postForm.content" :height="400" />
          </el-form-item>
          <el-row>
            <el-col :span="24">
              <el-form-item label="上传文件:" prop="fileList">
                <el-upload
                  action="/centripetal-web-admin/content/fileupload"
                  :file-list="postForm.fileList"
                  :limit="3"
                  :on-exceed="handleExceed"
                  :on-success="handleUploadSuccess"
                  :on-error="handleUploadError"
                  :on-remove="handleRemove"
                  :before-upload="beforeUpload"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">
                    只能上传图片/视频/文档类型文件，且不超过500kb
                  </div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky/Sticky.vue' // 粘性header组件
import { fetchContent } from '@/api/content'

const defaultForm = {
  id: undefined,
  creater_id: '', // 上传者的ID
  title: '', // 学习内容的题目
  description: '', // 学习内容的摘要描述
  status: 'draft', // 学习内容的状态
  image_uri: '', // 学习内容的封面图片
  content: '', // 学习内容的主题内容
  fileList: [] // 上传的文件列表
}

export default {
  name: 'ContentDetail',
  components: {
    Tinymce,
    MDinput,
    Upload,
    Sticky
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }]
      },
      tempRoute: {}
    }
  },
  computed: {
    descriptionLength() {
      return this.postForm.description.length
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/centripetal-web-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      fetchContent(id)
        .then((response) => {
          this.postForm = response.data
          console.log(this.postForm.fileList)

          // just for test
          this.postForm.title += `   Content Id:${this.postForm.id}`
          this.postForm.description += `   Content Id:${this.postForm.id}`

          // set tagsview title
          this.setTagsViewTitle()

          // set page title
          this.setPageTitle()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    setTagsViewTitle() {
      // const title = 'Edit Content'
      // const route = Object.assign({}, this.tempRoute, {
      //   title: `${title}-${this.postForm.id}`
      // })
      // this.$store.dispatch("tagsView/updateVisitedView", route);
    },
    setPageTitle() {
      const title = 'Edit Content'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm() {
      console.log(this.postForm)
      this.$refs.postForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '成功',
            message: '上传党史学习内容成功',
            type: 'success',
            duration: 2000
          })
          this.postForm.status = 'published'
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (
        this.postForm.content.length === 0 ||
        this.postForm.title.length === 0
      ) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    },
    updateForm() {
      console.log(this.postForm)
      this.$refs.postForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '成功',
            message: '修改党史学习内容成功',
            type: 'success',
            duration: 2000
          })
          this.postForm.status = 'published'
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleExceed(files, fileList) {
      this.$message.warning(`最多只能上传3个文件`)
    },
    handleUploadSuccess(response, file, fileList) {
      console.log(response)
      this.postForm.fileList.push({ name: file.name, url: response.data.url })
    },
    handleUploadError(err, file, fileList) {
      this.$message.error(`文件上传失败：${err}`)
    },
    handleRemove(file, fileList) {
      this.postForm.fileList = this.postForm.fileList.filter(
        (item) => item.url !== file.url
      )
    },
    beforeUpload(file) {
      const isImageVideoDocument =
        /\.(jpeg|jpg|png|gif|bmp|avi|mp4|mov|mkv|pdf|doc|docx|ppt|pptx|xls|xlsx)$/i.test(
          file.name
        )
      if (!isImageVideoDocument) {
        this.$message.error('文件格式不正确，请上传图片/视频/文档类型的文件')
      } else {
        console.log('type ok')
      }
      return isImageVideoDocument
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.content-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
