<template>
	<div class="page" :class="[{mobile:state.mobileView},state.sex=='男' ? 'boy':'girl']">
    <panel class="panel" :info="bodyInfo" nextUrl="/yourLife/body" @click="seeMore('/yourLife/body')"></panel>
    <panel class="panel" :info="familyInfo" nextUrl="/yourLife/family" @click="seeMore('/yourLife/family')"></panel>
    <panel class="panel" :info="intercourseInfo" nextUrl="/yourLife/intercourse" @click="seeMore('/yourLife/intercourse')"></panel>
    <panel class="panel" :info="studyInfo" nextUrl="/yourLife/career" @click="seeMore('/yourLife/career')"></panel>
    <message class="message-panel" :eventsLiberary="yourLife.eventsLiberary"></message>
    <normal-button :theLife="yourLife" class="button-panel"></normal-button>
  </div>
</template>

<script>
import { ref,reactive,onMounted,inject,watch } from 'vue'
import { useRouter } from 'vue-router'
import Panel from './Panel'
import Message from './Message.vue'
import NormalButton from '../handle/NormalButton.vue'

export default ({
  components:{Panel,Message,NormalButton},
	setup() {
    const state = reactive({
      born: false,
      living: true,
      mobileView: document.body.clientWidth < 800,
      autoNext: false,
      actionEdit: false,
      sex: "男"
    })

    const yourLife = inject("getCurrentLife")()
    console.log(yourLife.eventsLiberary)
    const { bodyInfo,intercourseInfo,studyInfo,familyInfo,refreshBasicInfo } = refreshView()

    onMounted(()=>{
      console.log("开启")
      refreshBasicInfo(yourLife)
      setInterval(()=>{
        refreshBasicInfo(yourLife)
      },500)
    })

    const router = useRouter()
    const seeMore = (url)=>{
      router.push(url)
    }

		return {
			yourLife,
      bodyInfo,
      intercourseInfo,
      studyInfo,
      familyInfo,
      state,
      seeMore,
      refreshBasicInfo
		}
	},
})

function refreshView() {
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
  const refreshFamily = (life) =>{ }
  const refreshBody = (life)=>{
    const { body } = life
    const { state } = body
    bodyInfo.basicInfo = [
      `体质${state.consititution}`,
      `智力${state.intelligence}`,
      `外貌${state.appearance}`,
      `健康${state.healthy}`,
      state.sex,
      `年龄${Math.floor(state.month/12)}.${state.month%12}`
    ]
    let listInfo = []
    for( let e of body.diseaseOnset ){
      listInfo.push([e.name])
    }
    bodyInfo.listInfo = listInfo
  }
  const refreshIntercourse = (life)=>{
    const { intercourse,surname,givenName } = life
    let name = surname + givenName
    intercourseInfo.basicInfo = [
      name ? `姓名：${name}`:"未命名"
    ]
  }
  const refreshStudy = (life)=>{
    const { study } = life
    studyInfo.basicInfo = [
      `知识水平${study.knowledge}`,
      `成绩排名(省):前${study.ranking}%`
    ]
  }
  
  const refreshBasicInfo = (life)=>{
    refreshBody(life)
    refreshFamily(life)
    refreshIntercourse(life)
    refreshStudy(life)
  }
  return {
    bodyInfo,
    intercourseInfo,
    studyInfo,
    familyInfo,
    refreshBasicInfo
  }
}

</script>

<style lang="less" scoped>
.page{
  position: fixed;
  height: 100%;
  width: 100%;
  .button-panel {
    position: absolute;
    bottom: 0;
  }
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
  .body {
    width: 200px;
  }
  .panel {
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
  .message-panel {
    float: left;
    height: 30%;
  }
}

.boy {
  .panel {
    box-shadow: 0 0 3px 0 blue;
  }
  .message {
    box-shadow: 0 0 3px 0 blue;
  }
  button {
    box-shadow: 0 0 3px 0 blue;
  }
  .actived {
    color: blue;
  }
}
.girl {
  .panel {
    box-shadow: 0 0 3px 0 red;
    width: 90%;
    height: 10%;
  }
  .message {
    box-shadow: 0 0 3px 0 blue;
  }
  button {
    box-shadow: 0 0 3px 0 red;
  }
  .actived {
    color: red;
  }
}

.mobile {
  position: fixed;
  overflow-y: auto;
  height: 80%;
  .panel {
    width: 80%;
    height: 10%;
  }
  .message {

  }
  .button-bar {
    .main-button-bar {
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