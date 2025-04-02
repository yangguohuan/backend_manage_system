<template>
  <el-card style="margin: 20px 0">
    <el-form style="max-width: 100%">
      <el-form-item label="SPU品牌">
        <el-select placeholder="请选择品牌">
          <el-option label="小米" value="xiaomi" />
          <el-option label="华为" value="huawei" />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU标题">
        <el-input placeholder="请输入SPU标题"></el-input>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" placeholder="请输入SPU描述" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">创建</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// div选择器，1 为spu列表，2为添加spu， 3为添加sku
const divSelector = ref(0)

// 用于判断分类组件是否被禁用
const isTable = ref<boolean>(true)

// 接收父组件传递的方法
const emitter = defineEmits(['changeDivSelector'])

// 当点击取消时，触发事件，发送改变的值
const cancel = () => {
  divSelector.value = 1
  emitter('changeDivSelector', divSelector.value, isTable.value)
}
</script>

<style scoped></style>
