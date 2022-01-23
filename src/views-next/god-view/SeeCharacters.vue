<template>
  <div>
    <div v-for="(e,i) in characters" :key="i">{{e.surname+e.givenName}} {{e.body.survived_month}}</div>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  setup() {
    const game = inject('game').value
    const characters = game.society.characters
    return {
      characters
    }
  }, 
}
</script>