const Mock = require('mockjs')

const List = []
const count = 100

const baseContest = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    creator_name: '@first',
    title: '@title(5, 10)',
    discription: 'mock data',
    total_points: '@integer(0, 300)',
    time_limit: '@integer(0, 100)',
    start_time: +Mock.Random.date('T'),
    end_time: +Mock.Random.date('T'),
    'status|1': ['published', 'draft', 'check'],
    quiz_num: '@integer(1, 200)',
    questions: generateQuestions(),
  }))
}
function generateQuestions() {
  const questionCount = Mock.Random.integer(1, 10);
  const questions = [];

  for (let i = 0; i < questionCount; i++) {
    questions.push(Mock.mock({
      quiz_type: '@pick(["单选题", "多选题", "判断题"])',
      content: '@csentence',
      options: '@csentence(5), @csentence(5), @csentence(5), @csentence(5)',
      answer: '@string("ABCD", 1, 4)',
      quiz_score: '@integer(1, 20)',
    }));
  }

  return questions;
}

module.exports = [
  {
    url: '/centripetal-web-admin/contest/list',
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
    url: '/centripetal-web-admin/contest/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const contest of List) {
        if (contest.id === +id) {
          return {
            code: 20000,
            data: contest
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
    url: '/centripetal-web-admin/contest/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/centripetal-web-admin/contest/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/centripetal-web-admin/contest/delete',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }

]

