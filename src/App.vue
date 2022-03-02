<template>
  <div v-if="!globalState.gameLoaded">加载中 </div>
  <layout v-if="globalState.gameLoaded"></layout>
</template>

<script>
import { ref, reactive, provide } from 'vue'
import { useRouter } from 'vue-router'
import Layout from '@/layout/Index'
import World from '@/core/index.js'
import { loadArchive } from '@/core/world/World.js'
const CONFIG = {
  "主角出生前运行年份": 20,
  "无父母降生角色持续年份": 10,
}
export default{
  components:{
    Layout
  },
  setup() {
    const GameWorld = ref(new World()) //这里不用 ref， 则子组件不能监听内部变化 （为什么）
    const globalState = reactive({
      gameLoaded: true,
      archiveChosen: false
    })
    const router = useRouter()
    //router.push("/menu")

    const newGame = function () {
      globalState.gameLoaded = false
      GameWorld.value.newGame().then(()=>{
        globalState.gameLoaded = true
            
        const {'主角出生前运行年份':naturalYear,'无父母降生角色持续年份':noParentYear } = CONFIG
        GameWorld.value.runNaturally(naturalYear,noParentYear)
        const theMainCharacter = GameWorld.value.society.characters[GameWorld.value.society.characters.length-1]
        GameWorld.value.theMainCharacterId = theMainCharacter.cId
        globalState.gameLoaded = true
        router.push("/player-view")
      })
    }
    const _loadArchive = function (archive) {
      console.log("正在加载存档")
      GameWorld.value = loadArchive(archive)
      router.push("/player-view")
    }

    function saveArchive () {
      const archive = GameWorld.value.makeArchive()
      localStorage.setItem("archive",archive)
      console.log("已存档")
    }

    provide("globalState",globalState)
    provide("GameWorld",GameWorld)
    provide("loadArchive",_loadArchive)
    provide("saveArchive",saveArchive)
    provide("newGame",newGame)

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
