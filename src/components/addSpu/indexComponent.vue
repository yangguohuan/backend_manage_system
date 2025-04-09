<template>
  <el-card style="margin: 20px 0">
    <div style="width: 750px">
      <el-form label-width="80px">
        <el-form-item label="SPU标题">
          <el-input placeholder="请输入SPU标题" v-model="spuStore.spuInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
          <el-select
            v-model="spuStore.spuInfo.trademark"
            style="width: 300px"
            placeholder="请选择品牌"
          >
            <el-option
              v-for="t in spuStore.trademarkList"
              :key="t.id"
              :value="t.id"
              :label="t.mark_name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
          <el-input
            v-model="spuStore.spuInfo.content"
            type="textarea"
            :rows="8"
            placeholder="请输入SPU描述"
          />
        </el-form-item>
        <el-form-item label="SPU照片">
          <!--展示图片墙-->
          <el-upload
            v-model:file-list="spuStore.spuInfo.images"
            :action="spuStore.uploadUrl"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            name="mark_image"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
          <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="预览图片" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="销售属性">
          <el-select
            v-model="spuStore.attributeInfo"
            style="width: 300px"
            placeholder="请选择销售属性"
          >
            <el-option
              v-for="al in spuStore.attributeList"
              :key="al.id"
              :label="al.name"
              :value="JSON.stringify(al)"
            ></el-option>
          </el-select>
          <el-button
            type="primary"
            style="margin-left: 20px"
            @click="addAttributeToSpu"
            :disabled="spuStore.attributeInfo == null"
          >
            添加销售属性
          </el-button>

          <!--展示销售属性和属性值-->
          <el-table :data="spuStore.spuInfo.attributes" style="margin-top: 20px" border>
            <el-table-column align="center" label="序号" type="index" width="50"></el-table-column>
            <el-table-column align="center" label="属性" type="default" width="100">
              <template #default="{ row }">
                {{ row.attribute_details.name }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="属性值" type="default" closable>
              <template #default="{ row }">
                <el-tag
                  type="warning"
                  v-for="(v, index) in row.attribute_details.attribute_values"
                  :key="v.id"
                  closable
                  style="margin-left: 2px"
                  @close="row.attribute_details.attribute_values.splice(index, 1)"
                >
                  {{ v.name }}
                </el-tag>
                <el-input
                  v-if="row.flag"
                  @blur="toLook(row)"
                  placeholder="请输入属性值"
                  style="width: 100px; margin-left: 2px; font-size: 12px"
                  size="small"
                  ref="inputText"
                  v-model="item"
                ></el-input>
                <el-button
                  v-else
                  type="success"
                  size="small"
                  :icon="Plus"
                  style="margin-left: 2px"
                  @click="toEdit(row)"
                ></el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" type="default" width="80">
              <template #default="{ row }">
                <el-button
                  type="danger"
                  @click.prevent="removeAttr(row)"
                  :icon="Delete"
                  circle
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import type { SPU, SPUIMAGE, ATTRONSPU } from '@/api/spu/type'
import type { trademarkType } from '@/api/products/type'
import type { attrType } from '@/api/attributes/type'
import type { messageType } from '@/api/index'
import { ElMessage } from 'element-plus'
import { Delete, Plus } from '@element-plus/icons-vue'

import { useCategoryStore } from '@/stores/modules/Category'
import { useSpuStore } from '@/stores/modules/Spu'
import useTrademarkListStore from '@/stores/modules/trademarkList'

// 属性值绑定
const item = ref('')

const inputText = ref<HTMLInputElement | string>('')

// 实例化数据仓库
const spuStore = useSpuStore()
const trademarkListStore = useTrademarkListStore()
const categoryStore = useCategoryStore()

// 定义图片展示
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

// 移除图片后的操作
const handleRemove = () => {
  // console.log(uploadImage, uploadImages)
}

const handlePictureCardPreview = (uploadImage: SPUIMAGE) => {
  dialogImageUrl.value = uploadImage.url!
  dialogVisible.value = true
}

// 保存
const save = async () => {
  // console.log(spuStore.spuInfo)
  const data = (await spuStore.addSpu(spuStore.spuInfo as SPU)) as unknown as messageType
  ElMessage.success(data.message)
  categoryStore.divSelector = 0
}

// 当点击取消时，触发事件，发送改变的值
const cancel = () => {
  categoryStore.divSelector = 0
}
// 添加销售属性至Spu
const addAttributeToSpu = async () => {
  let attrInfo = {}
  if (typeof spuStore.attributeInfo === 'string') {
    attrInfo = JSON.parse(spuStore.attributeInfo) as unknown as attrType
  } else {
    attrInfo = spuStore.attributeInfo as unknown as attrType
  }
  spuStore.spuInfo.attributes.push({
    // @ts-expect-error: no error
    attribute_details: attrInfo,
  })
}

// 获取所有商标
const getTrademarkList = async () => {
  spuStore.trademarkList =
    (await trademarkListStore.getAllTrademarks()) as unknown as trademarkType[]
}

// 获取所有该三级分类下的属性
const getAttrList = async (cId: number) => {
  spuStore.attributeList = (await categoryStore.getAllAttr(cId)) as unknown as attrType[]
}

// 当三级分类id变化的时候触发, 获取属性列表
watch(
  () => categoryStore.thirdCategoryId,
  () => {
    if (categoryStore.thirdCategoryId != 0) {
      getAttrList(categoryStore.thirdCategoryId)
    }
  },
)

// 删除新增的属性行
const removeAttr = (item: ATTRONSPU) => {
  // @ts-expect-error: no error
  const index = spuStore.spuInfo.attributes.indexOf(item)
  if (index !== -1) {
    spuStore.spuInfo.attributes.splice(index, 1)
  }
}

// 切换查看模式
const toLook = (attr: ATTRONSPU) => {
  attr.flag = false

  // 如果不存在则初始化一个空数组
  if (!attr.attribute_details.attribute_values) {
    attr.attribute_details.attribute_values = []
  }

  if (item.value) {
    attr.attribute_details.attribute_values.push({
      name: item.value,
    })
  }
}

// 切换编辑模式
const toEdit = (attr: ATTRONSPU) => {
  attr.flag = true
  nextTick(() => {
    ;(inputText.value as HTMLInputElement).focus()
  })
}

// 当组件挂载时，获取所有商标
onMounted(() => {
  getTrademarkList()
})
</script>

<style scoped></style>
