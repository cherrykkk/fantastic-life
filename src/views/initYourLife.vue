<template>
  <div class="rader-chart" ref="chart"></div>
  <div>当前社会背景：现代中国</div>
  <div class="buttons">
    <button @click="lottery()">随机天赋点</button>
    <button @click="onLifeStart()">进入人生</button>
  </div>
</template>

<script>
import { ref,reactive,onMounted } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts/core';
import { TitleComponent, LegendComponent } from 'echarts/components';
import { RadarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
export default ({
	setup() {
    const initScore = reactive({
      family: 4,
      body: 4,
      intelligence: 4,
      apperance: 4
    })
    const chart = ref(null)
    const myChart = ref(null)
    const minSize = 3
    const router = useRouter()
    const onLifeStart = ()=>{
      localStorage.setItem("initScore",JSON.stringify(initScore));
      router.push({path: "/yourLife"})
    }
    const lottery = ()=>{
      initScore.family = 1+Math.floor(Math.random()*9)
      initScore.body = 1+Math.floor(Math.random()*9)
      initScore.intelligence = 1+Math.floor(Math.random()*9)
      initScore.apperance = 1+Math.floor(Math.random()*9)

      localStorage.setItem("initScore",JSON.stringify(initScore));
      setChart()
    }
    const initChart = ()=>{
      echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer]);
      myChart.value = echarts.init(chart.value)
    }
    const setChart = ()=>{
      let option = {
        title: {
          text: '人生初始属性'
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '家境', max: 9 },
            { name: '体质', max: 9 },
            { name: '智力', max: 9 },
            { name: '外貌', max: 9 },
          ]
        },
        series: [
          {
            type: 'radar',
            data: [
              {
                value: [initScore.family, initScore.body, initScore.intelligence, initScore.apperance]
              }
            ]
          }
        ]
      }
      option && myChart.value.setOption(option)
    }
    onMounted(()=>{
      initChart()
      setChart()
    })
    return {
      initScore,
      onLifeStart,
      router,
      lottery,
      minSize,
      chart
    }
  }
})
</script>

<style lang="less" scoped>
.scores{
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-around;
  div{
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 50%;
    box-shadow: 0 0 40px 0;
  }
}

.buttons{
  position: fixed;
  bottom: 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  button{
    height: 60px;
    width: 60px;
    border-radius: 50%;
  }
}

.rader-chart{
  height: 300px;
  width: 300px;
  margin: 0 auto;
}

</style>