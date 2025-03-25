<template>
  <div>
    <template v-for="m in menuList" :key="m.path">
      <!--没有子路由-->
      <template v-if="!m.children">
        <!--判断是否隐藏-->
        <el-menu-item v-if="!m.meta.hidden" :index="m.path" @click="goPage(m.path)">
          <el-icon>
            <component :is="m.meta.icon"></component>
          </el-icon>
          <span>{{ m.meta.title }}</span>
        </el-menu-item>
      </template>

      <!--只有一个子路由-->
      <template v-if="m.children && m.children.length == 1">
        <!--判断是否隐藏-->
        <el-menu-item
          v-if="!m.children[0].meta.hidden"
          :index="m.children[0].path"
          @click="goPage(m.children[0].path)"
        >
          <template #title>
            <el-icon>
              <component :is="m.children[0].meta.icon"></component>
            </el-icon>
            <span>{{ m.children[0].meta.title }}</span>
          </template>
        </el-menu-item>
      </template>

      <!--有大于两个子路由-->
      <el-sub-menu v-if="m.children && m.children.length > 1" :index="m.path">
        <template #title>
          <el-icon>
            <component :is="m.meta.icon"></component>
          </el-icon>
          <span>{{ m.meta.title }}</span>
        </template>
        <MenuComponent :menuList="m.children"></MenuComponent>
      </el-sub-menu>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps(['menuList'])
const router = useRouter()
const goPage = (path: string) => {
  router.push(path)
}
</script>

<script lang="ts">
export default {
  name: 'MenuComponent',
}
</script>

<style scoped></style>
