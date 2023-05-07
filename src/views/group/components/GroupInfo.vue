<template>
  <div class="app-container">
    <div class="header">
      <h2>{{ groupName }}</h2>
      <div class="header-buttons">
        <el-button type="primary" @click="showAnnouncementDialog = true">发布通知</el-button>
        <el-button type="primary" @click="openNotificationsDialog">查看通知</el-button>
      </div>
    </div>

    <div class="add-member">
      <el-input v-model="newMemberName" placeholder="输入成员名称" />
      <el-button type="primary" @click="addMember">添加成员</el-button>
    </div>

    <el-table :data="paginatedMembers" border fit highlight-current-row style="width: 100%">
      <el-table-column label="成员编号" prop="id" />
      <el-table-column label="成员姓名" prop="name" />
      <el-table-column label="角色">
        <template #default="{ row }">
          <el-select v-model="row.role" @change="updateRole(row)">
            <el-option v-for="role in roles" :key="role" :label="role" :value="role" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" @click="viewMemberInfo(row)">查看信息</el-button>
          <el-button type="danger" @click="removeMember(row)">移出小组</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="members.length"
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog title="发布通知" :visible.sync="showAnnouncementDialog" width="40%">
      <el-form label-width="100px">
        <el-form-item label="标题">
          <el-input v-model="announcement.title" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="announcement.content" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAnnouncementDialog = false">取消</el-button>
        <el-button type="primary" @click="publishAnnouncement">发布</el-button>
      </div>
    </el-dialog>

    <el-dialog title="查看通知" :visible.sync="showNotificationsDialog" width="80%">
      <el-scrollbar style="height: 400px;">
        <el-table :data="paginatedNotices" border style="width: 100%">
          <el-table-column label="发布时间" prop="publish_date" width="80" />
          <el-table-column label="发布者" prop="publisher" width="80" />
          <el-table-column label="标题" prop="title" width="80" />
          <el-table-column label="内容" prop="content" />
        </el-table>
      </el-scrollbar>
      <el-pagination
        :current-page="currentNoticePage"
        :page-size="noticePageSize"
        layout="total, prev, pager, next, jumper"
        :total="notifications.length"
        class="pagination"
        @size-change="handleNoticeSizeChange"
        @current-change="handleNoticeCurrentChange"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="showNotificationsDialog = false">关闭</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { fetchInfo, postNotification, fetchNotifications } from '@/api/group'

export default {
  data() {
    return {
      listLoading: false,
      groupName: null,
      newMemberName: '',
      roles: ['组长', '小组管理', '组员'],
      members: [],
      currentPage: 1,
      pageSize: 10,

      showAnnouncementDialog: false,
      announcement: {
        title: '',
        content: ''
      },

      showNotificationsDialog: false,
      notifications: [],
      currentNoticePage: 1,
      noticePageSize: 10 // 您可以在此设置每页显示的通知数量
    }
  },

  computed: {
    paginatedMembers() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.members.slice(start, end)
    },
    paginatedNotices() {
      const start = (this.currentNoticePage - 1) * this.noticePageSize
      const end = start + this.noticePageSize
      return this.notifications.slice(start, end)
    }
  },

  created() {
    this.getInfo()
  },
  methods: {

    getInfo() {
      this.listLoading = true
      fetchInfo(this.$route.params.id).then(response => {
        console.log(this.$route.params.id)
        this.groupName = response.data.groupName
        this.members = response.data.members
        this.listLoading = false
        console.log(this.members)
      })
    },

    addMember() {
      // 通过接口post
      if (this.newMemberName) {
        const newId = this.members.length + 1
        this.members.push({ id: newId, name: this.newMemberName, role: '组员' })
        this.newMemberName = ''
      }
    },
    viewMemberInfo(member) {
      this.$message('查看成员信息功能尚未实现')
    },
    removeMember(member) {
      this.members = this.members.filter((m) => m.id !== member.id)
    },
    updateRole(member) {
      this.$message(`已将 ${member.name} 的角色更改为 ${member.role}`)
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleNoticeSizeChange(val) {
      this.noticePageSize = val
    },
    handleNoticeCurrentChange(val) {
      this.currentNoticePage = val
    },

    // 通知相关接口
    publishAnnouncement() {
      if (!this.announcement.title || !this.announcement.content) {
        this.$message.error('请填写标题和内容')
        return
      }
      console.log('发布通知', this.announcement)
      // 实际应通过API请求发布通知
      postNotification()

      this.$message.success('通知发布成功')
      this.showAnnouncementDialog = false
      this.announcement.title = ''
      this.announcement.content = ''
    },

    openNotificationsDialog() {
      this.showNotificationsDialog = true
      this.getNotifications()
    },
    getNotifications() {
      // 使用模拟数据
      fetchNotifications().then((response) => {
        console.log(response)
        this.notifications = response.data.items
      })
    }

  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-buttons {
  display: flex;
}

.header-buttons .el-button {
  margin-left: 20px;
}

.add-member {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
}
</style>

