<template>
  <div class="skill-board">
    <div class="name">{{chosen[1]}}</div>
    <div class="level">当前水平
      <div>{{Manager.you.skills[chosen[0]]}}</div>
    </div>
    <div @click="toUrl(chosen[2])">进入</div>
  </div>
  <div class="skill-list">
    <div :class='{"skill-card":1,"chosen-skill-card":chosen[0]==e[0]}' v-for="(e,i) in list" :key="i" @click="chosen=e">
      <div class="skill-name">{{e[1]}}</div>
      <div class="skill-level">{{Manager.you.skills[e[0]]}}</div>
    </div>
  </div>
</template>
<script>
import { inject, ref } from 'vue'
export default {
  setup() {
    const list = [
      ['herbology','草药学','/game'],
      // ['flySword','御剑','/game2'],
      ['medicine','医术',''],
      ['farm','种植','/gameFarm'],
      ['hunt','狩猎','/gameHunt']
    ]
    return {
      Manager: inject("Manager").value,
      list,
      chosen: ref(list[0]),
      toUrl: inject('toUrl')
    }
  },
}
</script>

<style lang="less" scoped>
@color: red;
.skill-board {
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .name {
    font-size: 30px;
  }
  .level {
    color: #333;
    div {
      font-size: 30px;
    }
  }
}
.skill-list {
  position: absolute;
  bottom: 100px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  .skill-card {
    width: 80px;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    border: 2px solid black;
    border-radius: 50%;
  }
  .chosen-skill-card {
    border: 2px inset grey;
    color: white;
    background-color: black;
  }
}
</style>