<template>
  <div class="title">{{you.surname+you.givenName}}的记忆</div>
  <div class="memory-list">
    <div v-for="(e,i) in you.memory" :key="i">{{GameWorld.parseMemory(you,e)}}</div>
  </div>
</template>
<script>
import { inject } from 'vue'
export default {
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
.memory-list {
  div {
    font-size: 12px;
    color: #999;
  }
}
</style>