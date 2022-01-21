<template>
  <div class="button-bar">
    <div v-for="(e,i) in currentButtonState" :key="i" @click="buttonList.find(item=>item.name==e).func()">
      {{e}}
    </div>
  </div>
</template>

<script>
import { ref,reactive,inject } from 'vue'
import { useRouter } from 'vue-router'
export default {
  props: ["theLife"],
  setup(props) {
    const theLife = props.theLife
    const { buttonList,clickButton } = buttons(theLife)
    const currentButtonState = buttonState.origin
    return {
      buttonList,
      clickButton,
      currentButtonState
    }
  },
}
const buttonState = {
  "origin": ["进入次月","活动"],
  "next": ["运动","交际","学习"],
  "end": ["重新开始"]
}

function buttons(life) {
  const router = useRouter()
  const clickButton = (buttonObject)=>{
    const { func,args } = buttonObject
    func(args)
  }
  const setActionStrategy = ( actionStrategy )=>{
    life.actionStrategy = actionStrategy
    secondButtonActived.value = actionStrategy
  }
  const buttonList = reactive([
    {
      name: "降生吧！",
      func: life.lifeCycle.born
    },{
      name: "进入次月",
      func: life.lifeCycle.grow
    },{
      name: "主要行动",
      func: ()=>{
      },
    },{
      name: "重新开始",
      func: ()=>{
        router.push("/")
      }
    },{
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
    clickButton
  }
}

</script>

<style lang="less" scoped>
.button-bar {
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    width: 80px;
    background-color: rgba(200,200,200);
    border-radius: 20px;
 }
}
</style>