<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" size="small" :inline="true" label-width="68px">
      <el-form-item label="创建者id" prop="creatorId">
        <el-input
          v-model="queryParams.creatorId"
          placeholder="请输入创建者id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="活动名称" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入活动名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-input
          v-model="queryParams.state"
          placeholder="请输入状态"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开始时间" prop="startTime">
        <el-date-picker
          v-model="queryParams.startTime"
          clearable
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择开始时间"
        />
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker
          v-model="queryParams.endTime"
          clearable
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择结束时间"
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

    <el-table v-loading="loading" :data="contestList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="答题活动id" align="center" prop="quizActivityId" />
      <el-table-column label="创建者id" align="center" prop="creatorId" />
      <el-table-column label="活动名称" align="center" prop="title" />
      <el-table-column label="时长限制" align="center" prop="timeLimit" />
      <el-table-column label="活动描述" align="center" prop="discription" />
      <el-table-column label="总分值" align="center" prop="totalPoints" />
      <el-table-column label="状态" align="center" prop="state" />
      <el-table-column label="开始时间" align="center" prop="startTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center" prop="endTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合格线" align="center" prop="acceptanceLine" />
      <el-table-column label="题目量" align="center" prop="quizNum" />
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

    <!-- 添加或修改答题活动对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="创建者id" prop="creatorId">
          <el-input v-model="form.creatorId" placeholder="请输入创建者id" />
        </el-form-item>
        <el-form-item label="活动名称" prop="title">
          <el-input v-model="form.title" placeholder="请输入活动名称" />
        </el-form-item>
        <el-form-item label="时长限制" prop="timeLimit">
          <el-input v-model="form.timeLimit" placeholder="请输入时长限制" />
        </el-form-item>
        <el-form-item label="活动描述" prop="discription">
          <el-input v-model="form.discription" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="总分值" prop="totalPoints">
          <el-input v-model="form.totalPoints" placeholder="请输入总分值" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-input v-model="form.state" placeholder="请输入状态" />
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="form.startTime"
            clearable
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择开始时间"
          />
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            v-model="form.endTime"
            clearable
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择结束时间"
          />
        </el-form-item>
        <el-form-item label="合格线" prop="acceptanceLine">
          <el-input v-model="form.acceptanceLine" placeholder="请输入合格线" />
        </el-form-item>
        <el-form-item label="题目量" prop="quizNum">
          <el-input v-model="form.quizNum" placeholder="请输入题目量" />
        </el-form-item>
        <el-divider content-position="center">题目信息</el-divider>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddQuestion">添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteQuestion">删除</el-button>
          </el-col>
        </el-row>
        <el-table ref="question" :data="questionList" :row-class-name="rowQuestionIndex" @selection-change="handleQuestionSelectionChange">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="序号" align="center" prop="index" width="50" />
          <el-table-column label="本题分值" prop="questionScore" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.questionScore" placeholder="请输入本题分值" />
            </template>
          </el-table-column>
          <el-table-column label="本题正确答案" prop="correctAnswer" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.correctAnswer" placeholder="请输入本题正确答案" />
            </template>
          </el-table-column>
          <el-table-column label="题目类型" prop="questionType" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.questionType" placeholder="请选择题目类型">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listContest, getContest, delContest, addContest, updateContest } from '@/api/system/contest'

export default {
  name: 'Contest',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedQuestion: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 答题活动表格数据
      contestList: [],
      // 题目表格数据
      questionList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        creatorId: null,
        title: null,
        state: null,
        startTime: null,
        endTime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        creatorId: [
          { required: true, message: '创建者id不能为空', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '活动名称不能为空', trigger: 'blur' }
        ],
        timeLimit: [
          { required: true, message: '时长限制不能为空', trigger: 'blur' }
        ],
        discription: [
          { required: true, message: '活动描述不能为空', trigger: 'blur' }
        ],
        totalPoints: [
          { required: true, message: '总分值不能为空', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '状态不能为空', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '开始时间不能为空', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '结束时间不能为空', trigger: 'blur' }
        ],
        quizNum: [
          { required: true, message: '题目量不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询答题活动列表 */
    getList() {
      this.loading = true
      listContest(this.queryParams).then(response => {
        this.contestList = response.rows
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
        quizActivityId: null,
        creatorId: null,
        title: null,
        timeLimit: null,
        discription: null,
        totalPoints: null,
        state: null,
        startTime: null,
        endTime: null,
        acceptanceLine: null,
        quizNum: null
      }
      this.questionList = []
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
      this.ids = selection.map(item => item.quizActivityId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加答题活动'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const quizActivityId = row.quizActivityId || this.ids
      getContest(quizActivityId).then(response => {
        this.form = response.data
        this.questionList = response.data.questionList
        this.open = true
        this.title = '修改答题活动'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.form.questionList = this.questionList
          if (this.form.quizActivityId != null) {
            updateContest(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addContest(this.form).then(response => {
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
      const quizActivityIds = row.quizActivityId || this.ids
      this.$modal.confirm('是否确认删除答题活动编号为"' + quizActivityIds + '"的数据项？').then(function() {
        return delContest(quizActivityIds)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 题目序号 */
    rowQuestionIndex({ row, rowIndex }) {
      row.index = rowIndex + 1
    },
    /** 题目添加按钮操作 */
    handleAddQuestion() {
      const obj = {}
      obj.content = ''
      obj.questionScore = ''
      obj.correctAnswer = ''
      obj.options = ''
      obj.questionType = ''
      this.questionList.push(obj)
    },
    /** 题目删除按钮操作 */
    handleDeleteQuestion() {
      if (this.checkedQuestion.length === 0) {
        this.$modal.msgError('请先选择要删除的题目数据')
      } else {
        const questionList = this.questionList
        const checkedQuestion = this.checkedQuestion
        this.questionList = questionList.filter(function(item) {
          return checkedQuestion.indexOf(item.index) === -1
        })
      }
    },
    /** 复选框选中数据 */
    handleQuestionSelectionChange(selection) {
      this.checkedQuestion = selection.map(item => item.index)
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/contest/export', {
        ...this.queryParams
      }, `contest_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
