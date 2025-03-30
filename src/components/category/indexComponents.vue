<template>
  <el-card style="max-width: 100%; padding: 10px; height: 90px">
    <el-form :inline="true">
      <el-form-item label="一级分类" style="width: 200px">
        <el-select placeholder="请选择">
          <el-option label="电子产品" value="electric_products" />
          <el-option label="生活用品" value="live_tools" />
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类" style="width: 200px">
        <el-select placeholder="请选择">
          <el-option label="电子产品" value="electric_products" />
          <el-option label="生活用品" value="live_tools" />
        </el-select>
      </el-form-item>

      <el-form-item label="三级分类" style="width: 200px">
        <el-select placeholder="请选择">
          <el-option label="电子产品" value="electric_products" />
          <el-option label="生活用品" value="live_tools" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts"></script>

<style scoped></style>
