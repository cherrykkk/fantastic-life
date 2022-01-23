<template>
  <div v-if="!globalState.gameLoaded">加载中 </div>
  <layout v-if="globalState.gameLoaded"></layout>
</template>

<script>
import { ref, reactive, provide } from 'vue'
import Layout from '@/layout/Index'
import { GAME } from '@/core/apiForView/theGame.js'

export default{
  components:{
    Layout
  },
  setup() {
    const game = ref(GAME.newGame())
    const globalState = reactive({
      gameLoaded: false
    })
    game.value.then((_game)=>{
      game.value = _game
      globalState.gameLoaded = true
    })

    provide("globalState",globalState)
    provide("game",game)

    return {
      globalState
    }
  }
}

</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
