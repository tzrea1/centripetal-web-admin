import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/system-site/guide/essentials/router-and-nav.html
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
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
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
    redirect: '/group/list',
    name: 'Group',
    meta: {
      title: '学习小组',
      icon: 'nested'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/group/list'), // Parent router-view
        name: 'GroupList',
        meta: { title: '学习小组列表' }
      },
      {
        path: 'info/:id(\\d+)',
        component: () => import('@/views/group/info'), // Parent router-view
        name: 'GroupInfo',
        meta: { title: '小组信息', noCache: true, activeMenu: '/group/list' },
        hidden: true
      },
      {
        path: 'create',
        component: () => import('@/views/group/create'), // Parent router-view
        name: 'CreateGroup',
        meta: { title: '创建学习小组' }
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
  {
    path: '/system',
    component: Layout,
    redirect: '/system/notice',
    name: 'System',
    meta: { title: '系统管理', icon: 'el-icon-setting' },
    children: [
      {
        path: 'notice',
        component: () => import('@/views/system/notice/index'),
        name: 'NoticeManagement',
        meta: { title: '通知管理', icon: 'el-icon-message-solid' }
      },
      {
        path: 'group',
        component: () => import('@/views/system/group/index'),
        name: 'GroupManagement',
        meta: { title: '小组管理', icon: 'el-icon-menu' }
      },
      {
        path: 'content',
        component: () => import('@/views/system/content/index'),
        name: 'ContentManagement',
        meta: { title: '党史学习内容', icon: 'el-icon-folder' }
      },
      {
        path: 'content-adt',
        component: () => import('@/views/system/content-adt/index'),
        name: 'Content-adt-Management',
        meta: { title: '学习内容审核', icon: 'el-icon-folder-checked' }
      },
      {
        path: 'content-rec',
        component: () => import('@/views/system/content-rec/index'),
        name: 'Content-rec-Management',
        meta: { title: '学习记录管理', icon: 'el-icon-finished' }
      },
      {
        path: 'contest',
        component: () => import('@/views/system/contest/index'),
        name: 'Contest-Management',
        meta: { title: '党史答题竞赛', icon: 'el-icon-document' }
      },
      {
        path: 'contest-adt',
        component: () => import('@/views/system/contest-adt/index'),
        name: 'Contest-adt-Management',
        meta: { title: '答题竞赛审核', icon: 'el-icon-document-checked' }
      },
      {
        path: 'contest-rec',
        component: () => import('@/views/system/contest-rec/index'),
        name: 'Contest-rec-Management',
        meta: { title: '答题记录管理', icon: 'el-icon-finished' }
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
