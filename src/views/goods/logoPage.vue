<template>
  <div>
    <el-card style="max-width: 100%">
      <!--卡片顶部添加按钮-->
      <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>

      <!--内容-->
      <el-table :data="data" stripe style="width: 100%; margin: 10px 0" border>
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <el-table-column prop="mark_name" label="品牌名称" align="center"></el-table-column>
        <el-table-column prop="mark_image" label="品牌LOGO" align="center">
          <template #default="{ row }">
            <img :src="url + row.mark_image" alt="logo" style="width: 60px" />
          </template>
        </el-table-column>
        <el-table-column prop="address" label="品牌操作" align="center"></el-table-column>
      </el-table>
      <!--分页器-->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10]"
        :background="true"
        layout="prev, pager, next, ->, jumper, total, sizes"
        :total="total"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import trademarkListStore from '@/stores/modules/trademarkList'

// 定义返回值list的接口函数，规范代码
interface list {
  page: number
  pageSize: number
  total: number
  totalPages: number
  data: []
}

// 当前页码
let pageNo = ref<number>(1)

// 每一页展示多少条数据
let pageSize = ref<number>(10)

// 展示总数
let total = ref<number>(0)

// 存储商标的对象组
let data = ref<[]>([])

const url = 'http://127.0.0.1:8000/static'

// 实例化数据仓库方法
const trademarkList = trademarkListStore()

const showTrademarkList = async () => {
  // 异步获取值
  const list = (await trademarkList.getTrademarkList(
    pageNo.value,
    pageSize.value,
  )) as unknown as list

  // 赋值
  total.value = list.total
  data.value = list.data
  console.log(data.value)
}

// 在组件加载时调用方法
onMounted(() => {
  showTrademarkList()
})
</script>

<style scoped></style>
