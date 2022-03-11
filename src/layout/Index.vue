<template>
  <div class="layout">
    <div v-if="Manager.GameWorld">
      {{Manager.GameWorld.calendar.year}}年
      {{Manager.GameWorld.calendar.month}}月
      {{Manager.GameWorld.calendar.date}}日</div>
    <router-view/>
    <div class="button-board" v-if="Manager.GameWorld">
      <div @click="toUrl('/setting')">设置</div>
      <div @click="saveArchive(Manager)">存档</div>
      <div @click="toUrl('/player-view')">个人</div>
      <div @click="toUrl('/Livelihood')">能力</div>
      <div @click="toUrl('/memory')">记忆</div>
      <div @click="toUrl('/relationship')">社交</div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  name: 'Layout',
  setup(){
    const Manager = inject("Manager").value
    const saveArchive = inject('saveArchive')
    const toUrl = inject('toUrl')
    return {
      Manager,
      saveArchive,
      toUrl
    }
  }
}
</script>

<style lang='less' scoped>
.layout {
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: auto;
  left: 0;
  top: 0;
  .buttons-desk {
    position: fixed;
    bottom: 0;
  }
}

.button-board {
  position: fixed;
  bottom: 5px;
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  div {
    border: 1px grey solid;
    border-radius: 50%;
    padding: 10px;
    background-color: white;
    height: 20px;
    width: 40px;
    line-height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      text-decoration: none;
    }
  }
}
</style>
