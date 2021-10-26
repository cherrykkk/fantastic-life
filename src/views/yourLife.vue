<template>
	<div class="page" :class="[yourLife.body.sex=='男' ? 'boy':'girl']">
    <div class="body window">
      <div class="title">身体</div>
      <div class="basic-info">
        <span>体质{{yourLife.body.consititution}}</span>
        <span>智力{{yourLife.body.intelligence}}</span>
        <span>外貌{{yourLife.body.appearance}}</span><br>
        <span>健康{{yourLife.body.healthy}}</span>
        <span>{{yourLife.body.sex}}</span>
        <span>年龄:{{age}}</span>
      </div>
      <div class="events">
        <div v-for="(e,i) in eventsLiberary.classification.body" :key="i">
          {{e.message}}({{Math.floor(e.occurMonth/12)}})
        </div>
      </div>
    </div>
    <div class="family window">
      <div class="title">家庭</div>
      <div class="basic-info">
        <span>父亲<span v-if="!yourLife.family.state.father">(亡故)</span></span>
        <span>母亲<span v-if="!yourLife.family.state.mother">(亡故)</span></span><br>
        <span>流动资产{{yourLife.family.state.wealthy}}</span><br>
        <span>固定资产 
          <span v-for="(e) in yourLife.family.property.car" :key="e">{{e}}</span>
          <span v-for="(e) in yourLife.family.property.house" :key="e">{{e}}</span>
        </span>
      </div>
      <div class="events">
        <div v-for="(e,i) in eventsLiberary.classification.family" :key="i">
          {{e.message}}({{Math.floor(e.occurMonth/12)}})
        </div>
      </div>
    </div>
    <div class="intercourse window">
      <div class="title">社交</div>
      <div class="basic-info">
        名字:{{yourLife.surname}}{{yourLife.givenName}}
      </div>
      <ul class="list-info">
        <li v-for="(e) in yourLife.intercourse.relationships" :key="e">
          <span>{{e.target}}</span><br>
          <span class="extra">{{e.type}}~{{e.level}}</span>
        </li>
      </ul>
      <div class="events">
        <div v-for="(e,i) in eventsLiberary.classification.intercourse" :key="i">
          {{e.message}}({{Math.floor(e.occurMonth/12)}})
        </div>
      </div>
    </div>
    <div class="study window">
      <div class="title">学业</div>
      <div class="basic-info">
        成绩排名(省):前{{yourLife.study.ranking}}%
      </div>
      <div class="events">
        <div v-for="(e,i) in eventsLiberary.classification.study" :key="i">
          {{e.message}}({{Math.floor(e.occurMonth/12)}})
        </div>
      </div>
    </div>
    <div class="buttons">
      <template  v-if="living">
        <button @click="stepMonth()">next month</button>
        <button @click="autoStep()" v-if="!autoNext">auto next month</button>
        <button @click="autoStep()" v-if="autoNext">stop auto next month</button>
      </template>
      <div v-if="!living">你死了</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import yourLife from '@/core/yourLife.js'
import eventsLiberary from '@/core/EventsLiberary.js'

export default ({
	setup() {
    const living = ref(true)
		const age = ref(0)
    const autoNext = ref(false)
    const timeHandler = ref()
    const familyWealthy = ref(0)
		const stepMonth = ()=>{
      yourLife.stepMonth()
			if(yourLife.living()){
        age.value = yourLife.getAge()[0]+"."+yourLife.getAge()[1]
        familyWealthy.value = (yourLife.family.state.wealthy).toFixed(0)
      }
      else{ //you died
        living.value = false
        autoStep()
      }
		}
    const autoStep = ()=>{
      if(autoNext.value){
        clearTimeout(timeHandler.value)
        autoNext.value = false
      }
      else{
        timeHandler.value = setInterval(()=>{
          stepMonth()
        },100)
        autoNext.value = true
      }
    }
		return {
			yourLife,
			eventsLiberary,
			stepMonth,
			age,
      autoStep,
      autoNext,
      familyWealthy,
      living
		}
	},
})
</script>

<style lang="less" scoped>
.page{
  position: fixed;
  height: 100%;
  width: 100%;
  .buttons{
    position: fixed;
    bottom: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
  .body{
    width: 200px;
  }
  .window{
    float: left;
    box-shadow: 0 0 3px 0 black;
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
    width: 400px;
    .title{
      font-weight: 600;
    }
    .basic-info{
      span{
        margin-right: 5px;
      }
    }
    .events{
      width: 100%;
      max-height: 200px;
      overflow: auto;
      font-size: 12px;
      border-top: 1px solid #333333;
      margin-top: 5px;
      padding-top: 5px;
    }
    .list-info{
      display: flex;
      flex-wrap: wrap;
      overflow: auto;
      max-height: 60px;
      li{
        padding-right: 20px;
        .extra{
          font-size: 12px;
        }
      }
    }
  }
}

.boy{
  .window{
    box-shadow: 0 0 3px 0 blue;
  }
}
.girl{
  .window{
    box-shadow: 0 0 3px 0 red;
  }
}
</style>