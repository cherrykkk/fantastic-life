<template>
  <div v-if="you.newMemory" class="story-talker">
    <div class="story-text">{{you.getNewMemory()}}</div>
    <div class="check-button" @click="pauseGame()">暂停</div>
    <div class="check-button" @click="continueGame()">继续</div>
  </div>
</template>
<script>
import { inject, watch } from 'vue'
export default {
  setup() {
    const globalState = inject('globalState')
    const you = inject('Manager').value.you
    const Manager = inject('Manager').value
    you.onNewMemory = () => {
      console.log('new memroy')
      Manager.stop()
    }
    const pauseGame = () => {
      you.newMemory = false
    }
    const continueGame = () => {
      you.newMemory = false
      Manager.play()
    }
    return {
      globalState,
      you,
      continueGame,
      pauseGame
    }
  },
}
</script>
<style lang="less" scoped>
.story-talker {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(200,200,200,1);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .story-text {
    font-size: 30px;
    margin: 20px;
  }
  .check-button {
    font-size: 40px;
    margin: 40px;
    border: 1px solid black;
    border-radius: 20px;
    padding: 10px;
  }
}
</style>