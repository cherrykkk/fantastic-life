<template>
	<div class="page" :class="[{mobile:mobile},yourLife.body.sex=='男' ? 'boy':'girl']">
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
      <ul class="list-info">
        <li v-for="(e) in yourLife.body.illness.disease" :key="e">
          <span>{{e.title}}</span><br>
          <span class="extra">{{e.hurt}}<span v-if="e.occured">!</span></span>
        </li>
      </ul>
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
      </div>
      <ul class="list-info">
        <li v-for="(e) in yourLife.family.property.car" :key="e">
          <span>{{e}}</span>
        </li>
        <li v-for="(e) in yourLife.family.property.house" :key="e">
          <span>{{e}}</span>
        </li>
      </ul>
      <div class="events">
        <div v-for="(e,i) in eventsLiberary.classification.family" :key="i">
          {{e.message}}
        </div>
      </div>
    </div>
    <div class="intercourse window">
      <div class="title">社交</div>
      <div class="basic-info">
        名字:
        <span>{{yourLife.surname}}{{yourLife.givenName}}</span>
        <span v-if='(yourLife.surname||yourLife.givenName)==null'>无名</span>
      </div>
      <ul class="list-info">
        <li v-for="(e) in yourLife.intercourse.relationships" :key="e">
          <span :class="[e.targetSex=='男'?'boy':'girl']">{{e.target}}</span><br>
          <span class="extra">{{e.type}}~{{e.level}}</span>
        </li>
      </ul>
      <div class="events">
        <div v-for="(e,i) in eventsLiberary.classification.intercourse" :key="i">
          {{e.message}}
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
        <button @click="stepMonth()">进入次月</button>
        <button @click="autoStep(50)" v-if="!autoNext">火箭人生</button>
        <button @click="autoStep(500)" v-if="!autoNext">自动运行</button>
        <button @click="autoStep()" v-if="autoNext">暂停自动</button>
      </template>
      <template v-if="!living">
        <button>你死了</button>
        <button @click="restart()">重新开始</button>
      </template>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import initYourLife from '@/core/initYourLife.js'
import eventsLiberary from '@/core/EventsLiberary.js'

export default ({
	setup() {
    eventsLiberary.init()
    const living = ref(true)
		const age = ref(0)
    const autoNext = ref(false)
    const timeHandler = ref()
    const familyWealthy = ref(0)
    const yourLife = ref(null)
    const mobile = document.body.clientWidth < 800

    const route = useRoute()
    const router = useRouter()
    yourLife.value = initYourLife(route.query.bodyScore,route.query.familyScore)

    const restart = ()=>{
      eventsLiberary.init()
      router.push("/")
    }
		const stepMonth = ()=>{
      let yl = yourLife.value
      yl.stepMonth()
			if(yl.living()){
        age.value = yl.getAge()[0]+"."+ yl.getAge()[1]
        familyWealthy.value = (yl.family.state.wealthy).toFixed(0)
      }
      else{ //you died
        living.value = false
        autoStep()
      }
		}
    const autoStep = (time)=>{
      if(autoNext.value){
        clearTimeout(timeHandler.value)
        autoNext.value = false
      }
      else{
        timeHandler.value = setInterval(()=>{
          stepMonth()
        },time)
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
      living,
      mobile,
      router,
      restart
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
    bottom: 30px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    height: 20%;
    width: 20%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    button{
      height: 60px;
      width: 60px;
      border-radius: 50%;
    }
  }
  .body{
    width: 200px;
  }
  .window{
    float: left;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 3px 0 black;
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
    width: 45%;
    height: 40%;
    .title{
      font-weight: 600;
      flex-shrink: 0;
    }
    .basic-info{
      span{
        margin-right: 5px;
      }
      flex-shrink: 0;
    }
    .events{
      width: 100%;
      max-height: 60%;
      overflow: auto;
      font-size: 12px;
      border-top: 1px solid #333333;
      margin-top: 5px;
      padding-top: 5px;
    }
    .list-info{
      flex-shrink: 0;
      display: flex;
      flex-wrap: wrap;
      overflow: auto;
      max-height: 60px;
      margin: 0;
      li{
        padding-right: 20px;
        .extra{
          font-size: 12px;
        }
      }
      .boy{
        border: solid 1px blue;
        border-radius: 10%;
      }
      .girl{
        border: solid 1px red;
        border-radius: 10%;
      }
    }
  }
}

.boy{
  .window{
    box-shadow: 0 0 3px 0 blue;
  }
  button{
    box-shadow: 0 0 3px 0 blue;
  }
}
.girl{
  .window{
    box-shadow: 0 0 3px 0 red;
  }
  button{
    box-shadow: 0 0 3px 0 red;
  }
}

.mobile{
  position: absolute;
  .window{
    width: 90%;
    height: 40%;
    margin: 5px;
    padding: 5px;
  }
}
</style>