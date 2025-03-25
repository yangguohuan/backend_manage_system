<template>
  <div class="layout-container">
    <!-- 左侧导航 -->
    <div class="layout-slider" :class="{ fold: LayoutSetting.fold }">
      <div class="logo">
        <img src="../assets/logo.png" />
        <p>即刻后台管理平台</p>
      </div>
      <el-scrollbar class="scroll-bar">
        <el-menu
          background-color="#003377"
          text-color="#FFFFFF"
          :default-active="route.path"
          :collapse="LayoutSetting.fold"
        >
          <Menu :menuList="menuList.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>

    <!-- 顶部导航 -->
    <div class="layout-tabbar" :class="{ fold: LayoutSetting.fold }">
      <tabbar></tabbar>
    </div>

    <!-- 内容展示 -->
    <div class="layout-content" :class="{ fold: LayoutSetting.fold }" v-if="flag">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import Menu from '@/components/menu/indexMenu.vue'
import tabbar from '@/components/tabbar/indexTabbar.vue'
import useRouteStore from '@/stores/modules/route'
import { RouterView } from 'vue-router'
import useLayoutSettingStore from '@/stores/modules/setting'
import { watch, ref, nextTick } from 'vue'
const menuList = useRouteStore()
const route = useRoute()
let LayoutSetting = useLayoutSettingStore()
let flag = ref(true)
watch(
  () => LayoutSetting.refresh,
  () => {
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100vh;
  .layout-slider {
    width: 260px;
    height: 100vh;
    background: #003377;
    transition: all 0.3s;
    &.fold {
      width: 60px;
      transition: all 0.3s;
    }
    .logo {
      width: 100%;
      height: 100px;
      display: flex;
      align-items: center;
      padding: 20px;
      img {
        width: 50px;
        border-radius: 25px;
      }
      p {
        font-size: 20px;
        color: white;
        margin-left: 5px;
        text-align: center;
      }
    }
    .scroll-bar {
      width: 100%;
      height: calc(100vh - 100px);
      .el-menu {
        border-right: none;
      }
    }
  }
  .layout-tabbar {
    width: calc(100% - 260px);
    height: 100px;
    position: fixed;
    top: 0px;
    left: 260px;
    transition: all 0.3s;
    &.fold {
      left: 60px;
      width: calc(100% - 60px);
      transition: all 0.3s;
    }
  }
  .layout-content {
    position: absolute;
    left: 260px;
    top: 100px;
    width: calc(100% - 260px);
    height: calc(100vh - 100px);
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      left: 60px;
      width: calc(100% - 60px);
      transition: all 0.3s;
    }
  }
}
</style>
