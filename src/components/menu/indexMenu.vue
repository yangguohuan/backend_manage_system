<template>
  <div>
    <h1>动态菜单</h1>
    <template v-for="m in menuList" :key="m.path">
      <el-menu-item v-if="!m.children" :index="m.path">
        <span>{{ m.title }}</span>
      </el-menu-item>
      <el-menu-item v-if="m.children && m.children.length == 1" :index="m.path">
        <span>{{ m.title }}</span>
        <template #title>
          <span>{{ m.children[0].title }}</span>
        </template>
      </el-menu-item>
      <el-menu-item v-if="m.children && m.children.length > 1"></el-menu-item>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps(['menuList'])
</script>

<style scoped></style>
