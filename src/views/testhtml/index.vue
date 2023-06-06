<template>
  <div class="study-container">
    <el-card shadow="hover" class="study-card">
      <el-row>
        <el-col :span="24">
          <h2 class="study-title">{{ study.title }}</h2>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <p class="study-description">{{ study.description }}</p>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-image
            class="study-image"
            :src="study.prepic_url"
            :preview-src-list="[study.prepic_url]"
          />
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <div class="study-content" v-html="studyContent" />
        </el-col>
      </el-row>
      <!-- <el-row>
          <el-col :span="24">
            <iframe
              :src="study.content_url"
              frameborder="0"
              class="study-content"
            ></iframe>
          </el-col>
        </el-row> -->
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      study: {},
      studyContent: ''
    }
  },
  created() {
    setTimeout(() => {
      this.study = {
        ph_study_id: 1,
        creator_id: 1,
        title: '党史学习1',
        description: '这是第一个党史学习活动',
        state: 'ongoing',
        prepic_url:
            'https://centripetal-oss.oss-cn-shanghai.aliyuncs.com/centripetal/files/20230510/%E5%85%B1%E6%8C%AF%E7%BB%93%E6%9E%9Cno.1.jpg',
        content_url:
            'http://centripetal-oss.oss-cn-shanghai.aliyuncs.com/centripetal/files/20230605/content_1685980377579_587.html'
      }
      // Fetch the content of the HTML file
      axios.get(this.study.content_url).then(response => {
        this.studyContent = response.data
      })
      // this.studyContent = "<p>这里是党史内容学习的具体内容...</p>";
    }, 500)
  }
}
</script>

  <style>
  .study-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px 0;
  }

  .study-card {
    margin-bottom: 20px;
  }

  .study-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin: 10px 0;
  }

  .study-description {
    font-size: 16px;
    color: #666;
    margin: 10px 0;
  }

  .study-image {
    width: 100%;
    height: auto;
    /* max-height: 300px; */
    object-fit: contain;
    margin: 10px 0;
  }

  .study-content {
    font-size: 14px;
    color: #333;
    line-height: 1.5;
    margin: 10px 0;
  }
  </style>
