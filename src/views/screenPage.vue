<template>
  <div id="background"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

// 创建画布和粒子效果
let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let particles: Particle[] = []
const particleCount = 100

// 粒子类
class Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.size = Math.random() * 3 + 1 // 粒子大小
    this.speedX = Math.random() * 2 - 1 // 水平速度
    this.speedY = Math.random() * 2 - 1 // 垂直速度
    this.opacity = Math.random() * 0.5 + 0.5 // 不透明度
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    // 边界检测
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
  }

  draw() {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

// 初始化粒子
function initParticles() {
  particles = []
  for (let i = 0; i < particleCount; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    particles.push(new Particle(x, y))
  }
}

// 动画循环
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height) // 清除画布

  // 更新和绘制粒子
  particles.forEach((particle) => {
    particle.update()
    particle.draw()
  })

  requestAnimationFrame(animate)
}

// 调整画布大小以适应窗口
function resizeCanvas() {
  if (canvas) {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    initParticles() // 重新初始化粒子
  }
}

// 生命周期钩子
onMounted(() => {
  // 创建画布
  canvas = document.createElement('canvas')
  ctx = canvas.getContext('2d')!
  document.getElementById('background')?.appendChild(canvas)

  // 初始化画布和粒子
  resizeCanvas()
  animate()

  // 监听窗口大小变化
  window.addEventListener('resize', resizeCanvas)
})

onUnmounted(() => {
  // 移除事件监听器
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped>
/* 全局样式 */
#background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: #0a192f; /* 深蓝色背景 */
}
</style>
