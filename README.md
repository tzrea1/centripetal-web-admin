# CentripetalForce-admin
## 功能表
### 登录
登录界面。
### 学习内容
#### 表单形式呈现当前已提交的学习内容，每一条记录包含：
- 预览/修改
- 删除
#### 另外，还应有添加学习内容的按钮，触发添加功能，包含：
- 学习内容标题
- 学习内容标签（可以多选）
- 选择学习内容类型（`视频`、`文章`、`音频`）,支持多选
- 添加学习内容：
  - 视频：上传视频文件
  - 文章：上传文章文件
  - 音频：上传音频文件
- 保存，完成创建
### 答题竞赛
#### 表单形式呈现当前已创建的答题竞赛，每一条记录包含：
- 预览/修改
- 删除
#### 另外，还应有添加答题竞赛的按钮，触发添加功能，包含：
- 答题竞赛标题
- 答题竞赛标签（可以多选）
- 答题竞赛题数
- 答题竞赛考试时间
- 答题竞赛时限
- 按条添加题目内容：
  - 题目类型（`单选题`、`多选题`、`判断题`），分别对应填写
    - 题目内容
    - 题目选项
    - 题目答案
### 学习小组
#### 表单形式呈现当前已创建的学习小组，每一条记录包含：
- 人员管理：
  - 向小组中添加人员
  - 表单形式呈现当前已加入的人员，每一条记录包含：
    - 查看人员信息
    - 移出小组
    - 修改角色（组长、小组管理、组员）
- 通知管理
  - 向小组中添加通知
  - 表单形式呈现当前已添加的通知，每一条记录包含：
    - 查看/修改通知
    - 删除通知
- 解散小组
#### 另外，还应有创建学习小组的按钮，触发创建小组功能
- 学习小组名称
- 学习小组人员（添加人员）
- 指定小组管理人员（从上一步的人员中选择）
### 用户管理
#### 表单形式呈现当前已注册的用户，每一条记录包含：
- 查看/修改用户信息
- 删除用户
- 查看用户学习记录
#### 另外，还应有添加用户的按钮，触发添加功能
- 用户身份ID（在此添加检测功能，防止非法）
- 用户姓名
- 用户性别
- 所属组织