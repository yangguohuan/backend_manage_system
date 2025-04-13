<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login-form" :rules="rules" :model="user" ref="formValidate">
          <h1>Hello</h1>
          <h2>欢迎来到即刻后台管理站</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="user.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login-btn"
              type="primary"
              size="default"
              @click="login"
              plain
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue'
import useUserStore from '@/stores/modules/user'
import { useRouter, useRoute } from 'vue-router'
import useRouteStore from '@/stores/modules/route'
import { constantRoute } from '@/router/routes'

const routeStore = useRouteStore()

let user = reactive({
  username: 'admin',
  password: 'yang123456',
})
let formValidate = ref()
let userStore = useUserStore()
let loading = ref(false)
const router = useRouter()
const route = useRoute()
const redirect = route.query.redirect as string
const login = async () => {
  await formValidate.value.validate()
  loading.value = true
  userStore
    .userLogin(user.username, user.password)
    .catch(() => {
      loading.value = false
    })
    .then(() => {
      loading.value = false
      if (localStorage.getItem('LOGIN') === '1') {
        router.push({
          path: redirect || '/home',
        })
      }
    })
}

const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 20, message: '密码长度在8位字符到20位字符之间', trigger: 'change' },
  ],
})

onMounted(() => {
  routeStore.menuRoutes = constantRoute
})
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/background-image.png') no-repeat;
  background-size: cover;

  .login-form {
    width: 80%;
    top: 30vh;
    position: relative;
    background: url('@/assets/background-form.png');
    padding: 50px;
    border-radius: 20px;
    h1 {
      color: rgb(214, 237, 246);
      font-size: 40px;
    }
    h2 {
      color: rgb(214, 237, 246);
      font-size: 20px;
      margin: 20px 0;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
