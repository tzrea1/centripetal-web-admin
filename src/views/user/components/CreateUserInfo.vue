<template>
  <div class="container">
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-form ref="form" :model="form" label-width="120px" class="form">
          <el-form-item label="用户姓名">
            <el-input v-model="form.realname" />
          </el-form-item>

          <el-form-item label="用户名">
            <el-input v-model="form.nickname" />
          </el-form-item>

          <el-form-item label="用户密码">
            <el-input v-model="form.password" />
          </el-form-item>

          <el-form-item label="用户所属小组">
            <el-input v-model="form.group_id" />
          </el-form-item>

          <el-form-item label="用户手机号">
            <el-input v-model="form.phone" />
          </el-form-item>

          <el-form-item label="用户组">
            <el-select v-model="form.authority" placeholder="请选择用户权限等级">
              <el-option label="审核员" value="auditor" />
              <el-option label="负责人" value="leader" />
              <el-option label="小组长" value="headman" />
              <el-option label="普通成员 " value="member" />
            </el-select>
          </el-form-item>

          <el-form-item style="text-align: center;">
            <el-button type="primary" @click="submitForm('form')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user_id: '',
        realname: '',
        password: '',
        nickname: '',
        phone: '',
        group_id: '',
        authority: ''
      }
    }
  },
  methods: {
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

