<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" size="small" :inline="true" label-width="68px">
      <el-form-item label="审核员姓名" prop="realname">
        <el-input
          v-model="queryParams.realname"
          placeholder="请输入审核员姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审核员用户名" prop="nickname">
        <el-input
          v-model="queryParams.nickname"
          placeholder="请输入审核员用户名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审核员密码" prop="password">
        <el-input
          v-model="queryParams.password"
          placeholder="请输入审核员密码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审核员手机号" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入审核员手机号"
          clearable
          @keyup.enter.native="handleQuery"
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
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:auditor:remove']"
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:auditor:export']"
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
      <right-toolbar :show-search.sync="showSearch" style="margin-left: 330px;;width:100px" @queryTable="getList" />
    </el-row>

    <el-table v-loading="loading" :data="auditorList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="审核员id" align="center" prop="auditorId" />
      <el-table-column label="审核员姓名" align="center" prop="realname" />
      <el-table-column label="审核员用户名" align="center" prop="nickname" />
      <el-table-column label="审核员密码" align="center" prop="password" />
      <el-table-column label="审核员手机号" align="center" prop="phone" />
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

    <!-- 添加或修改审核员实体对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="审核员姓名" prop="realname">
          <el-input v-model="form.realname" placeholder="请输入审核员姓名" />
        </el-form-item>
        <el-form-item label="审核员用户名" prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入审核员用户名" />
        </el-form-item>
        <el-form-item label="审核员密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入审核员密码" />
        </el-form-item>
        <el-form-item label="审核员手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入审核员手机号" />
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
import { listAuditor, getAuditor, delAuditor, addAuditor, updateAuditor } from '@/api/system/auditor'

export default {
  name: 'Auditor',
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
      // 审核员实体表格数据
      auditorList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        realname: null,
        nickname: null,
        password: null,
        phone: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        realname: [
          { required: true, message: '审核员姓名不能为空', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '审核员用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '审核员密码不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '审核员手机号不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询审核员实体列表 */
    getList() {
      this.loading = true
      listAuditor(this.queryParams).then(response => {
        this.auditorList = response.rows
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
        realname: null,
        nickname: null,
        password: null,
        phone: null
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
      this.ids = selection.map(item => item.auditorId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加审核员实体'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const auditorId = row.auditorId || this.ids
      getAuditor(auditorId).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改审核员实体'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.auditorId != null) {
            updateAuditor(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addAuditor(this.form).then(response => {
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
      const auditorIds = row.auditorId || this.ids
      this.$modal.confirm('是否确认删除审核员实体编号为"' + auditorIds + '"的数据项？').then(function() {
        return delAuditor(auditorIds)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/auditor/export', {
        ...this.queryParams
      }, `auditor_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
