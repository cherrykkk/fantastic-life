<template>
  <div class="view">
    <div>{{you}}
    </div>
    <character-panel  :data='you'></character-panel>
    <router-link to='/Livelihood'>能力</router-link>
    <button class="next-month" @click="GameWorld.aMonthGoBy()">次月</button>
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
    const you = GameWorld.getCharacterById(GameWorld.theMainCharacterId)
    return {
      GameWorld,
      you
    }
  },
}
    

</script>
<style lang="less" scoped>
.view {
  margin: 40px 0;
  .next-month {
    position: absolute;
    bottom: 0;
    cursor: pointer;
  }
}
</style>