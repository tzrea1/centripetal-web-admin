const Mock = require('mockjs')

const List = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'


for (let i = 0; i < count; i++) {
  const fileList = []
  const fileCount = Math.floor(Math.random() * 3) + 1
  for (let j = 0; j < fileCount; j++) {
    fileList.push(Mock.mock({
      name: 'abc.doc',
      url: '@url'
    }))
  }
  List.push(Mock.mock({
    id: '@increment',
    creater_id: '@integer(1000, 9999)',
    title: '@title(5, 10)',
    description: '@cparagraph(1, 3)',
    'status|1': ['draft', 'published', "review"],
    image_uri: image_uri,
    content: baseContent,
    fileList: fileList,
  }))
}

module.exports = [
  {
    url: '/centripetal-web-admin/content/list',
    type: 'get',
    response: config => {
      const { title, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (title && item.title.indexOf(title) < 0) return false
        return true
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
    url: '/centripetal-web-admin/content/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const content of List) {
        if (content.id === +id) {
          return {
            code: 20000,
            data: content
          }
        }
      }
    }
  },

  {
    url: '/centripetal-web-admin/content/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/centripetal-web-admin/content/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/centripetal-web-admin/content/delete',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/centripetal-web-admin/content/fileupload',
    type: 'post',
    response: config => {
      console.log(config)

      const uploadedFile = {
        name: config.body.name,
        url: 'https://example.com/' + config.body.name
      }

      return {
        code: 20000,
        data: uploadedFile
      }
    }
  }

]

