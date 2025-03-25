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
      <el-button :icon="FullScreen" circle></el-button>
      <el-button :icon="Setting" circle></el-button>
      <img
        src="../../assets/logo.png"
        style="width: 40px; height: 40px; margin: 0 15px; border-radius: 20px"
      />
      <el-dropdown>
        <span class="el-dropdown-link">
          admin
          <el-icon class="el-icon-right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, RefreshRight, FullScreen, Setting } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import useLayoutSettingStore from '@/stores/modules/setting'
let LayoutSetting = useLayoutSettingStore()
const changIcon = () => {
  LayoutSetting.fold = !LayoutSetting.fold
}
const route = useRoute()
const updateContent = () => {
  LayoutSetting.refresh = !LayoutSetting.refresh
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
