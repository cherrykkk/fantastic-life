<template>
  <div class="title">三千小世界</div>
  <div class="menu-list">
    <div @click="continueGame()" v-if="archiveList.length > 0">继续游戏</div>
    <div @click="checkArgs()">新游戏</div>
    <div @click="state.openArchive=true">查看存档</div>
  </div>
  <div v-if="state.openArchive" class="archive-board">
    <div v-for="(e,i) in archiveList" :key="i">
      {{e}}
      <button @click="loadArchive(e)">加载</button>
    </div>
    <div class="button-board">
      <button @click="clearAllLocalStorage">删除所有存档</button>
      <button @click="state.openArchive=false">关闭</button>
    </div>
  </div>
</template>
<script>
import { inject, reactive } from 'vue'
export default {
  setup() {
    const archiveList = JSON.parse(localStorage.getItem('archiveList')) || {}
    const state = reactive({
      openArchive: false
    })
    const loadArchive = inject("loadArchive")
    const checkArgs = ()=>{
      globalState.maskLayer = true
    }
    const globalState = inject("globalState")
    Object.assign(globalState,{
      archiveChosen: false,
      systemMessage: null,
    })
    const continueGame = function() {
      loadArchive(archiveList.pop())
    }
    const clearAllLocalStorage = function() {
      localStorage.clear()
      location.reload()
    }
    return {
      state,
      archiveList,
      loadArchive,
      continueGame,
      clearAllLocalStorage,
      globalState,
      checkArgs
    }
  },
}
</script>
<style lang="less" scoped>
.title {
  font-size: 50px;
  margin: 50px;
}
.menu-list {
  div {
    font-size: 20px;
    color: #333;
    margin: 20px;
    padding: 20px;
    border: double 5px green;
  }
}
.archive-board {
  position: absolute;
  top: 0;
  width: 80%;
  height: 80%;
  margin: 10%;
  border: ridge 5px green;
  background-color: #f4fff4;
  overflow: hidden;
  .button-board {
    position: absolute;
    bottom: 20px;
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
}
</style>