<template>
  <category></category>

  <div v-show="categoryStore.divSelector == 0">
    <spuList></spuList>
  </div>

  <div v-show="categoryStore.divSelector == 1">
    <addSpu></addSpu>
  </div>

  <div v-show="categoryStore.divSelector == 2">
    <addSku></addSku>
  </div>
</template>

<script setup lang="ts">
import spuList from '@/components/spuList/indexComponent.vue'
import addSpu from '@/components/addSpu/indexComponent.vue'
import addSku from '@/components/addSku/indexComponent.vue'
import { useCategoryStore } from '@/stores/modules/Category'

// 接收pinia仓库divSelector，判断分类选择是否被禁用
const categoryStore = useCategoryStore()
</script>

<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
