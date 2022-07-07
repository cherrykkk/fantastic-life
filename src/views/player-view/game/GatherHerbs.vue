<template>
  <div>采药</div>
  <div>
    <div>正确率：{{config.currentTries?(config.currentScore/config.currentTries).toFixed(2):0}}/{{config.targetAccuracy}}</div>
    <div v-if="config.targetObject">采集目标：{{config.targetObject['名称']}}</div>
    <div>目标数量：{{config.currentScore}}/{{config.level}}</div>
  </div>
  <div class="plant-area">
    <div class="plant" v-for="(e,i) in herbData" :key="i" @click="gatherHerb(e)" :style="{top:herbPosition[i].top+'px',left:herbPosition[i].left+'px'}">
      <img :src='e.叶子图片编码' />
    </div>
  </div>
  <button @click="refreshPosition()">拨弄一下</button>
  <!-- <div>
    <div @click="config.herbBookIsShowing=!config.herbBookIsShowing">{{config.herbBookIsShowing?'关闭':'查看'}}药典</div>
    <div class="herbData" v-if="config.herbBookIsShowing">
      <button @click="config.herbDataPage-=2">上一页</button>
      <div class="herb-cell" v-for="(e,i) in herbData.slice(config.herbDataPage,config.herbDataPage+2)" :key="i">
        {{e.名称}} <br>
        <div v-for="(e2,i2) in Object.keys(e.植物特征)" :key="i2">{{e2}}:{{e.植物特征[e2]}}</div>
        花期: {{e.花期}} <br>
        果期: {{e.果期}} <br>
      </div>
      <button @click="config.herbDataPage+=2">下一页</button>
    </div>
  </div> -->
  <div class="result-board" v-if="config.gameIsOver">
    当前采药能力
    <div>{{you.skills.herbology}}({{config.levelChange}})</div>
    <div @click="toUrl('/personal-view')">确定</div>
  </div>
</template>

<script>
import { inject, ref, reactive } from 'vue'
export default {
  setup() {
    const skillName = 'herbology'
    const Manager = inject("Manager").value
    Manager.stop()
    const you = Manager.you
    const currentMonth = Manager.World.calendar.month
    const herbData = ref(null)
    fetch('http://1.12.218.81:3000/herbData').then(res=>res.json()).then((res=>{
      herbData.value = res
      newRound()
    }))
    const herbPosition = ref(null)
    const config = reactive({
      level: you.skills[skillName],
      targetAccuracy: 0.9,
      currentAccuracy: 0,
      currentTries: 0,
      currentScore: 0,
      targetObject: null,
      currentChosenObject: null,
      gameIsOver: false,
      levelChange: 0,
      herbBookIsShowing: false,
      herbDataPage: 0
    })
    const newRound = function() {
      config.targetObject = _.sample(herbData.value)
      refreshPosition()
    }
    const seeFeatures = function(herb) {
      const features = {
        '叶': herb['植物特征']['叶']
      }
      if (herb['花期'].indexOf(currentMonth) >= 0) {
        features['花'] = herb['植物特征']['花']
      }
      if (herb['果期'].indexOf(currentMonth) >= 0) {
        features['果'] = herb['植物特征']['果']
      }
      return features
    }
    const gatherHerb = function(herb) {
      config.currentTries += 1
      if (herb['名称']==config.targetObject['名称']) {
        console.log("采集正确")
        config.currentScore += 1
      }
      else {
        console.log("采集错误")
      }
      newRound()
      // 结束游戏？
      if (config.currentTries >= config.level) {
        config.gameIsOver = true
        config.levelChange = config.currentScore/config.currentTries >= config.targetAccuracy ? 1 : -1
        you.skills.herbology += config.levelChange
      }
    }
    const refreshPosition = ()=>{
      const { innerHeight, innerWidth } = window
      herbPosition.value = []
      herbData.value.forEach( e => {
        herbPosition.value.push({
          left: Math.random()*(innerWidth-100), //图片宽高100
          //top: Math.random()*(innerHeight-100-300)
          top: Math.random()*(400-100)
        })
      });
    }
    return {
      Manager,
      you,
      seeFeatures,
      gatherHerb,
      config,
      herbData,
      herbPosition,
      refreshPosition,
      toUrl: inject("toUrl")
    }
  }
}
</script>

<style lang="less" scoped>
.plant-area {
  position: relative;
  height: 400px;
  .plant {
    position: absolute;
    border-radius: 50%;
    overflow: hidden;
    line-height: 0; //img 为行内元素，底下会有一道空白
  }
}

.herbData {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 40px;
  padding: 20px;
  background-color: #c8cf9c;
  border: black 1px solid;
  border-radius: 20px;
  display: flex;
  .herb-cell {
    width: 300px;
  }
  button {
    background-color: #c8cf9c;
    width: 30px;
  }
}
.result-board {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #c8cf9c;
  border-radius: 20px;
  font-size: 50px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
}
</style>