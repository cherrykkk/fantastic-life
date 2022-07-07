<!--调试模式-->
<template>
  <div v-for="(e,i) in Manager.World.characters" :key="i" @click="changeMainCharacter(e)">
    {{e.name}}
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  setup() {
    const Manager = inject("Manager").value
    const toUrl = inject("toUrl")
    const changeMainCharacter = (character)=>{
      Manager.setYou(character)
      toUrl('personal-view')
    }
    return {
      Manager,
      changeMainCharacter
    }
  },
}
</script>

<style lang="less" scoped>
.router-nav {
  display: flex;
  flex-direction: column;
}
.router-view {
  padding-left: 120px;
}
</style>