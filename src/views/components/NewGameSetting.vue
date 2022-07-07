<template>
  <div class="board-in-mask">
    <div class="title">参数自定义与确认</div>
      <div v-for="(e,i) in Object.keys(config)" :key="i" class="cell">
      {{e}}: 
      <button class="less-more" @click="setting(e,-1)">&lt;</button>
      {{config[e]}}
      <button class="less-more" @click="setting(e,1)">&gt;</button>
    </div>
    <button @click="newGame(config)">创建世界</button>
  </div>  
</template>

<script>
import { reactive, inject } from 'vue'
export default {
  setup() {
    const config = reactive({
      "快进到某年": 1,
      "初始角色数": 10
    })
    const setting = (e, num)=>{
      config[e] += num
      if (config[e]<0 || config[e]>20) {
        config[e] -= num
      }
    }
    return {
      config,
      newGame: inject("newGame"),
      setting
    }
  },
}
</script>
<style lang="less" scoped>
.board-in-mask {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>