<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" size="small" :inline="true" label-width="68px">
      <el-form-item label="用户id" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户id"
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
      <el-form-item label="得分" prop="gotScores">
        <el-input
          v-model="queryParams.gotScores"
          placeholder="请输入得分"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否结束" prop="activityState">
        <el-input
          v-model="queryParams.activityState"
          placeholder="请输入是否结束"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否通过" prop="isPassed">
        <el-input
          v-model="queryParams.isPassed"
          placeholder="请输入是否通过"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="contest_recList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="用户id" align="center" prop="userId" />
      <el-table-column label="活动id" align="center" prop="quizActivityId" />
      <el-table-column label="得分" align="center" prop="gotScores" />
      <el-table-column label="答题开始时间" align="center" prop="startTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="答题结束时间" align="center" prop="endTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否结束" align="center" prop="activityState" />
      <el-table-column label="是否通过" align="center" prop="isPassed" />
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

    <!-- 添加或修改user用户参与答题活动的关系对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="得分" prop="gotScores">
          <el-input v-model="form.gotScores" placeholder="请输入得分" />
        </el-form-item>
        <el-form-item label="答题开始时间" prop="startTime">
          <el-date-picker
            v-model="form.startTime"
            clearable
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择答题开始时间"
          />
        </el-form-item>
        <el-form-item label="答题结束时间" prop="endTime">
          <el-date-picker
            v-model="form.endTime"
            clearable
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择答题结束时间"
          />
        </el-form-item>
        <el-form-item label="是否结束" prop="activityState">
          <el-input v-model="form.activityState" placeholder="请输入是否结束" />
        </el-form-item>
        <el-form-item label="是否通过" prop="isPassed">
          <el-input v-model="form.isPassed" placeholder="请输入是否通过" />
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
import { listContest_rec, getContest_rec, delContest_rec, addContest_rec, updateContest_rec } from '@/api/system/contest-rec'

export default {
  name: 'ContestRec',
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
      // user用户参与答题活动的关系表格数据
      contest_recList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        quizActivityId: null,
        gotScores: null,
        activityState: null,
        isPassed: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        userId: [
          { required: true, message: '用户id不能为空', trigger: 'blur' }
        ],
        quizActivityId: [
          { required: true, message: '活动id不能为空', trigger: 'blur' }
        ],
        gotScores: [
          { required: true, message: '得分不能为空', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '答题开始时间不能为空', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '答题结束时间不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询user用户参与答题活动的关系列表 */
    getList() {
      this.loading = true
      listContest_rec(this.queryParams).then(response => {
        this.contest_recList = response.rows
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
        userId: null,
        quizActivityId: null,
        gotScores: null,
        startTime: null,
        endTime: null,
        activityState: null,
        isPassed: null
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
      this.ids = selection.map(item => item.userId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加user用户参与答题活动的关系'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const userId = row.userId || this.ids
      getContest_rec(userId).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改user用户参与答题活动的关系'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.userId != null) {
            updateContest_rec(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addContest_rec(this.form).then(response => {
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
      const userIds = row.userId || this.ids
      this.$modal.confirm('是否确认删除user用户参与答题活动的关系编号为"' + userIds + '"的数据项？').then(function() {
        return delContest_rec(userIds)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/contest-rec/export', {
        ...this.queryParams
      }, `contest-rec_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
