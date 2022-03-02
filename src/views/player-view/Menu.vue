<template>
  <div class="title">三千小世界</div>
  <div class="menu-list">
    <div @click="continueGame()" v-if="archiveList.length > 0">继续游戏</div>
    <div @click="newGame()">新游戏</div>
    <div @click="state.openArchive=true">查看存档</div>
  </div>
  <div v-if="state.openArchive" class="archive-board">
    <div v-for="(e,i) in archiveList" :key="i" @click="loadArchive(e)">{{e.theMainCharacterId}}</div>
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
    const archive = JSON.parse(localStorage.getItem('archive'))
    const archiveList = archive?[archive]:[]
    const state = reactive({
      openArchive: false
    })
    const loadArchive = inject("loadArchive")
    const newGame = inject("newGame")
    const continueGame = function() {
      loadArchive(archive)
    }
    console.log(archiveList)
    const clearAllLocalStorage = function() {
      localStorage.clear()
      location.reload()
    }
    return {
      state,
      archiveList,
      loadArchive,
      newGame,
      continueGame,
      clearAllLocalStorage
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