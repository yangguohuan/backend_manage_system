<template>
  <div>
    <category></category>

    <el-card style="max-width: 100%; margin-top: 20px">
      <el-button type="primary" style="margin-left: 20px">添加属性</el-button>
      <el-table border style="margin: 20px">
        <el-table-column type="index" align="center" label="序号" width="120"></el-table-column>
        <el-table-column
          type="default"
          align="center"
          label="属性名称"
          width="180"
        ></el-table-column>
        <el-table-column type="default" align="center" label="属性值"></el-table-column>
        <el-table-column type="default" align="center" label="操作" width="180"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
