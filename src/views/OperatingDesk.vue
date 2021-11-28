<template>
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
</template>

<script>
export default {
  props: [
    "buttonList"
  ],
  setup() {
    
    
  },
}
</script>

<style lang="less" scoped>
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
</style>