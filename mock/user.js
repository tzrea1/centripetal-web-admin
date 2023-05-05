const Mock = require('mockjs')
const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    user_id: '@increment',
    realname: '@cname',
    password: '@string("lower", 8, 16)', // 8-16位小写字母组成的密码，可以根据需要调整
    nickname: '@name',
    phone: /^1[3456789]\d{9}$/, // 生成符合大陆手机号规则的手机号
    'group_id|1': [null, '@integer(1, 20)'], // 生成1-20之间的小组ID或者为空
    'authority|1': ['headman', 'leader', 'auditor', 'member'], // 生成用户权限
  }));
}

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/centripetal-web-admin/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  {
    url: '/centripetal-web-admin/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/centripetal-web-admin/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/centripetal-web-admin/user/list',
    type: 'get',
    response: config => {
      const { realname, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        return !(realname && item.realname.indexOf(realname) < 0);
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/centripetal-web-admin/user/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const user of List) {
        if (user.user_id === +id) {
          return {
            code: 20000,
            data: user
          }
        }
      }
      return {
        code: 50000,
        message: '没有找到对应的数据'
      }
    }
  },

  {
    url: '/centripetal-web-admin/user/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/centripetal-web-admin/user/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/centripetal-web-admin/user/delete',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
