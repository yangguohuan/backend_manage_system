<template>
  <div class="tabbar">
    <div class="tabbar-left">
      <!--顶部左侧静态-->
      <el-icon @click="changIcon">
        <component :is="LayoutSetting.fold ? 'Expand' : 'Fold'"></component>
      </el-icon>
      <!--左侧面包屑-->
      <el-breadcrumb :separator-icon="ArrowRight" style="margin-left: 20px">
        <el-breadcrumb-item
          v-for="(r, index) in route.matched"
          :key="index"
          v-show="r.meta.title"
          :to="r.path"
        >
          <el-icon>
            <component :is="r.meta.icon"></component>
          </el-icon>
          <span style="margin: 0 5px">{{ r.meta.title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabbar-right">
      <el-button :icon="RefreshRight" @click="updateContent" circle></el-button>
      <el-button :icon="FullScreen" @click="fullScreen" circle></el-button>
      <el-button :icon="Setting" circle></el-button>
      <span style="margin: 0 10px">{{ username }}</span>
      <img
        src="../../assets/logo.png"
        style="width: 40px; height: 40px; margin: 0 15px; border-radius: 20px"
      />
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon class="el-icon-right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ArrowRight, RefreshRight, FullScreen, Setting } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import useLayoutSettingStore from '@/stores/modules/setting'
import useUserStore from '@/stores/modules/user'
import useRouteStore from '@/stores/modules/route'
import type { user } from '@/api/user/type'
import type { messageType } from '@/api'
import { asyncRoute } from '@/router/routes'
import type { ROUTE } from '@/api/user/type'
// @ts-expect-error: no error
import cloneDeep from 'lodash'

// 定义用户名
const username = ref<string>()

// 实例化仓库数据
let LayoutSetting = useLayoutSettingStore()
const userStore = useUserStore()
const routeStore = useRouteStore()

const changIcon = () => {
  LayoutSetting.fold = !LayoutSetting.fold
}
const route = useRoute()
const router = useRouter()
const updateContent = () => {
  LayoutSetting.refresh = !LayoutSetting.refresh
}

const fullScreen = () => {
  // 判断是否全屏，如果全屏则返回真，否则返回假
  let full = document.fullscreenElement

  if (!full) {
    // 使用文档根节点requestFullscreen变为全屏模式
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏模式
    document.exitFullscreen()
  }
}

function filterRoutesKeepStructure(routes: ROUTE[], names: string[]) {
  const result: ROUTE[] = []

  for (const route of routes) {
    // 深拷贝当前 route
    const newRoute = { ...route }

    if (route.children) {
      // 递归处理 children
      const filteredChildren = filterRoutesKeepStructure(route.children, names)
      if (filteredChildren.length > 0) {
        newRoute.children = filteredChildren
        result.push(newRoute)
        continue
      }
    }

    // 如果当前 route 的 name 在目标列表中，保留
    if (names.includes(route.name as string)) {
      result.push(newRoute)
    }
  }

  return result
}

// 获取用户信息
const getUser = async () => {
  // const data = await userStore.getUser(JSON.parse(localStorage.getItem('TOKEN') as string))
  userStore.userInfo = (await userStore.getUser(
    JSON.parse(localStorage.getItem('TOKEN') as string) as number,
  )) as unknown as user
  username.value = userStore.userInfo.username
  // 筛选函数
  // 保留结构的递归筛选函数
  routeStore.menuRoutes.push(
    // @ts-expect-error: no error
    ...filterRoutesKeepStructure(
      cloneDeep(asyncRoute as unknown as ROUTE[]),
      userStore.userInfo.acls as string[],
    ),
  )
}

// 每当挂载组件时，就获取一次用户信息
onMounted(() => {
  if (localStorage.getItem('TOKEN')) {
    getUser()
  }
})

const logout = async () => {
  const data = (await userStore.userLogout()) as unknown as messageType
  localStorage.removeItem('TOKEN')
  localStorage.removeItem('LOGIN')
  localStorage.removeItem('username')
  ElNotification({
    type: 'success',
    message: data.message,
  })
  router.replace({
    path: '/login',
    query: {
      redirect: route.path,
    },
  })
}
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-image: linear-gradient(#ffffff, #dddddd);
  .tabbar-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tabbar-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
