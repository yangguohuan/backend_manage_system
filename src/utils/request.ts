import axios from 'axios'
import { error } from 'echarts/types/src/util/log.js'
import { ElMessage } from 'element-plus'
import { ca } from 'element-plus/es/locales.mjs'

const request = axios.create({
  baseURL: 'localhost:8000/',
  timeout: 5000,
})

request.interceptors.request.use((config) => {
  return config
})

request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    let message = ''
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器错误'
        break
      default:
        message = '网络错误'
        break
    }

    ElMessage({
      type: 'error',
      message,
    })

    return Promise.reject(error)
  },
)

export default request
