<template>
  <div class="container">
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-form ref="form" :model="form" label-width="120px" class="form">
          <el-form-item label="答题竞赛标题">
            <el-input v-model="form.title" />
          </el-form-item>

          <el-form-item label="答题竞赛介绍">
            <el-input v-model="form.discription" />
          </el-form-item>

          <el-form-item label="答题竞赛题数">
            <el-input-number v-model="form.quiz_num" :min="1" :max="100" />
          </el-form-item>

          <el-form-item label="开始时间">
            <el-date-picker v-model="form.start_time" type="datetime" placeholder="选择日期时间" />
          </el-form-item>

          <el-form-item label="结束时间">
            <el-date-picker v-model="form.end_time" type="datetime" placeholder="选择日期时间" />
          </el-form-item>

          <el-form-item label="答题竞赛时长(分钟)">
            <el-input-number v-model="form.time_limit" :min="1" :max="360" />
          </el-form-item>

          <el-form-item label="题目内容">
            <el-button type="primary" @click="addQuestion">添加题目</el-button>
          </el-form-item>

          <div v-for="(question, index) in form.questions" :key="index">
            <el-form-item :label="'题目 ' + (index + 1)">
              <el-select v-model="question.type" placeholder="请选择题目类型">
                <el-option label="单选题" value="single" />
                <el-option label="多选题" value="multiple" />
                <el-option label="判断题" value="true-false" />
              </el-select>
              <el-input v-model="question.score" placeholder="输入题目内容" />
              <el-input v-model="question.content" placeholder="输入题目分值" />
              <el-input v-model="question.options" placeholder="输入题目选项，用逗号分隔" />
              <el-input v-model="question.answer" placeholder="输入题目答案" />
            </el-form-item>
          </div>

          <el-form-item style="text-align: center;">
            <el-button type="primary" @click="submitForm('form')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchContest } from '@/api/contest'
export default {
  data() {
    return {
      form: {
        title: '',
        discription: '',
        quiz_num: 0,
        start_time: '',
        end_time: '',
        examEndTime: '',
        time_limit: 0,
        questions: []
      },
      options: [
        { value: 'tag1', label: '标签1' },
        { value: 'tag2', label: '标签2' },
        { value: 'tag3', label: '标签3' },
        { value: 'tag4', label: '标签4' },
        { value: 'tag5', label: '标签5' }
      ]
    }
  },
  created() {
    this.getContest()
  },
  methods: {
    getContest() {
      fetchContest(this.$route.params.id).then(response => {
        this.form = response.data
        console.log('contest:', this.form)
      })
    },
    addQuestion() {
      this.form.questions.push({
        quiz_type: '',
        content: '',
        options: '',
        answer: '',
        quiz_score: ''
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 提交表单数据，例如发送到服务器
          console.log('submit:', this.form)
          alert('提交成功')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  padding: 50px 0;
}

.form {
  background-color: #fff;
  border-radius: 4px;
  padding: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.el-form-item {
  margin-bottom: 20px;
}
.el-select{
  margin-bottom: 20px;
}
.el-input{
  margin-bottom: 20px;
}
</style>

