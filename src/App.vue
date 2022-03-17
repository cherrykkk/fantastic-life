<template>
  <div v-if="Manager.fastRunning">
    世界运行中... <br>
    当前
    <div v-if="Manager.GameWorld">
      {{Manager.GameWorld.calendar.year}}年
      {{Manager.GameWorld.calendar.month}}月
    </div>
    目标
    <div v-if="Manager.GameWorld">
      {{Manager.GameWorld.config.yearsBeforeBorn+Manager.GameWorld.config.toAge}}年
    </div>
  </div>
  <layout v-if="!Manager.fastRunning"></layout>
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
      archiveChosen: false,
      systemMessage: null,
      maskLayer: false
    })
    const router = useRouter()
    router.replace("/menu")

    const _loadArchive = function (archiveName) {
      console.log("正在加载存档")
      const archive = JSON.parse(localStorage.getItem(archiveName))
      Manager.value.loadArchive(archive.GameWorld)
      router.replace("/player-view")
    }

    function saveArchive () {
      const archive = Manager.value.makeArchive()
      const archiveList = JSON.parse(localStorage.getItem('archiveList')) || []
      const i = archiveList.indexOf(archive.name)
      if (i>=0)
        archiveList.splice(i,1)
      archiveList.push(archive.name)

      localStorage.setItem("archiveList",JSON.stringify(archiveList))
      localStorage.setItem(archive.name,JSON.stringify(archive))
      showSystemMessage('已存档')
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
    provide("showSystemMessage",showSystemMessage)
    provide("toUrl",(url)=>{
      router.replace(url)
    })


    return {
      globalState,
      Manager
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
