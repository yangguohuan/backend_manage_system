<template>
  <category @getThirdCategoryId="getThirdCategoryId" :isTable="isTable"></category>

  <div v-show="divSelector == 1">
    <spuList
      :thirdCategoryId="thirdCategoryId"
      :isExistThirdCategoryId="isExistThirdCategoryId"
      @changeDivSelector="changeDivSelector"
    ></spuList>
  </div>

  <div v-show="divSelector == 2">
    <addSpu @changeDivSelector="changeDivSelector"></addSpu>
  </div>

  <div v-show="divSelector == 3">
    <addSku></addSku>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import spuList from '@/components/spuList/indexComponent.vue'
import addSpu from '@/components/addSpu/indexComponent.vue'
import addSku from '@/components/addSku/indexComponent.vue'

// 用于判单三级分类值是否存在，默认存在，不存在则为false
let isExistThirdCategoryId = ref<boolean>(true)

// isTable 判断分类组件是否被禁用
const isTable = ref<boolean>(true)

// div 选择器，用于判断显示对应的div， 1显示spu列表， 2显示添加spu，3显示添加sku
let divSelector = ref<number>(1)

// 接收子组件传递的三级分类id值
let thirdCategoryId = ref<number>(0)

// 接收子组件传递过来的参数，第三级分类的id，判断属性框是否显示，thirdCategoryId之后传递给子组件用于做判断
const getThirdCategoryId = (a_id: number) => {
  if (a_id != -1) {
    thirdCategoryId.value = a_id
    isExistThirdCategoryId.value = false
  } else {
    isExistThirdCategoryId.value = true
  }
}

// 接收子组件传来的值，用于判断div的选择， 1显示spu列表， 2显示添加spu，3显示添加sku
const changeDivSelector = (select: number, isTab: boolean) => {
  divSelector.value = select
  isTable.value = isTab
}
</script>

<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
