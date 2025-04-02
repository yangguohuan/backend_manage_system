// 定义一个spu类型
export interface spuType {
  // spu 的 id
  id: number

  // 第三级分类的ID
  upperCategoryId?: number

  // spu标题
  title: string

  // spu的描述
  content: string

  // spu的添加时间
  date_added: string

  // spu图片地址
  images?: imageType[]

  // spu销售属性
  attributes?: spuAttributeType[]
}

// 定义一个前端获取对象的类型
export interface responseSpuType {
  // 返回查询结果提示，成功或者失败
  message: string

  // 返回查询结果提示代码，200 或 400
  status: number

  // 返回spu总数
  totalCount?: number

  // 返回总页数
  totalPages?: number

  // 返回当前页码
  currentPage?: number

  // 返回页面包含数据数量
  pageSize?: number

  // 返回数据内容
  data?: spuType[] | spuType
}

// 定义一个spu图片接口
export interface imageType {
  // 关联spu 的id
  spu: number

  // 图片标题
  title: string

  // 图片展示地址
  image_url: string

  // 添加时间
  date_added: string
}

// 定义一个spu属性接口
export interface spuAttributeType {
  // 属性ID
  attribute: number

  // spu的id
  spu: number

  // 添加时间
  date_added: string
}
