<template>
  <div>采药</div>
  <div>当前月份： {{currentMonth}}</div>
  <div>
    <div>正确率：{{config.currentTries?(config.currentScore/config.currentTries).toFixed(2):0}}/{{config.targetAccuracy}}</div>
    <div v-if="config.targetObject">采集目标：{{config.targetObject['名称']}}</div>
    <div>目标数量：{{config.currentScore}}/{{config.level}}</div>
  </div>
  <div>
    可见草药
    <div class="herb" v-for="(e,i) in herbData" :key="i" @click="gatherHerb(e)">
      <!-- {{seeFeatures(e)}} -->
      <img :src='e.叶子图片编码' />
    </div>
  </div>
  <div>
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
  </div>
  <div class="result-board" v-if="config.gameIsOver">
    当前采药能力
    <div>{{you.skills.herbology}}({{config.levelChange}})</div>
    <router-link to='/player-view'>确定</router-link>
  </div>
</template>

<script>
import { inject, ref, reactive } from 'vue'
import herbData from './herbs.json'
export default {
  setup() {
    const skillName = 'herbology'
    const Manager = inject("Manager").value
    const you = Manager.you
    const currentMonth = Manager.GameWorld.calendar.month
    const herbData = ref(null)
    fetch('http://1.12.218.81:3000/herbData').then(res=>res.json()).then((res=>{
      herbData.value = res
      newRound()
    }))

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
    return {
      Manager,
      you,
      currentMonth,
      seeFeatures,
      gatherHerb,
      config,
      herbData
    }
  }
}
</script>

<style lang="less" scoped>
.herb {
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: 2px solid green;
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