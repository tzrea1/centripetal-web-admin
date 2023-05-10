<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" size="small" :inline="true" label-width="68px">
      <el-form-item label="虚拟场景体验名称" prop="scenename">
        <el-input
          v-model="queryParams.scenename"
          placeholder="请输入虚拟场景体验名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="主题" prop="theme">
        <el-input
          v-model="queryParams.theme"
          placeholder="请输入主题"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="预览图url" prop="prepicUrl">
        <el-input
          v-model="queryParams.prepicUrl"
          placeholder="请输入预览图url"
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
          v-hasPermi="['system:scene:add']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:scene:edit']"
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
          v-hasPermi="['system:scene:remove']"
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
          v-hasPermi="['system:scene:export']"
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
      <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
    </el-row>

    <el-table v-loading="loading" :data="sceneList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="虚拟场景体验id" align="center" prop="sceneId" />
      <el-table-column label="虚拟场景体验名称" align="center" prop="scenename" />
      <el-table-column label="简要描述" align="center" prop="discription" />
      <el-table-column label="主题" align="center" prop="theme" />
      <el-table-column label="预览图url" align="center" prop="prepicUrl" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['system:scene:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermi="['system:scene:remove']"
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

    <!-- 添加或修改虚拟场景对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="虚拟场景体验名称" prop="scenename">
          <el-input v-model="form.scenename" placeholder="请输入虚拟场景体验名称" />
        </el-form-item>
        <el-form-item label="简要描述" prop="discription">
          <el-input v-model="form.discription" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="主题" prop="theme">
          <el-input v-model="form.theme" placeholder="请输入主题" />
        </el-form-item>
        <el-form-item label="预览图url" prop="prepicUrl">
          <el-input v-model="form.prepicUrl" placeholder="请输入预览图url" />
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
import { listScene, getScene, delScene, addScene, updateScene } from '@/api/system/scene'

export default {
  name: 'Scene',
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
      // 虚拟场景表格数据
      sceneList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        scenename: null,
        discription: null,
        theme: null,
        prepicUrl: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        scenename: [
          { required: true, message: '虚拟场景体验名称不能为空', trigger: 'blur' }
        ],
        theme: [
          { required: true, message: '主题不能为空', trigger: 'blur' }
        ],
        prepicUrl: [
          { required: true, message: '预览图url不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询虚拟场景列表 */
    getList() {
      this.loading = true
      listScene(this.queryParams).then(response => {
        this.sceneList = response.rows
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
        sceneId: null,
        scenename: null,
        discription: null,
        theme: null,
        prepicUrl: null
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
      this.ids = selection.map(item => item.sceneId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加虚拟场景'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const sceneId = row.sceneId || this.ids
      getScene(sceneId).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改虚拟场景'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.sceneId != null) {
            updateScene(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addScene(this.form).then(response => {
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
      const sceneIds = row.sceneId || this.ids
      this.$modal.confirm('是否确认删除虚拟场景编号为"' + sceneIds + '"的数据项？').then(function() {
        return delScene(sceneIds)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/scene/export', {
        ...this.queryParams
      }, `scene_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
