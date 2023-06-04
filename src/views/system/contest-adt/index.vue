<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" size="small" :inline="true" label-width="68px">
      <el-form-item label="审核员id" prop="auditorId">
        <el-input
          v-model="queryParams.auditorId"
          placeholder="请输入审核员id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="活动id" prop="quizActivityId">
        <el-input
          v-model="queryParams.quizActivityId"
          placeholder="请输入活动id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审核日期" prop="auditTime">
        <el-date-picker
          v-model="queryParams.auditTime"
          clearable
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择审核日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
      <right-toolbar :show-search.sync="showSearch" style="margin-left: 330px;;width:100px" @queryTable="getList" />
    </el-row>

    <el-table v-loading="loading" :data="contest_adtList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="审核员id" align="center" prop="auditorId" />
      <el-table-column label="活动id" align="center" prop="quizActivityId" />
      <el-table-column label="审核日期" align="center" prop="auditTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.auditTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改审核员审核答题活动的记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="审核日期" prop="auditTime">
          <el-date-picker
            v-model="form.auditTime"
            clearable
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择审核日期"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listContest_adt, getContest_adt, delContest_adt, addContest_adt, updateContest_adt } from '@/api/system/contest-adt'

export default {
  name: 'ContestAdt',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 审核员审核答题活动的记录表格数据
      contest_adtList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        auditorId: null,
        quizActivityId: null,
        auditTime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        auditorId: [
          { required: true, message: '审核员id不能为空', trigger: 'blur' }
        ],
        quizActivityId: [
          { required: true, message: '活动id不能为空', trigger: 'blur' }
        ],
        auditTime: [
          { required: true, message: '审核日期不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询审核员审核答题活动的记录列表 */
    getList() {
      this.loading = true
      listContest_adt(this.queryParams).then(response => {
        this.contest_adtList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        auditorId: null,
        quizActivityId: null,
        auditTime: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => ({ auditorId: item.auditorId, quizActivityId: item.quizActivityId }))
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加审核员审核答题活动的记录'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      var key = this.ids[0]
      if (row.auditorId) {
        key = { auditorId: row.auditorId, quizActivityId: row.quizActivityId }
      }
      getContest_adt(key).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改审核员审核答题活动的记录'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.auditorId != null) {
            updateContest_adt(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addContest_adt(this.form).then(response => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      var auditorIds = this.ids
      if (row.auditorId) {
        auditorIds = [{ auditorId: row.auditorId, quizActivityId: row.quizActivityId }]
      }
      this.$modal.confirm('是否确认删除所选数据项？').then(function() {
        return delContest_adt(auditorIds)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/contest-adt/export', {
        ...this.queryParams
      }, `contest-adt_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
