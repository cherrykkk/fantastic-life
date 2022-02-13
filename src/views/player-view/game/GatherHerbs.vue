<template>
  <div>采药</div>
  <div>当前月份： {{currentMonth}}</div>
  <div>
    采集目标：{{targetHerb['名称']}}
  </div>
  <div>
    <div class="herb" v-for="(e,i) in allHerb" :key="i" @click="gatherHerb(e)">{{seeFeatures(e)}}</div>
  </div>
  <div>
    <div @click="showHerbData=!showHerbData">{{showHerbData?'关闭':'查看'}}药典</div>
    <div class="herbData" v-if="showHerbData">
      <div v-for="(e,i) in allHerb" :key="i">{{e}}</div>
    </div>
  </div>
  <div class="result-board" v-if="gameOver">
    当前采药能力
    <div>{{you.skills.herbology}}({{levelChange}})</div>
    <router-link to='/'>确定</router-link>
  </div>
</template>

<script>
import { inject,ref } from 'vue'
import herbData from './herbs.json'
export default {
  data() {
    return {
      showingHerb: null,
      allHerb: herbData,
      showHerbData: false,
      levelChange: null,
    }
  },
  setup() {
    const GameWorld = inject("GameWorld").value
    const you = GameWorld.getCharacterById(GameWorld.theMainCharacterId)
    const currentMonth = GameWorld.world_month%12+1
    const targetHerb = _.sample(herbData)
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
    const gameOver = ref(false)
    const levelChange = ref(0)
    const gatherHerb = function(herb) {
      if (herb['名称']==targetHerb['名称']) {
        console.log("采集正确")
        levelChange.value = 1
      }
      else {
        console.log("采集错误")
        levelChange.value = -1
      }
      gameOver.value = true
      you.skills.herbology += levelChange.value
    }
    return {
      GameWorld,
      you,
      currentMonth,
      seeFeatures,
      targetHerb,
      gatherHerb,
      levelChange,
      gameOver
    }
  },
  created() {
    this.showingHerb = herbData.filter( e => {
      return e['花期'].indexOf(this.currentMonth) >= 0
    })                              
  },
  methods: {
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
  margin: 40px;
  padding: 20px;
  background-color: #c8cf9c;
  border: black 1px solid;
  border-radius: 20px;
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