<template>
	<div class="page" :class="[{mobile:state.mobileView},yourLife.body.sex=='男' ? 'boy':'girl']">
    <panel class="panel" :info="bodyInfo"></panel>
    <panel class="panel" :info="familyInfo"></panel>
    <panel class="panel" :info="intercourseInfo"></panel>
    <panel class="panel" :info="studyInfo"></panel>
    <div class="button-bar">
      <div class="main-button-bar">
        <div v-for="(e,i) in buttonList" :key="i">
          <button v-if="e.show" @click="clickButton(e)">{{e.name}}</button>
        </div>
      </div>
      <div v-if="state.actionEdit" class="second-button-bar">
        <button @click="state.actionEdit=false">返回</button>
        <template v-for="(e,i) in secondButtonList" :key="i">
          <button @click="clickButton(e)" :class="{actived:secondButtonActived==e.name}">{{e.name}}</button>
        </template>
        <!-- <button @click="setActionStrategy('运动')" :class="{actived:yourLife.actionStrategy=='运动'}">运动</button>
        <button @click="setActionStrategy('交际')" :class="{actived:yourLife.actionStrategy=='交际'}">交际</button>
        <button @click="setActionStrategy('学习')" :class="{actived:yourLife.actionStrategy=='学习'}">学习</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref,reactive,onMounted} from 'vue'
import { useRouter } from 'vue-router'
import Panel from './Panel'
import initYourLife from '@/core/apiForView/index.js'
import { lifeCycle } from '@/core/Life.js'

export default ({
  components:{Panel},
	setup() {
    const state = reactive({
      born: false,
      living: true,
      mobileView: document.body.clientWidth < 800,
      autoNext: false,
      actionEdit: false
    })

    let initScore = JSON.parse(localStorage.getItem("initScore"));
    const { yourLife,eventsLiberary } = initYourLife(initScore)
    const {  bodyInfo,familyInfo,intercourseInfo,studyInfo,refreshBasicInfo } = refreshView(eventsLiberary)
    const { buttonList,secondButtonList,clickButton,secondButtonActived } = buttons(state,yourLife,refreshBasicInfo)

    onMounted(()=>{
      refreshBasicInfo(yourLife)
    })
		return {
			yourLife,
      bodyInfo,
      familyInfo,
      intercourseInfo,
      studyInfo,
      state,
      buttonList,
      secondButtonList,
      clickButton,
      secondButtonActived
		}
	},
})

function refreshView(eventsLiberary) {
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
  const refreshBody = (life)=>{
    const { body } = life
    const { state } = body
    bodyInfo.basicInfo = [
      `体质${state.consititution}`,
      `智力${state.intelligence}`,
      `外貌${state.appearance}`,
      `健康${body.healthy}`,
      body.sex,
      `年龄${Math.floor(body.month/12)}.${body.month%12}`
    ]
    let listInfo = []
    for( let e of body.diseaseOnset ){
      listInfo.push([e.name])
    }
    bodyInfo.listInfo = listInfo
    bodyInfo.events = eventsLiberary.classification.body
  }
  const refreshFamily = (life)=>{
    const { family } = life
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
  const refreshIntercourse = (life)=>{
    const { intercourse,surname,givenName } = life
    let name = surname + givenName
    intercourseInfo.basicInfo = [
      name ? `姓名：${name}`:"未命名"
    ]
    let listInfo = []
    for( let e of intercourse.relationships ){
      listInfo.push([e.target.name(),e.type,e.target.sex])
    }
    intercourseInfo.listInfo = listInfo
    intercourseInfo.events = eventsLiberary.classification.intercourse
  }
  const refreshStudy = (life)=>{
    const { study } = life
    studyInfo.basicInfo = [
      `知识水平${study.knowledge}`,
      `成绩排名(省):前${study.ranking}%`
    ]
    studyInfo.events = eventsLiberary.classification.study
  }
  
  const refreshBasicInfo = (life)=>{
    refreshBody(life)
    refreshFamily(life)
    refreshIntercourse(life)
    refreshStudy(life)
  }

  return {
    bodyInfo,
    familyInfo,
    intercourseInfo,
    studyInfo,
    refreshBasicInfo
  }
}

function buttons(state,life,refreshBasicInfo) {
  const router = useRouter()
  const timeHandler = ref()
  const clickButton = (buttonObject)=>{
    const { func,args,closeButton,openButton } = buttonObject
    func(args)
    switchButtonByName(false,closeButton)
    switchButtonByName(true,openButton)
  }
  const stepMonth = ()=>{
    lifeCycle.grow(life)
    const { state } = life
    if( !state.living ) {
      state.living = false
      switchButtonByName(false,["进入次月","火箭人生","自动运行","主要行动","暂停自动"])
      switchButtonByName(true,"你死了，重新开始")
      autoStep()
    }
    refreshBasicInfo(life)
  }
  const autoStep = (time)=>{
    if(state.autoNext){
      clearTimeout(timeHandler.value)
    }
    else{
      timeHandler.value = setInterval(()=>{
        stepMonth()
      },time)
    }
    state.autoNext = !state.autoNext
  }
  const switchButtonByName = (status,nameList)=>{
    if( typeof nameList === "string"){
      const name = nameList
      const button = buttonList.find((item)=>{
        return item.name === name
      }) 
      button.show = status
    }
    else if( Array.isArray(nameList) ) {
      for(const e of nameList) {
        const button = buttonList.find((item)=>{
          return item.name === e
        })
        button.show = status
      }
    }
  }
  const buttonList = reactive([
    {
      name: "降生吧！",
      func: ()=>{
        state.born = true
        lifeCycle.born(life)
        refreshBasicInfo(life)
      },
      closeButton: "降生吧！",
      openButton: ["进入次月","火箭人生","自动运行","主要行动"],
      show: true
    },{
      name: "进入次月",
      func: stepMonth,
      show: false
    },{
      name: "火箭人生",
      func: autoStep,
      args: 50,
      show: false,
      closeButton: ["进入次月","火箭人生","自动运行"],
      openButton: ["暂停自动"]
    },{
      name: "自动运行",
      func: autoStep,
      args: 500,
      show: false,
      closeButton: ["进入次月","火箭人生","自动运行"],
      openButton: ["暂停自动"]
    },{
      name: "暂停自动",
      func: autoStep,
      show: false,
      closeButton: ["暂停自动"],
      openButton: ["进入次月","火箭人生","自动运行"]
    },{
      name: "主要行动",
      func: ()=>{
        state.actionEdit = true
      },
      show: false
    },{
      name: "你死了，重新开始",
      func: ()=>{
        router.push("/")
      },
      show: false
    }
  ])

  const secondButtonActived = ref(null)
  console.log(secondButtonActived)
  const setActionStrategy = ( actionStrategy )=>{
    life.actionStrategy = actionStrategy
    secondButtonActived.value = actionStrategy
  }
  const secondButtonList = reactive([
    {
      name: "运动",
      func: setActionStrategy,
      args: "运动"
    },{
      name: "交际",
      func: setActionStrategy,
      args: "交际"
    },{
      name: "学习",
      func: setActionStrategy,
      args: "学习"
    }
  ])
  return {
    buttonList,
    secondButtonList,
    secondButtonActived,
    clickButton
  }
}

</script>

<style lang="less" scoped>
.page{
  position: fixed;
  height: 100%;
  width: 100%;
  .button-bar {
      .main-button-bar {
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
    .second-button-bar {
      position: fixed;
      width: 150px;
      height: 150px;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      button {
        width: 50%;
        height: 50%;
      }
      .actived{
        border: inset;
      }
    }
  }
  .body{
    width: 200px;
  }
  .panel{
    float: left;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 3px 0 black;
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
    width: 45%;
    height: 40%;
  }
}

.boy{
  .panel{
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
  .panel{
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
  .panel {
    width: 80%;
  }
  .button-bar {
    .main-button-bar{
      position: fixed;
      height: 70px;
      width: 100%;
      left: 0;
      top: auto;
      bottom: 0;
      transform: none;
    }
  }
}
</style>