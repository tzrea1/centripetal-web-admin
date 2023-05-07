<template>
  <div class="create-group">
    <el-card>
      <div slot="header" class="clearfix">
        <span>创建小组</span>
      </div>
      <el-form ref="form" label-width="120px">
        <el-form-item label="组名">
          <el-input v-model="groupName" />
        </el-form-item>
        <el-form-item label="添加组员">
          <el-select
            v-model="selectedMembers"
            filterable
            reserve-keyword
            multiple
            placeholder="搜索成员"
          >
            <el-option
              v-for="item in allMembers"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createGroup">创建小组</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groupName: '',
      allMembers: [
        { id: 1, name: '成员 1' },
        { id: 2, name: '成员 2' },
        { id: 3, name: '成员 3' }
        // 添加其他成员
      ],
      selectedMembers: []
    }
  },
  methods: {
    createGroup() {
      if (!this.groupName) {
        this.$message.error('请填写组名')
        return
      }
      if (this.selectedMembers.length === 0) {
        this.$message.error('请选择至少一个组员')
        return
      }
      const selectedMemberNames = this.selectedMembers.map(
        (id) => this.allMembers.find((member) => member.id === id).name
      )
      console.log('创建小组', {
        groupName: this.groupName,
        members: selectedMemberNames
      })
      this.$message.success('小组创建成功')
      // 实际应通过 API 请求创建小组并添加成员
    }
  }
}
</script>

<style scoped>
.create-group {
  width: 400px;
  margin: 0 auto;
  padding: 20px 0;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: " ";
}

.clearfix:after {
  clear: both;
}
</style>
