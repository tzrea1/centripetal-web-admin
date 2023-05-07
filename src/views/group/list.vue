<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="groups" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template #default="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" label="学习小组名称">
        <template #default="{ row }">
          <router-link :to="'/group/info/' + row.id" class="link-type">
            <span>{{ row.name }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="创建者">
        <template #default="{ row }">
          <span>{{ row.creator_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="组长">
        <template #default="{ row }">
          <span>{{ row.leader_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="创建时间">
        <template #default="{ row }">
          <span>{{ row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="人数" width="110">
        <template #default="{ row }">
          <el-tag style="text-align: center; width: 50px">
            {{ row.members_count }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="260">
        <template #default="{ row }">
          <el-button type="danger" size="small" icon="el-icon-delete" @click="confirmDelete(row.id)">
            解散小组
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList, deleteGroup } from '@/api/group'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination,
export default {
  name: 'GroupList',
  components: { Pagination },
  data() {
    return {
      groups: null,
      listLoading: false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
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
        this.groups = response.data.items
        this.total = response.data.total
        this.listLoading = false
        console.log(this.groups)
      })
    },

    confirmDelete(id) {
      this.$confirm('此操作将解散该学习小组, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 实际应通过 API 请求解散小组
        console.log('解散小组', id)

        deleteGroup(id).then(response => {
          console.log(response.data)
        })
        this.$message({
          type: 'success',
          message: '解散成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消解散'
        })
      })
    }
  }
}
</script>

<style scoped>
.link-type {
  color: #409EFF;
  text-decoration: underline;
  cursor: pointer;
}
</style>
