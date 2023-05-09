<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="通知编号" min-width="100" align="center">
      <template slot-scope="scope">
        {{ scope.row.noticeId }}
      </template>
    </el-table-column>
    <el-table-column label="通知内容" width="400" align="center">
      <template slot-scope="scope">
        ¥{{ scope.row.content }}
      </template>
    </el-table-column>
    <el-table-column label="通知发布日期" width="250" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.status">
          {{ row.publishTime }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { listNotice } from '@/api/system/notice'

export default {
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      listNotice().then(response => {
        console.log(response)
        this.list = response.rows.slice(0, 8)
      })
    }
  }
}
</script>
