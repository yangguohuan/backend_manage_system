<template>
  <div>
    <template v-for="m in menuList" :key="m.path">
      <!--没有子路由-->
      <el-menu-item v-if="!m.children" :index="m.path">
        <span>{{ m.title }}</span>
      </el-menu-item>

      <!--只有一个子路由-->
      <el-menu-item v-if="m.children && m.children.length == 1" :index="m.children[0].path">
        <span>{{ m.title }}</span>
        <template #title>
          <span>{{ m.children[0].title }}</span>
        </template>
      </el-menu-item>

      <!--有大于两个子路由-->
      <el-sub-menu v-if="m.children && m.children.length > 1" :index="m.path">
        <template #title>
          <span>{{ m.title }}</span>
        </template>
        <MenuComponent :menuList="m.children"></MenuComponent>
      </el-sub-menu>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps(['menuList'])
</script>

<script lang="ts">
export default {
  name: 'MenuComponent',
}
</script>

<style scoped></style>
