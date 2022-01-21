<template>
  <div>
    <div class="button-bar" v-if="shown">
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
    <div v-if="!shown" class="button-bar-hidden">
      <img src="@/assets/pullOut.svg" @click="shown=true" />
    </div>
  </div>
</template>

<script>
import { ref,reactive,inject } from 'vue'
import { useRouter } from 'vue-router'
export default {
  props: [],
  setup() {
    const shown = ref(true)
    const refreshBasicInfo = ()=>{}
    //const { buttonList,secondButtonList,clickButton,secondButtonActived } = buttons(state,state.yourLife,refreshBasicInfo)
    const refreshState = ()=>{
      
    }
    return {
      shown,
      state,
      buttonList,
      secondButtonList,
      clickButton,
      secondButtonActived
    }
  },
}

function buttons(state,life,refreshBasicInfo) {
  const router = useRouter()
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
      show: (state) => {
        return state.born == false
      }
    },{
      name: "进入次月",
      func: stepMonth,
      show: false
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
.button-bar-hidden {
  height: 50px;
  img {
    height: 100%;

  }
}
</style>