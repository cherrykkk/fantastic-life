<template>
  <div class="view">
    <div>{{you}}
    </div>
    <character-panel  :data='you'></character-panel>
  </div>
  <div class="button-board">
    <button class="next-month" @click="saveArchive(GameWorld)">存档</button>
    <button class="next-month" @click="GameWorld.aMonthGoBy()">次月</button>
  </div>
  <div class="router-board">
    <router-link to='/Livelihood'>能力</router-link>
    <router-link to='/memory'>记忆</router-link>
    <router-link to='/relationship'>人际关系</router-link>
  </div>
</template>

<script>
import { ref, inject } from 'vue'
import characterPanel from './components/CharacterPanel'
export default {
  components: {
    characterPanel
  },
  setup() {
    const GameWorld = inject("GameWorld").value
    const saveArchive = inject('saveArchive')
    const you = GameWorld.getCharacterById(GameWorld.theMainCharacterId)
    return {
      GameWorld,
      you,
      saveArchive
    }
  },
}
    

</script>
<style lang="less" scoped>
.view {
  margin: 40px 0;
}
.button-board {
  position: fixed;
  bottom: 20px;
  cursor: pointer;
}
.router-board {
  position: fixed;
  bottom: 100px;
  cursor: pointer;
  a {
    border: 1px blue solid;
    border-radius: 5px;
    padding: 10px;
    background-color: white;
  }
}
</style>