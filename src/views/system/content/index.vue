<template>
  <div class="app-container">
    <el-form
      v-show="showSearch"
      ref="queryForm"
      :model="queryParams"
      size="small"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="上传者ID" prop="creatorId">
        <el-input
          v-model="queryParams.creatorId"
          placeholder="请输入上传者ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="活动标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入活动标题"
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
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
        >搜索</el-button>
        <el-button
          icon="el-icon-refresh"
          size="mini"
          @click="resetQuery"
        >重置</el-button>
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
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="success"-->
      <!--          plain-->
      <!--          icon="el-icon-edit"-->
      <!--          size="mini"-->
      <!--          :disabled="single"-->
      <!--          @click="handleUpdate"-->
      <!--        >修改</el-button>-->
      <!--      </el-col>-->
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="danger"-->
      <!--          plain-->
      <!--          icon="el-icon-delete"-->
      <!--          size="mini"-->
      <!--          :disabled="multiple"-->
      <!--          @click="handleDelete"-->
      <!--        >删除</el-button>-->
      <!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
      <right-toolbar
        :show-search.sync="showSearch"
        style="margin-left: 330px; width: 100px"
        @queryTable="getList"
      />
    </el-row>

    <el-table
      v-loading="loading"
      :data="contentList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="phStudyId" />
      <el-table-column label="上传者ID" align="center" prop="creatorId" />
      <el-table-column label="活动标题" align="center" prop="title" />
      <el-table-column label="活动简介" align="center" prop="description" />
      <el-table-column label="状态" align="center" prop="state" />
      <el-table-column label="预览图url" align="center" prop="prepicUrl" />
      <el-table-column
        label="内容主体对应html文件url"
        align="center"
        prop="contentUrl"
      />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
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
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改党史内容学习活动对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="上传者ID" prop="creatorId">
          <el-input v-model="form.creatorId" placeholder="请输入上传者ID" />
        </el-form-item>
        <el-form-item label="活动标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入活动标题" />
        </el-form-item>
        <el-form-item label="活动简介" prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-input v-model="form.state" placeholder="请输入状态" />
        </el-form-item>
        <el-form-item label="预览图" prop="prepicUrl">
          <!-- <el-input v-model="form.prepicUrl" placeholder="请输入预览图url" /> -->
          <single-image-upload
            :value.sync="form.prepicUrl"
            @input="updatePrepicUrl"
          />
        </el-form-item>
        <el-form-item label="内容主体对应html文件url" prop="contentUrl">
          <el-input
            v-model="form.contentUrl"
            placeholder="请输入内容主体对应html文件url"
          />
        </el-form-item>
        <el-divider content-position="center">党史内容学习文件信息</el-divider>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAddPhStudyFile"
            >添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="handleDeletePhStudyFile"
            >删除</el-button>
          </el-col>
        </el-row>
        <el-table
          ref="phStudyFile"
          :data="phStudyFileList"
          :row-class-name="rowPhStudyFileIndex"
          @selection-change="handlePhStudyFileSelectionChange"
        >
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column
            label="序号"
            align="center"
            prop="index"
            width="50"
          />
          <el-table-column label="文件" prop="fileUrl" width="150">
            <template slot-scope="scope">
              <!-- <el-input
                v-model="scope.row.fileUrl"
                placeholder="请输入文件url"
              /> -->
              <single-file-upload :value.sync="scope.row.fileUrl" />
            </template>
          </el-table-column>
          <el-table-column label="文件名称" prop="fileName" width="150">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.fileName"
                placeholder="请输入文件名称"
              />
            </template>
          </el-table-column>
          <el-table-column label="文件类型" prop="fileType" width="150">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.fileType"
                placeholder="请选择文件类型"
              >
                <el-option
                  v-for="item in fileTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
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
import {
  listContent,
  getContent,
  delContent,
  addContent,
  updateContent
} from '@/api/system/content'
import SingleImageUpload from '@/components/OssUpload/singleImageUpload.vue'
import singleFileUpload from '@/components/OssUpload/singleFileUpload.vue'

export default {
  name: 'Content',
  components: {
    SingleImageUpload,
    singleFileUpload
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedPhStudyFile: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 党史内容学习活动表格数据
      contentList: [],
      // 党史内容学习文件表格数据
      phStudyFileList: [],
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
        state: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        creatorId: [
          { required: true, message: '上传者ID不能为空', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '活动标题不能为空', trigger: 'blur' }
        ],
        state: [{ required: true, message: '状态不能为空', trigger: 'blur' }]
      },
      // 可选的文件类型
      fileTypeOptions: [
        {
          value: '选项1',
          label: '文档'
        },
        {
          value: '选项2',
          label: '视频'
        },
        {
          value: '选项3',
          label: '图片'
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    updatePrepicUrl(prepicUrl) {
      this.form.prepicUrl = prepicUrl
      console.log(this.form)
    },
    /** 查询党史内容学习活动列表 */
    getList() {
      this.loading = true
      listContent(this.queryParams).then((response) => {
        this.contentList = response.rows
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
        phStudyId: null,
        creatorId: null,
        title: null,
        description: null,
        state: null,
        prepicUrl: null,
        contentUrl: null
      }
      this.phStudyFileList = []
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
      this.ids = selection.map((item) => item.phStudyId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加党史内容学习活动'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const phStudyId = row.phStudyId || this.ids
      getContent(phStudyId).then((response) => {
        this.form = response.data
        this.phStudyFileList = response.data.phStudyFileList
        this.open = true
        this.title = '修改党史内容学习活动'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.form.phStudyFileList = this.phStudyFileList
          if (this.form.phStudyId != null) {
            updateContent(this.form).then((response) => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addContent(this.form).then((response) => {
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
      const phStudyIds = row.phStudyId || this.ids
      this.$modal
        .confirm(
          '是否确认删除党史内容学习活动编号为"' + phStudyIds + '"的数据项？'
        )
        .then(function() {
          return delContent(phStudyIds)
        })
        .then(() => {
          this.getList()
          this.$modal.msgSuccess('删除成功')
        })
        .catch(() => {})
    },
    /** 党史内容学习文件序号 */
    rowPhStudyFileIndex({ row, rowIndex }) {
      row.index = rowIndex + 1
    },
    /** 党史内容学习文件添加按钮操作 */
    handleAddPhStudyFile() {
      const obj = {}
      obj.fileUrl = ''
      obj.fileName = ''
      obj.fileType = ''
      this.phStudyFileList.push(obj)
    },
    /** 党史内容学习文件删除按钮操作 */
    handleDeletePhStudyFile() {
      if (this.checkedPhStudyFile.length === 0) {
        this.$modal.msgError('请先选择要删除的党史内容学习文件数据')
      } else {
        const phStudyFileList = this.phStudyFileList
        const checkedPhStudyFile = this.checkedPhStudyFile
        this.phStudyFileList = phStudyFileList.filter(function(item) {
          return checkedPhStudyFile.indexOf(item.index) === -1
        })
      }
    },
    /** 复选框选中数据 */
    handlePhStudyFileSelectionChange(selection) {
      this.checkedPhStudyFile = selection.map((item) => item.index)
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        'system/content/export',
        {
          ...this.queryParams
        },
        `content_${new Date().getTime()}.xlsx`
      )
    }
  }
}
</script>
