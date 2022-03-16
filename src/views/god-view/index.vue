<!--调试模式-->
<template>
  <div class="nav-bar">
    <div class="router-nav">
      <!-- <router-link :to="{name:'characters'}">角色信息</router-link>
      <router-link :to="{name:'player-view'}">回用户界面</router-link> -->
      <router-link to="/player-view">返回玩家界面</router-link>
    </div>
  </div>
  <div v-for="(e,i) in Manager.GameWorld.society.characters" :key="i" @click="changeMainCharacter(e)">
    {{Manager.getName(e)}}
  </div>
  <!-- <div class="router-view">
    <router-view></router-view>
  </div> -->
</template>

<script>
import { inject, ref } from 'vue'
export default {
  setup() {
    const Manager = inject("Manager").value
    const changeMainCharacter = (character)=>{
      console.log(Manager)
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