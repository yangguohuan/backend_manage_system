<template>
  <div class="layout-container">
    <!-- 左侧导航 -->
    <div class="layout-slider">
      <div class="logo">
        <img src="../assets/logo.png" />
        <p>即刻后台管理平台</p>
      </div>
      <el-scrollbar class="scroll-bar">
        <el-menu background-color="#003377" text-color="#FFFFFF">
          <Menu :menuList="menuList.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>

    <!-- 顶部导航 -->
    <div class="layout-tabbar"></div>

    <!-- 内容展示 -->
    <div class="layout-content"></div>
  </div>
</template>

<script setup lang="ts">
import Menu from '@/components/menu/indexMenu.vue'
import useRouteStore from '@/stores/modules/route'
const menuList = useRouteStore()
</script>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100vh;
  .layout-slider {
    width: 260px;
    height: 100vh;
    background: #003377;
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
    }
  }
  .layout-tabbar {
    width: calc(100% - 260px);
    height: 100px;
    position: fixed;
    top: 0px;
    left: 260px;
    background-color: silver;
  }
  .layout-content {
    position: absolute;
    left: 260px;
    top: 100px;
    width: calc(100% - 260px);
    height: calc(100vh - 100px);
    padding: 20px;
    overflow: auto;
  }
}
</style>
