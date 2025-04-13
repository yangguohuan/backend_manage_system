<template>
  <div id="background">
    <div class="screen" ref="screen">
      <div class="top">
        <div class="left">
          <button type="submit" class="lbtn" @click="goHome">首页</button>
        </div>
        <div class="center">
          <div class="title">智慧旅游可视化大数据平台</div>
        </div>
        <div class="right">
          <button class="rbtn">统计报告</button>
          <span class="rtime">当前时间{{ time }}</span>
        </div>
      </div>
      <div class="bottom">
        <div class="left">
          <div class="tour">
            <div style="display: flex; justify-content: space-between">
              <span style="color: black; font-size: 16px">实时游客统计</span>
              <span style="color: black; text-align: right; font-size: 16px"
                >可预约人数900000人</span
              >
            </div>
            <div class="people-container">
              <span v-for="k in people" :key="k">{{ k }}</span>
            </div>
            <div class="charts" ref="charts"></div>
          </div>
          <div class="sex">
            <div class="images-container">
              <img src="./images/man.png" class="role-profile" />
              <img src="./images/woman.png" class="role-profile" />
            </div>
            <p style="text-align: center; margin-top: 10px">男女比列</p>
            <div style="display: flex; justify-content: space-between">
              <span>男52%</span>
              <span>女48%</span>
            </div>
            <div class="sex-radio" ref="sexRadio"></div>
          </div>
          <div class="age">
            <div class="age-radio" ref="ageRadio"></div>
          </div>
        </div>
        <div class="center">
          <div class="bottom-center-top">
            <div class="charts-map" ref="chartsMap"></div>
          </div>
          <div class="bottom-center-bottom">
            <div class="charts-line" ref="chartsLine"></div>
          </div>
        </div>
        <div class="right">
          <div class="bottom-right-top" ref="bottomRightTop"></div>
          <div class="bottom-right-center" ref="bottomRightCenter"></div>
          <div class="bottom-right-bottom" ref="bottomRightTopBottom"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment'
import * as echarts from 'echarts'
import 'echarts-liquidfill'
import JsonChina from '@/components/map/China.json'

const screen = ref<HTMLElement>()
const router = useRouter()
let time = ref(moment().format('YYYY年MM月DD日hh:mm:ss'))
const timer = ref('')

// 人数
const people = ref('2169012人')

// 水波图, 柱形图，扇形图
const charts = ref()
const sexRadio = ref()
const ageRadio = ref()
const chartsMap = ref()
const chartsLine = ref()
const bottomRightTop = ref()
const bottomRightCenter = ref()
const bottomRightTopBottom = ref()

const goHome = () => {
  console.log(123)
  router.push('/base')
}

function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}

// 创建画布和粒子效果
let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let particles: Particle[] = []
const particleCount = 100

// 数据
const dataBJ = [
  [1, 55, 9, 56, 0.46, 18, 6, '良'],
  [2, 25, 11, 21, 0.65, 34, 9, '优'],
  [3, 56, 7, 63, 0.3, 14, 5, '良'],
  [4, 33, 7, 29, 0.33, 16, 6, '优'],
  [5, 42, 24, 44, 0.76, 40, 16, '优'],
  [6, 82, 58, 90, 1.77, 68, 33, '良'],
  [7, 74, 49, 77, 1.46, 48, 27, '良'],
  [8, 78, 55, 80, 1.29, 59, 29, '良'],
  [9, 267, 216, 280, 4.8, 108, 64, '重度污染'],
  [10, 185, 127, 216, 2.52, 61, 27, '中度污染'],
  [11, 39, 19, 38, 0.57, 31, 15, '优'],
  [12, 41, 11, 40, 0.43, 21, 7, '优'],
  [13, 64, 38, 74, 1.04, 46, 22, '良'],
  [14, 108, 79, 120, 1.7, 75, 41, '轻度污染'],
  [15, 108, 63, 116, 1.48, 44, 26, '轻度污染'],
  [16, 33, 6, 29, 0.34, 13, 5, '优'],
  [17, 94, 66, 110, 1.54, 62, 31, '良'],
  [18, 186, 142, 192, 3.88, 93, 79, '中度污染'],
  [19, 57, 31, 54, 0.96, 32, 14, '良'],
  [20, 22, 8, 17, 0.48, 23, 10, '优'],
  [21, 39, 15, 36, 0.61, 29, 13, '优'],
  [22, 94, 69, 114, 2.08, 73, 39, '良'],
  [23, 99, 73, 110, 2.43, 76, 48, '良'],
  [24, 31, 12, 30, 0.5, 32, 16, '优'],
  [25, 42, 27, 43, 1, 53, 22, '优'],
  [26, 154, 117, 157, 3.05, 92, 58, '中度污染'],
  [27, 234, 185, 230, 4.09, 123, 69, '重度污染'],
  [28, 160, 120, 186, 2.77, 91, 50, '中度污染'],
  [29, 134, 96, 165, 2.76, 83, 41, '轻度污染'],
  [30, 52, 24, 60, 1.03, 50, 21, '良'],
  [31, 46, 5, 49, 0.28, 10, 6, '优'],
]
const dataGZ = [
  [1, 26, 37, 27, 1.163, 27, 13, '优'],
  [2, 85, 62, 71, 1.195, 60, 8, '良'],
  [3, 78, 38, 74, 1.363, 37, 7, '良'],
  [4, 21, 21, 36, 0.634, 40, 9, '优'],
  [5, 41, 42, 46, 0.915, 81, 13, '优'],
  [6, 56, 52, 69, 1.067, 92, 16, '良'],
  [7, 64, 30, 28, 0.924, 51, 2, '良'],
  [8, 55, 48, 74, 1.236, 75, 26, '良'],
  [9, 76, 85, 113, 1.237, 114, 27, '良'],
  [10, 91, 81, 104, 1.041, 56, 40, '良'],
  [11, 84, 39, 60, 0.964, 25, 11, '良'],
  [12, 64, 51, 101, 0.862, 58, 23, '良'],
  [13, 70, 69, 120, 1.198, 65, 36, '良'],
  [14, 77, 105, 178, 2.549, 64, 16, '良'],
  [15, 109, 68, 87, 0.996, 74, 29, '轻度污染'],
  [16, 73, 68, 97, 0.905, 51, 34, '良'],
  [17, 54, 27, 47, 0.592, 53, 12, '良'],
  [18, 51, 61, 97, 0.811, 65, 19, '良'],
  [19, 91, 71, 121, 1.374, 43, 18, '良'],
  [20, 73, 102, 182, 2.787, 44, 19, '良'],
  [21, 73, 50, 76, 0.717, 31, 20, '良'],
  [22, 84, 94, 140, 2.238, 68, 18, '良'],
  [23, 93, 77, 104, 1.165, 53, 7, '良'],
  [24, 99, 130, 227, 3.97, 55, 15, '良'],
  [25, 146, 84, 139, 1.094, 40, 17, '轻度污染'],
  [26, 113, 108, 137, 1.481, 48, 15, '轻度污染'],
  [27, 81, 48, 62, 1.619, 26, 3, '良'],
  [28, 56, 48, 68, 1.336, 37, 9, '良'],
  [29, 82, 92, 174, 3.29, 0, 13, '良'],
  [30, 106, 116, 188, 3.628, 101, 16, '轻度污染'],
  [31, 118, 50, 0, 1.383, 76, 11, '轻度污染'],
]
const dataSH = [
  [1, 91, 45, 125, 0.82, 34, 23, '良'],
  [2, 65, 27, 78, 0.86, 45, 29, '良'],
  [3, 83, 60, 84, 1.09, 73, 27, '良'],
  [4, 109, 81, 121, 1.28, 68, 51, '轻度污染'],
  [5, 106, 77, 114, 1.07, 55, 51, '轻度污染'],
  [6, 109, 81, 121, 1.28, 68, 51, '轻度污染'],
  [7, 106, 77, 114, 1.07, 55, 51, '轻度污染'],
  [8, 89, 65, 78, 0.86, 51, 26, '良'],
  [9, 53, 33, 47, 0.64, 50, 17, '良'],
  [10, 80, 55, 80, 1.01, 75, 24, '良'],
  [11, 117, 81, 124, 1.03, 45, 24, '轻度污染'],
  [12, 99, 71, 142, 1.1, 62, 42, '良'],
  [13, 95, 69, 130, 1.28, 74, 50, '良'],
  [14, 116, 87, 131, 1.47, 84, 40, '轻度污染'],
  [15, 108, 80, 121, 1.3, 85, 37, '轻度污染'],
  [16, 134, 83, 167, 1.16, 57, 43, '轻度污染'],
  [17, 79, 43, 107, 1.05, 59, 37, '良'],
  [18, 71, 46, 89, 0.86, 64, 25, '良'],
  [19, 97, 71, 113, 1.17, 88, 31, '良'],
  [20, 84, 57, 91, 0.85, 55, 31, '良'],
  [21, 87, 63, 101, 0.9, 56, 41, '良'],
  [22, 104, 77, 119, 1.09, 73, 48, '轻度污染'],
  [23, 87, 62, 100, 1, 72, 28, '良'],
  [24, 168, 128, 172, 1.49, 97, 56, '中度污染'],
  [25, 65, 45, 51, 0.74, 39, 17, '良'],
  [26, 39, 24, 38, 0.61, 47, 17, '优'],
  [27, 39, 24, 39, 0.59, 50, 19, '优'],
  [28, 93, 68, 96, 1.05, 79, 29, '良'],
  [29, 188, 143, 197, 1.66, 99, 51, '中度污染'],
  [30, 174, 131, 174, 1.55, 108, 50, '中度污染'],
  [31, 187, 143, 201, 1.39, 89, 53, '中度污染'],
]
const schema = [
  { name: 'date', index: 0, text: '日' },
  { name: 'AQIindex', index: 1, text: 'AQI指数' },
  { name: 'PM25', index: 2, text: 'PM2.5' },
  { name: 'PM10', index: 3, text: 'PM10' },
  { name: 'CO', index: 4, text: '一氧化碳（CO）' },
  { name: 'NO2', index: 5, text: '二氧化氮（NO2）' },
  { name: 'SO2', index: 6, text: '二氧化硫（SO2）' },
]
const itemStyle = {
  opacity: 0.8,
  shadowBlur: 10,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: 'rgba(0,0,0,0.3)',
}

// 数据
var data = [
  {
    name: '青海',
    children: [
      {
        name: '玉树',
        value: 15,
        children: [
          {
            name: '西宁',
            value: 2,
          },
          {
            name: '青海湖',
            value: 5,
            children: [
              {
                name: '村子',
                value: 2,
              },
            ],
          },
          {
            name: '石头',
            value: 4,
          },
        ],
      },
      {
        name: '新疆',
        children: [
          {
            name: '乌鲁木齐',
            value: 4,
          },
        ],
      },
      {
        name: '内蒙古',
        value: 10,
        children: [
          {
            name: '呼和浩特',
            value: 5,
            itemStyle: {
              color: '旗',
            },
          },
          {
            name: '二连浩特',
            value: 1,
          },
        ],
      },
    ],
  },
  {
    name: '北京',
    children: [
      {
        name: '通州区',
        children: [
          {
            name: '通天大医院',
            value: 3,
          },
          {
            name: '好地方',
            value: 4,
            children: [
              {
                name: '吃饭',
                value: 2,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: '江西',
    children: [
      {
        name: '南昌',
        children: [
          {
            name: '南昌拌粉',
            value: 1,
          },
          {
            name: '辣辣辣',
            value: 2,
          },
        ],
      },
    ],
  },
]

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

window.onresize = () => {
  ;(screen.value as HTMLElement).style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}

// @ts-expect-error: no error
echarts.registerMap('china', JsonChina)
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

  // 大屏
  ;(screen.value as HTMLElement).style.transform = `scale(${getScale()}) translate(-50%,-50%)`

  timer.value = setInterval(() => {
    time.value = moment().format('YYYY年MM月DD日hh:mm:ss')
  }, 1000) as unknown as string

  // 实例化echart
  let mycharts = echarts.init(charts.value)
  let sexcharts = echarts.init(sexRadio.value)
  let agecharts = echarts.init(ageRadio.value)
  let mapCharts = echarts.init(chartsMap.value)
  let lineCharts = echarts.init(chartsLine.value)
  let rankCharts = echarts.init(bottomRightTop.value)
  let yearCharts = echarts.init(bottomRightCenter.value)
  let countCharts = echarts.init(bottomRightTopBottom.value)

  // 水波图
  mycharts.setOption({
    series: [
      {
        type: 'liquidFill',
        data: [0.5, 0.4, 0.3],
        radius: '90%',
        color: ['red', '#0f0', 'rgb(0, 0, 255)'],
        itemStyle: {
          opacity: 0.6,
        },
        emphasis: {
          itemStyle: {
            opacity: 0.9,
          },
        },
      },
    ],
  })

  // 性别比例
  sexcharts.setOption({
    xAxis: { show: false, min: 0, max: 100 },
    yAxis: { show: false, type: 'category' },
    series: [
      {
        type: 'bar',
        z: '200',
        data: [
          {
            value: 52,
            // 设置单个柱子的样式
            itemStyle: {
              color: 'yellowgreen',
              borderRadius: 5,
            },
          },
        ],
      },
      {
        type: 'bar',
        barGap: '-100%',
        data: [
          {
            value: 100,
            // 设置单个柱子的样式
            itemStyle: {
              color: 'pink',
              borderRadius: 5,
            },
          },
        ],
      },
    ],
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  })

  // 年龄比例
  agecharts.setOption({
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: '年龄比例',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '军事' },
          { value: 735, name: '新闻' },
          { value: 580, name: '直播' },
          { value: 484, name: '娱乐' },
          { value: 300, name: '视频' },
        ],
      },
    ],
  })

  // 地图
  mapCharts.setOption({
    geo: {
      map: 'china',
      roam: true,
      zoom: 1.2,
      scaleLimit: {
        max: 2,
        min: 0.5,
      },
      label: {
        show: true,
      },
      layoutCenter: ['50%', '70%'],
      layoutSize: '100%',
    },
    series: [
      {
        type: 'lines',
        lineStyle: {
          color: 'yellowgreen',
          width: 2,
          curveness: 0.1,
        },
        effect: {
          show: true,
          symbol: 'pin',
          symbolSize: 8,
        },
        data: [
          {
            coords: [
              [121.472644, 31.231706],
              [87.617733, 43.792818],
            ],
          },
          {
            coords: [
              [121.472644, 31.231706],
              [116.405285, 39.904989],
            ],
          },
          {
            coords: [
              [116.405285, 39.904989],
              [113.280637, 23.125178],
            ],
          },
          {
            coords: [
              [121.509062, 25.044332],
              [104.065735, 30.659462],
            ],
          },
          {
            coords: [
              [120.109913, 29.181466],
              [101.778916, 36.623178],
            ],
          },
          {
            coords: [
              [114.173355, 22.320048],
              [91.132212, 29.660361],
            ],
          },
          {
            coords: [
              [121.472644, 31.231706],
              [87.617733, 43.792818],
            ],
          },
          {
            coords: [
              [101.778916, 36.623178],
              [126.642464, 45.756967],
            ],
          },
          {
            coords: [
              [122.604994, 41.299712],
              [120.109913, 29.181466],
            ],
          },
        ],
      },
    ],
  })

  // 地图下方柱形图
  lineCharts.setOption({
    title: {
      left: 'center',
      text: '7日游客访问量',
    },
    xAxis: {
      name: '天数',
      type: 'category',
      boundaryGap: false,
      axisLine: {
        show: true,
        lineStyle: {
          color: '#000',
        },
      },
      nameTextStyle: {
        color: '#000',
      },
      axisLabel: {
        show: true,
        color: '#000',
      },
      data: ['第一天', '第二天', '第三天', '第四天', '第五天', '第六天', '第七天'],
    },
    yAxis: {
      name: '人数(个)',
      type: 'value',
      boundaryGap: [0, '100%'],
      max: 500,
      nameTextStyle: {
        color: '#000',
      },
      axisLabel: {
        show: true,
        color: '#000',
      },
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#000',
        },
      },
    },
    grid: {
      top: 50,
      left: 50,
      right: 80,
      bottom: 30,
    },
    series: [
      {
        type: 'line',
        data: [120, 500, 356, 247, 466, 230, 210, 369],
        smooth: true,
        lineStyle: {
          color: 'black',
        },
        label: {
          show: true,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(135, 206, 235)',
            },
            {
              offset: 1,
              color: 'rgb(65, 105, 225)',
            },
          ]),
        },
      },
    ],
  })

  // 景区排行
  rankCharts.setOption({
    title: {
      text: '景区排行',
      left: 'center',
      top: 10,
      textStyle: {
        fontSize: 16,
        color: 'black',
      },
      subtext: '各大景区排行',
      subtextStyle: {
        color: '#ccc',
      },
    },
    xAxis: {
      type: 'value',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#000',
        },
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: 'category',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#000',
        },
      },
      splitLine: {
        show: false,
      },
      data: ['北京', '上海', '广州', '深圳', '成都', '武汉', '厦门'],
    },
    grid: {
      top: 55,
      left: 40,
      right: 30,
      bottom: 30,
    },
    series: [
      {
        type: 'bar',
        data: [120, 500, 356, 247, 466, 230, 210, 369],
        label: {
          show: true,
          color: '#fff',
        },
        labelLine: {
          show: true,
        },
        itemStyle: {
          color: '#0A1F44',
          borderColor: '#000',
        },
        barGap: '10%',
      },
      {
        type: 'line',
        data: [120, 500, 356, 247, 466, 230, 210, 369],
        lineStyle: {
          color: '#000',
        },
        smooth: true,
      },
    ],
  })

  yearCharts.setOption({
    color: ['#dd4444', '#fec42c', '#80F1BE'],
    legend: {
      top: 10,
      data: ['北京', '上海', '广州'],
      textStyle: {
        fontSize: 16,
      },
    },
    grid: {
      left: '10%',
      right: 150,
      top: '18%',
      bottom: '10%',
    },
    tooltip: {
      backgroundColor: 'rgba(255,255,255,0.7)',
      // @ts-expect-error: no error
      formatter: function (param) {
        var value = param.value
        // prettier-ignore
        return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                + param.seriesName + ' ' + value[0] + '日：'
                + value[7]
                + '</div>'
                + schema[1].text + '：' + value[1] + '<br>'
                + schema[2].text + '：' + value[2] + '<br>'
                + schema[3].text + '：' + value[3] + '<br>'
                + schema[4].text + '：' + value[4] + '<br>'
                + schema[5].text + '：' + value[5] + '<br>'
                + schema[6].text + '：' + value[6] + '<br>';
      },
    },
    xAxis: {
      type: 'value',
      name: '日期',
      nameGap: 16,
      nameTextStyle: {
        fontSize: 16,
      },
      max: 31,
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      name: 'AQI指数',
      nameLocation: 'end',
      nameGap: 20,
      nameTextStyle: {
        fontSize: 16,
      },
      splitLine: {
        show: false,
      },
    },
    visualMap: [
      {
        left: 'right',
        top: '10%',
        dimension: 2,
        min: 0,
        max: 250,
        itemWidth: 30,
        itemHeight: 120,
        calculable: true,
        precision: 0.1,
        text: ['圆形大小：PM2.5'],
        textGap: 30,
        inRange: {
          symbolSize: [10, 70],
        },
        outOfRange: {
          symbolSize: [10, 70],
          color: ['rgba(255,255,255,0.4)'],
        },
        controller: {
          inRange: {
            color: ['#c23531'],
          },
          outOfRange: {
            color: ['#999'],
          },
        },
      },
      {
        left: 'right',
        bottom: '5%',
        dimension: 6,
        min: 0,
        max: 50,
        itemHeight: 120,
        text: ['明暗：二氧化硫'],
        textGap: 30,
        inRange: {
          colorLightness: [0.9, 0.5],
        },
        outOfRange: {
          color: ['rgba(255,255,255,0.4)'],
        },
        controller: {
          inRange: {
            color: ['#c23531'],
          },
          outOfRange: {
            color: ['#999'],
          },
        },
      },
    ],
    series: [
      {
        name: '北京',
        type: 'scatter',
        itemStyle: itemStyle,
        data: dataBJ,
      },
      {
        name: '上海',
        type: 'scatter',
        itemStyle: itemStyle,
        data: dataSH,
      },
      {
        name: '广州',
        type: 'scatter',
        itemStyle: itemStyle,
        data: dataGZ,
      },
    ],
  })

  countCharts.setOption({
    visualMap: {
      type: 'continuous',
      min: 0,
      max: 10,
      inRange: {
        color: ['#2F93C8', '#AEC48F', '#FFDB5C', '#F98862'],
      },
    },
    series: {
      type: 'sunburst',
      data: data,
      radius: [0, '90%'],
      label: {
        rotate: 'radial',
      },
    },
  })
})

onUnmounted(() => {
  // 移除事件监听器
  window.removeEventListener('resize', resizeCanvas)
  timer.value = ''
})
</script>

<style scoped lang="scss">
/* 全局样式 */
#background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: #0a192f; /* 深蓝色背景 */
  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    .top {
      width: 100%;
      height: 40px;
      display: flex;
      .right {
        flex: 1;
        display: flex;
        justify-content: space-between;
        .rbtn {
          text-align: center;
          width: 100px;
          height: 40px;
          color: white;
          font-size: 20px;
        }
        .rtime {
          color: white;
          margin-right: 10px;
        }
      }
      .left {
        flex: 1;
        .lbtn {
          text-align: center;
          width: 100px;
          height: 40px;
          float: right;
          color: white;
          font-size: 20px;
        }
      }
      .center {
        flex: 2;
        .title {
          text-align: center;
          font-size: 36px;
          line-height: 74px;
          color: white;
        }
      }
    }
    .bottom {
      display: flex;
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        .bottom-right-top {
          flex: 1;
          background-color: #007fff;
          margin-top: 20px;
          border-radius: 10px;
          opacity: 0.8;
          width: 100%;
          height: 100%;
        }
        .bottom-right-center {
          flex: 1;
          background-color: #007fff;
          margin-top: 20px;
          border-radius: 10px;
          opacity: 0.8;
          width: 100%;
          height: 100%;
        }
        .bottom-right-bottom {
          flex: 1;
          background-color: #007fff;
          margin-top: 20px;
          margin-bottom: 20px;
          border-radius: 10px;
          opacity: 0.8;
          width: 100%;
          height: 100%;
        }
      }
      .left {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;
        .tour {
          flex: 1;
          padding: 20px;
          display: flex;
          flex-direction: column;
          background-color: #007fff;
          border-radius: 10px;
          opacity: 0.8;
          .people-container {
            margin-top: 10px;
            display: flex;
            span {
              flex: 1;
              text-align: center;
              line-height: 50px;
              background-color: #6c63ff;
              width: 50px;
              height: 50px;
              border-radius: 2px;
              margin-left: 5px;
              color: aliceblue;
            }
          }

          .charts {
            margin-top: 20px;
            width: 100%;
            height: 200px;
          }
        }
        .sex {
          flex: 1;
          background-color: #007fff;
          margin: 20px 0;
          border-radius: 10px;
          opacity: 0.8;
          padding: 20px;
          .sex-radio {
            margin-top: 5px;
            width: 100%;
            height: 30px;
          }
          .images-container {
            display: flex;
            justify-content: space-around;
            .role-profile {
              width: 180px;
              height: 200px;
            }
          }
        }
        .age {
          flex: 1;
          background-color: #007fff;
          margin-bottom: 20px;
          border-radius: 10px;
          opacity: 0.8;
          display: flex;
          justify-content: space-around;
          .age-radio {
            margin: 0 auto;
            width: 100%;
            height: 300px;
          }
        }
      }
      .center {
        flex: 2;
        display: flex;
        flex-direction: column;
        .bottom-center-top {
          flex: 4;
          .charts-map {
            width: 100%;
            height: 100%;
          }
        }
        .bottom-center-bottom {
          flex: 1;
          margin: 20px;
          background-color: #007fff;
          border-radius: 10px;
          opacity: 0.8;
          .charts-line {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
