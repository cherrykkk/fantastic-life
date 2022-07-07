<!--调试模式-->
<template>
  <div class="nav-bar">
    <div class="router-nav">
      <router-link to="/personal-view">返回玩家界面</router-link>
    </div>
  </div>
  <div v-for="(e,i) in Manager.World.characters" :key="i" @click="changeMainCharacter(e)">
    {{e.name}}
  </div>
</template>

<script>
import { inject, ref } from 'vue'
export default {
  setup() {
    const Manager = inject("Manager").value
    const changeMainCharacter = (character)=>{
      Manager.you = character
    }
    return {
      Manager,
      changeMainCharacter
    }
  },
}
</script>

<style lang="less" scoped>
.nav-bar {
  position: fixed;
  width: 100px;
  height: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.router-nav {
  display: flex;
  flex-direction: column;
}
.router-view {
  padding-left: 120px;
}
</style>