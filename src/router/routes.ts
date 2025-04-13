// 常量路由
export const constantRoute = [
  {
    path: '/base',
    component: () => import('@/layout/layoutBasic.vue'),
    name: 'base',
    meta: {
      hidden: false,
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/homePage.vue'),
        name: 'home',
        meta: {
          title: '首页',
          hidden: false,
          icon: 'House',
        },
      },
    ],
  },
  {
    path: '/screen',
    component: () => import('@/views/screenPage.vue'),
    name: 'screen',
    meta: {
      title: '数据大屏',
      hidden: false,
      icon: 'DataAnalysis',
    },
  },
  {
    path: '/login',
    component: () => import('@/views/loginPage.vue'),
    name: 'login',
    meta: {
      title: '登录',
      hidden: true,
      icon: 'House',
    },

    alias: '/',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '错误页面',
      hidden: true,
      icon: 'Failed',
    },
  },
  {
    path: '/404',
    component: () => import('@/views/404Page.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
      icon: 'Failed',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '错误页面',
      hidden: true,
      icon: 'Failed',
    },
  },
]

export const asyncRoute = [
  {
    path: '/acl',
    component: () => import('@/layout/layoutBasic.vue'),
    name: 'acl',
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Lock',
    },
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/userPage.vue'),
        name: 'user',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'User',
        },
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/rolePage.vue'),
        name: 'role',
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'UserFilled',
        },
      },
      {
        path: '/acl/menu',
        component: () => import('@/views/acl/menuPage.vue'),
        name: 'menu',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'Menu',
        },
      },
    ],
  },
  {
    path: '/goods',
    component: () => import('@/layout/layoutBasic.vue'),
    name: 'goods',
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'Goods',
    },
    redirect: '/goods/logo',
    children: [
      {
        path: '/goods/logo',
        component: () => import('@/views/goods/logoPage.vue'),
        name: 'logo',
        meta: {
          title: '品牌管理',
          hidden: false,
          icon: 'Flag',
        },
      },
      {
        path: '/goods/attr',
        component: () => import('@/views/goods/attrPage.vue'),
        name: 'attr',
        meta: {
          title: '属性管理',
          hidden: false,
          icon: 'Opportunity',
        },
      },
      {
        path: '/goods/spu',
        component: () => import('@/views/goods/spuPage.vue'),
        name: 'spu',
        meta: {
          title: 'SPU管理',
          hidden: false,
          icon: 'Coin',
        },
      },
      {
        path: '/goods/sku',
        component: () => import('@/views/goods/skuPage.vue'),
        name: 'sku',
        meta: {
          title: 'SKU管理',
          hidden: false,
          icon: 'Sell',
        },
      },
    ],
  },
]
