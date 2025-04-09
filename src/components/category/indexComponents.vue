<template>
  <el-card style="max-width: 100%; padding: 10px; height: 90px">
    <el-form :inline="true">
      <el-form-item label="一级分类" style="width: 300px">
        <el-select
          v-model="primaryId"
          @change="onCategoryPrimaryChanged(primaryId)"
          no-data-text="没有数据"
          placeholder="请选择"
          :disabled="categoryStore.divSelector != 0"
        >
          <el-option v-for="p in categoryPrimary" :key="p.id" :label="p.name" :value="p.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类" style="width: 300px">
        <el-select
          v-model="secondaryId"
          @change="onCategorySecondaryChanged(secondaryId)"
          no-data-text="没有数据"
          placeholder="请选择"
          :disabled="categoryStore.divSelector != 0"
        >
          <el-option v-for="s in categorySecondary" :key="s.id" :label="s.name" :value="s.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="三级分类" style="width: 300px">
        <el-select
          v-model="thirdId"
          @change="onCategoryThirdChanged(thirdId)"
          no-data-text="没有数据"
          placeholder="请选择"
          :disabled="categoryStore.divSelector != 0"
        >
          <el-option v-for="t in categoryThird" :key="t.id" :label="t.name" :value="t.id" />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { categoryType } from '@/api/attributes/type'
import { useCategoryStore } from '@/stores/modules/Category'

// 选择器赋值
const primaryId = ref()
const secondaryId = ref()
const thirdId = ref()

// 获取仓库中 一级分类名称
const categoryStore = useCategoryStore()

//  一级分类名称赋值
let categoryPrimary = ref<categoryType[]>([])

//  二级分类名称赋值
let categorySecondary = ref<categoryType[]>([])

//  三级分类名称赋值
let categoryThird = ref<categoryType[]>([])

// 当一级分类选项改变时触发
const onCategoryPrimaryChanged = async (a_id: number) => {
  categorySecondary.value = (await categoryStore.getCategorySecondary(
    a_id,
  )) as unknown as categoryType[]
  secondaryId.value = ''
  thirdId.value = ''
  categoryStore.thirdCategoryId = 0
  categoryThird.value.length = 0
}

// 当二级分类选项改变时触发
const onCategorySecondaryChanged = async (a_id: number) => {
  categoryThird.value = (await categoryStore.getCategoryThird(a_id)) as unknown as categoryType[]
  categoryStore.thirdCategoryId = 0
  thirdId.value = ''
}

// 当三级级分类选项改变时触发
const onCategoryThirdChanged = (a_id: number) => {
  categoryStore.thirdCategoryId = a_id
}

// 当组件挂载时执行
onMounted(async () => {
  categoryPrimary.value = (await categoryStore.getCategoryPrimary()) as unknown as categoryType[]
})
</script>

<style scoped></style>
