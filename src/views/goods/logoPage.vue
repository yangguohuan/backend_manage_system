<template>
  <div>
    <el-card style="max-width: 100%">
      <!--卡片顶部添加按钮-->
      <el-button type="primary" size="default" icon="Plus" @click="addTrademark">
        添加品牌
      </el-button>

      <!--内容-->
      <el-table :data="data" stripe style="width: 750px; margin: 10px 0" border>
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <el-table-column prop="mark_name" label="品牌名称" align="center"></el-table-column>
        <el-table-column prop="mark_image" label="品牌LOGO" align="center">
          <template #default="{ row }">
            <img
              :src="trademarkListStore.urlPrefix + row.mark_image"
              alt="logo"
              style="width: 60px"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作" align="center" width="200px">
          <template #default="{ row }">
            <el-button
              type="primary"
              :icon="Edit"
              @click="updateTrademark(row.mark_name, row.mark_image, row.id)"
              circle
            />

            <!--气泡确认框-->
            <el-popconfirm
              :title="`你确定要删除${row.mark_name}商标吗?`"
              @confirm="deleteTrademark(row.id)"
            >
              <template #reference>
                <el-button type="danger" :icon="Delete" circle />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!--分页器-->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10]"
        :background="true"
        layout="prev, pager, next, jumper, ->, total, sizes"
        :total="total"
        size="large"
        hide-on-single-page
        @size-change="changSize"
        @current-change="showTrademarkList"
      />
    </el-card>

    <!--对话框-->
    <el-dialog v-model="dialogFormVisible" :title="frameTitle" width="500">
      <el-form :rules="rules">
        <el-form-item label="品牌标题" label-width="100px" prop="mark_name">
          <el-input
            autocomplete="off"
            placeholder="请输入品牌标题"
            v-model="mark_name"
            name="mark_name"
          />
          <input type="text" name="image_url" :value="mark_image" hidden />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="mark_image">
          <el-upload
            class="avatar-uploader"
            :action="trademarkListStore.uploadImageURL"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            v-model="mark_image"
            name="mark_image"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel"> 取消 </el-button>
          <el-button type="primary" @click="confirm"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { trademarkListType } from '@/api/products/type'
import type { UploadProps } from 'element-plus'
import type { messageType } from '@/api/index'
import { onMounted, ref } from 'vue'
import { Edit, Delete, Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { reqAddTrademark, reqUpdateTrademark, reqDeleteTrademark } from '@/api/products'
import useTrademarkListStore from '@/stores/modules/trademarkList'

// 获取仓库数据
const trademarkListStore = useTrademarkListStore()

// 在组件加载时调用方法
onMounted(() => {
  showTrademarkList()
})

// 当前页码
let pageNo = ref<number>(1)

// 每一页展示多少条数据
let pageSize = ref<number>(10)

// 展示总数
let total = ref<number>(0)

// 存储商标的对象组
let data = ref<[]>([])

// 控制对话框显示还是隐藏
let dialogFormVisible = ref(false)

// 添加商品，收集表单信息
let mark_name = ref('')
let mark_image = ref('')
let imageUrl = ref('')
let mark_id = ref(0)
let frameTitle = ref('')

// 异步访问后端数据，操作之后接收后端回传的消息
let uploadResponseMessage = ref<messageType>()

const addTrademark = () => {
  frameTitle.value = '添加商标'
  dialogFormVisible.value = true
}

// 修改商标信息之前，更新数值
const updateTrademark = async (name: string, image: string, id: number) => {
  frameTitle.value = '修改商标内容'
  dialogFormVisible.value = true
  mark_name.value = name
  imageUrl.value = trademarkListStore.urlPrefix + image
  mark_id.value = id
}

const showTrademarkList = async () => {
  // 异步获取值
  const list = (await trademarkListStore.getTrademarkList(
    pageNo.value,
    pageSize.value,
  )) as unknown as trademarkListType

  // 赋值
  total.value = list.total
  data.value = list.data
}

// 每页数量改变时
const changSize = () => {
  pageNo.value = 1
  showTrademarkList()
}

// 表单框
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  mark_image.value = response.mark_image
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type !== 'image/jpeg' &&
    rawFile.type !== 'image/png' &&
    rawFile.type !== 'image/gif'
  ) {
    ElMessage.error('图片必须是JPG、GIF或PNG格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过2MB!')
    return false
  } else {
    return true
  }
}

const confirm = async () => {
  // 如果id为0，则为添加商标，其他数值则代表真实商标id，进行修改操作
  if (mark_id.value == 0) {
    uploadResponseMessage.value = (await reqAddTrademark(
      mark_name.value,
      mark_image.value,
    )) as unknown as messageType
  } else {
    uploadResponseMessage.value = (await reqUpdateTrademark(
      mark_id.value,
      mark_name.value,
      mark_image.value,
    )) as unknown as messageType
  }
  console.log(mark_image.value)
  showTrademarkList()
  ElMessage.success(uploadResponseMessage.value.message)
  dialogFormVisible.value = false
  mark_image.value = ''
  mark_name.value = ''
  imageUrl.value = ''
}

// 如果用户点击取消按钮，则把所有数据清空
const cancel = () => {
  dialogFormVisible.value = false
  mark_image.value = ''
  mark_name.value = ''
  imageUrl.value = ''
}

const deleteTrademark = async (id: number) => {
  uploadResponseMessage.value = (await reqDeleteTrademark(id)) as unknown as messageType
  showTrademarkList()
  ElMessage.success(uploadResponseMessage.value.message)
}

const rules = {
  mark_name: [],
  mark_image: [],
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
