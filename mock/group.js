const Mock = require("mockjs");

const List = [];
const count = 20;

const baseContest = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: "@increment",
      name: "学习小组 @increment",
      creator_name:"@first",
      leader_name: "@first",
      members_count: "@integer(1, 50)",
      created_at: "@date('yyyy-MM-dd')",
    })
  );
}

const Members = [];

for (let i = 0; i < 50; i++) {
  Members.push(
    Mock.mock({
      id: "@increment",
      name: "@first",
      role: "@pick(['组长', '小组管理', '组员'])",
    })
  );
}

// 生成通知列表数据
const noticesCount = 50;
const noticesList = [];

for (let i = 0; i < noticesCount; i++) {
  noticesList.push(
    Mock.mock({
      id: "@increment",
      title: "@ctitle",
      content: "@cparagraph",
      publisher: "@first",
      publish_date: "@date('yyyy-MM-dd')",
    })
  );
}

module.exports = [
  {
    url: "/system/group/list",
    type: "get",
    response: (config) => {
      const { page = 1, limit = 10, sort } = config.query;

      let mockList = List;

      if (sort === "-id") {
        mockList = mockList.reverse();
      }

      const pageList = mockList.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      );

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList,
        },
      };
    },
  },

  {
    url: "/system/group/info",
    type: "get",
    response: (config) => {
      const { groupId } = config.query;
      console.log(groupId);
      return {
                code: 20000,
                data: {
                    groupName: '学习小组',
                    members: Members,
                  },
              }

    //   for (const group of List) {
    //     if (group.id === +groupId) {
    //       return {
    //         code: 20000,
    //         data: {
    //             groupName: group.name,
    //             members: Members,
    //           },
    //       }
    //     }
    //   }

    //   if (group) {
    //     return {
    //       code: 20000,
    //       data: {
    //         groupName: group.name,
    //         members: Members,
    //       },
    //     };
    //   } else {
    //     return {
    //       code: 50000,
    //       message: "没有找到对应的数据",
    //     };
    //   }
    },
  },

  {
    url: '/system/group/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/system/group/delete',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/system/group/notice',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/system/group/notice',
    type: 'get',
    response: (config) => {
        const { groupId, page = 1, limit = 50 } = config.query;
        console.log(groupId);

        let mockList = noticesList;

        const pageList = mockList.filter(
          (item, index) => index < limit * page && index >= limit * (page - 1)
        );

        return {
          code: 20000,
          data: {
            total: mockList.length,
            items: pageList,
          },
        };
      },
  },


];



