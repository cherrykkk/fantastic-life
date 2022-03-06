<template>
  <div v-if="!globalState.gameLoaded">加载中 </div>
  <layout v-if="globalState.gameLoaded"></layout>
  <div v-if="globalState.systemMessage" class="system-message">
    {{globalState.systemMessage}}
  </div>
</template>

<script>
import { ref, reactive, provide } from 'vue'
import { useRouter } from 'vue-router'
import Layout from '@/layout/Index'
import { GameManager } from '@/core/GameManager.js'
export default{
  components:{
    Layout
  },
  setup() {
    const Manager = ref(new GameManager()) //这里不用 ref， 则子组件不能监听内部变化 （为什么）
    const globalState = reactive({
      gameLoaded: true,
      archiveChosen: false,
      systemMessage: null,
    })
    const router = useRouter()
    //router.push("/menu")

    const newGame = function () {
      globalState.gameLoaded = false
      Manager.value.newGame().then(()=>{
        globalState.gameLoaded = true
        router.push("/player-view")
      })
    }
    const _loadArchive = function (archive) {
      console.log("正在加载存档")
      console.log(Manager.value)
      Manager.value.loadArchive(archive)
      router.push("/player-view")
    }

    function saveArchive () {
      const archive = Manager.value.makeArchive()
      localStorage.setItem("archive",archive)
      console.log("已存档")
    }

    const showSystemMessage = function (message) {
      globalState.systemMessage = message
      setTimeout(()=>{
        globalState.systemMessage = null
      },1000)
    }

    provide("globalState",globalState)
    provide("Manager",Manager)
    provide("loadArchive",_loadArchive)
    provide("saveArchive",saveArchive)
    provide("newGame",newGame)
    provide("showSystemMessage",showSystemMessage)

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

.system-message {
  position: absolute;
  color: red;
  border: 1px red solid;
  border-radius: 2px;
  padding: 5px;
}
</style>
