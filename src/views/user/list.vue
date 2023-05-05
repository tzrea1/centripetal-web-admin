<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.user_id }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150px" align="center" label="用户姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.realname }}</span>
        </template>
      </el-table-column>

      <el-table-column width="250px" align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>

      <el-table-column width="250px" align="center" label="用户密码">
        <template slot-scope="scope">
          <span>{{ scope.row.password }}</span>
        </template>
      </el-table-column>

      <el-table-column width="220px" align="center" label="手机号">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="所属小组ID">
        <template slot-scope="scope">
          <span>{{ scope.row.group_id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="250px" align="center" label="所属小组名称">
        <template slot-scope="scope">
          <span>{{ scope.row.group_id }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="权限" width="120">
        <template slot-scope="{row}">
          <el-tag style="text-align: center;" :type="row.authority | authorityFilter">
            {{ row.authority }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="260">
        <template slot-scope="scope">
          <router-link :to="'/user/edit/'+scope.row.user_id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              Edit
            </el-button>
          </router-link>
          <el-button type="danger" size="small" icon="el-icon-delete" style="margin-left: 10px" @click="confirmDelete(scope.row.user_id)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList, deleteUser } from '@/api/user'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'UserList',
  components: { Pagination },
  filters: {
    authorityFilter(authority) {
      const authorityMap = {
        headman: 'success',
        leader: 'warning',
        auditor: 'danger',
        member: 'info'
      }
      return authorityMap[authority]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    confirmDelete(id) {
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
