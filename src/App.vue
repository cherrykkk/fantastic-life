<template>
  <div v-if="!globalState.gameLoaded">加载中 </div>
  <layout v-if="globalState.gameLoaded"></layout>
</template>

<script>
import { ref, reactive, provide } from 'vue'
import Layout from '@/layout/Index'
import World from '@/core/index.js'

export default{
  components:{
    Layout
  },
  setup() {
    const GameWorld = ref(new World()) //这里不用 ref， 则子组件不能监听内部变化 （为什么）
    const globalState = reactive({
      gameLoaded: false
    })
    GameWorld.value.newGame().then(()=>{
      globalState.gameLoaded = true
    })

    provide("globalState",globalState)
    provide("GameWorld",GameWorld)

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
