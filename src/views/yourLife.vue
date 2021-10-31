<template>
	<div class="page" :class="[{mobile:mobile},yourLife.body.sex=='男' ? 'boy':'girl']">
    <panel :info="bodyInfo"></panel>
    <panel :info="familyInfo"></panel>
    <panel :info="intercourseInfo"></panel>
    <panel :info="studyInfo"></panel>
    <div class="buttons">
      <template v-if="!born">
        <button @click="getBorn()">降生吧！</button>
      </template>
      <template v-if="born&&living">
        <button @click="stepMonth()">进入次月</button>
        <button @click="actionEdit=true">月行为点{{yourLife.actionPoint}}</button>
        <button @click="autoStep(50)" v-if="!autoNext">火箭人生</button>
        <button @click="autoStep(500)" v-if="!autoNext">自动运行</button>
        <button @click="autoStep()" v-if="autoNext">暂停自动</button>
      </template>
      <template v-if="!living">
        <button>你死了</button>
        <button @click="restart()">重新开始</button>
      </template>
    </div>
    <div v-if="actionEdit" class="edit-board">
      <button @click="actionEdit=false">返回</button>
      <button @click="setActionStrategy('运动')" :class="{actived:yourLife.actionStrategy=='运动'}">运动</button>
      <button @click="setActionStrategy('交际')" :class="{actived:yourLife.actionStrategy=='交际'}">交际</button>
      <button @click="setActionStrategy('学习')" :class="{actived:yourLife.actionStrategy=='学习'}">学习</button>
    </div>
  </div>
</template>

<script>
import { ref,reactive,onMounted} from 'vue'
import { useRoute,useRouter } from 'vue-router'
import Panel from './Panel'
import initYourLife from '@/core/initYourLife.js'
import eventsLiberary from '@/core/EventsLiberary.js'

export default ({
  components:{Panel},
	setup() {
    eventsLiberary.init()
    const born = ref(false)
    const living = ref(true)
    const autoNext = ref(false)
    const actionEdit = ref(false)
    const timeHandler = ref()
    const yourLife = ref(null)
    const mobile = document.body.clientWidth < 800
    const bodyInfo = reactive({
      title: "身体",
      basicInfo: [],
      listInfo: [],
      events: null
    })
    const familyInfo = reactive({
      title: "家庭",
      basicInfo: [],
      listInfo: [],
      events: null
    })
    const intercourseInfo = reactive({
      title: "社交",
      basicInfo: [],
      listInfo: [],
      events: null
    })
    const studyInfo = reactive({
      title: "学业",
      basicInfo: [],
      listInfo: [],
      events: null
    })

    const router = useRouter()

    let initScore = JSON.parse(localStorage.getItem("initScore"));
    yourLife.value = initYourLife(initScore)

    onMounted(()=>{
      refreshBasicInfo()
    })

    const refreshBasicInfo = ()=>{
      refreshBody()
      refreshFamily()
      refreshIntercourse()
      refreshStudy()
    }
    const refreshBody = ()=>{
      let body = yourLife.value.body
      bodyInfo.basicInfo = [
        `体质${body.consititution}`,
        `智力${body.intelligence}`,
        `外貌${body.appearance}`,
        `健康${body.healthy}`,
        body.sex,
        `年龄${Math.floor(body.month/12)}.${body.month%12}`
      ]
      let listInfo = []
      for( let e of body.illness.disease ){
        listInfo.push([e.title])
      }
      bodyInfo.listInfo = listInfo
      bodyInfo.events = eventsLiberary.classification.body
    }
    const refreshFamily = ()=>{
      let family = yourLife.value.family
      familyInfo.basicInfo = [
        `流动资产${family.state.wealthy}`
      ]
      let listInfo = []
      for( let e of family.families ){
        listInfo.push([e.surname+e.givenName, e.character])
      }
      familyInfo.listInfo = listInfo
      familyInfo.events = eventsLiberary.classification.family
    }
    const refreshIntercourse = ()=>{
      let intercourse = yourLife.value.intercourse
      let name = yourLife.value.surname+yourLife.value.givenName
      intercourseInfo.basicInfo = [
        name ? `姓名：${name}`:"未命名"
      ]
      let listInfo = []
      for( let e of intercourse.relationships ){
        listInfo.push([e.target,e.type,e.targetSex])
      }
      intercourseInfo.listInfo = listInfo
      intercourseInfo.events = eventsLiberary.classification.intercourse
    }
    const refreshStudy = ()=>{
      let study = yourLife.value.study
      studyInfo.basicInfo = [
        `知识水平${study.knowledge}`,
        `成绩排名(省):前${study.ranking}%`
      ]
      studyInfo.events = eventsLiberary.classification.study
    }

    const restart = ()=>{
      eventsLiberary.init()
      router.push("/")
    }
    const getBorn = ()=>{
      born.value = true
      yourLife.value.yourBorn()
      refreshBasicInfo()
    }
		const stepMonth = ()=>{
      let yl = yourLife.value
      yl.stepMonth()
			if(yl.living()){
      }
      else{ //you died
        living.value = false
        autoStep()
      }
      refreshBasicInfo()
		}
    const setActionStrategy = ( actionStrategy )=>{
      yourLife.value.actionStrategy = actionStrategy
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
      getBorn,
			stepMonth,
      autoStep,
      autoNext,
      born,
      living,
      mobile,
      router,
      restart,
      actionEdit,
      setActionStrategy,
      bodyInfo,
      familyInfo,
      intercourseInfo,
      studyInfo
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
    width: 120px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
    button{
      height: 60px;
      width: 60px;
      border-radius: 50%;
    }
  }
  .edit-board{
    position: fixed;
    width: 150px;
    height: 150px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    button{
      width: 50%;
      height: 50%;
    }
    .actived{
      border: inset;
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
  .actived{
    color: blue;
  }
}
.girl{
  .window{
    box-shadow: 0 0 3px 0 red;
  }
  button{
    box-shadow: 0 0 3px 0 red;
  }
  .actived{
    color: red;
  }
}

.mobile{
  position: fixed;
  overflow-y: auto;
  height: 80%;
  .window{
    width: 90%;
    height: 40%;
    margin: 5px;
    padding: 5px;
  }
  .buttons{
    position: fixed;
    height: 70px;
    width: 100%;
    left: 0;
    top: auto;
    bottom: 0;
    transform: none;
  }
}
</style>