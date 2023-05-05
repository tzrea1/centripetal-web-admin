import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/centripetal-web-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '仪表盘', icon: 'dashboard' }
    }]
  },

  {
    path: '/content',
    component: Layout,
    redirect: '/content/table',
    name: 'Content',
    meta: { title: '学习内容', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'create',
        component: () => import('@/views/content/create'),
        name: 'CreateContent',
        meta: { title: '创建学习内容', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/content/edit'),
        name: 'EditContent',
        meta: { title: '修改学习内容', noCache: true, activeMenu: '/content/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/content/list'),
        name: 'ContentList',
        meta: { title: '学习内容列表', icon: 'list' }
      }
    ]
  },

  {
    path: '/contest',
    component: Layout,
    redirect: '/contest/list',
    name: 'Contest',
    meta: { title: '答题竞赛', icon: 'form' },
    children: [
      {
        path: 'create',
        component: () => import('@/views/contest/create'),
        name: 'CreateContest',
        meta: { title: '创建答题竞赛', icon: 'el-icon-message-solid' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/contest/edit'),
        name: 'EditContest',
        meta: { title: '修改答题竞赛', noCache: true, activeMenu: '/contest/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/contest/list'),
        name: 'ContestList',
        meta: { title: '答题竞赛列表', icon: 'el-icon-s-order' }
      }
    ]
  },

  {
    path: '/group',
    component: Layout,
    redirect: '/group/menu1',
    name: 'Group',
    meta: {
      title: '学习小组',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'User',
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'create',
        component: () => import('@/views/user/create'),
        name: 'CreateUser',
        meta: { title: '创建用户信息', icon: 'el-icon-s-check' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/user/edit'),
        name: 'EditUser',
        meta: { title: '修改用户信息', noCache: true, activeMenu: '/user/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/user/list'),
        name: 'UserList',
        meta: { title: '用户信息列表', icon: 'el-icon-s-order' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
