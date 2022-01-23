<template>
  <div class="see-characters">
    <character-panel v-for="(e,i) in characters" :key="i" :data='e'></character-panel>
  </div>
</template>

<script>
import { GAME } from '@/core/apiForView/theGame.js'
import { inject } from 'vue'
import CharacterPanel from './components/CharacterPanel.vue'

export default {
  components: {
    CharacterPanel
  },
  setup() {
    const game = inject('game').value
    const characters = game.society.characters
    return {
      game,
      characters,
      GAME
    }
  }, 
}
</script>
<style lang="less" scoped>
.see-characters {

}
</style>