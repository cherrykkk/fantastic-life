<template>
  <div class="page">
    <div class="title">配置</div>
    <div v-for="(e,i) in Object.keys(config)" :key="i" class="cell">
      {{e}}: 
      <button class="less-more" @click="setting(e,-1)">&lt;</button>
      {{config[e]}}
      <button class="less-more" @click="setting(e,1)">&gt;</button>
    </div>
    <div @click="saveChange(config)">确定修改</div>
  </div>
</template>

<script>
import { reactive, inject } from 'vue'
export default {
  setup() {
    const config = reactive({
      "游戏速度": 3
    })
    const Manager = inject("Manager").value
    const showSystemMessage = inject("showSystemMessage")
    const toUrl = inject("toUrl")
    const saveChange = ()=>{
      Manager.saveChange(config)
      showSystemMessage("已修改配置")
      toUrl('./player-view')
    }
    return {
      config,
      setting: (e, num)=>{
        config[e] += num
        if( config[e]<1 || config[e]>10) {
          config[e] -= num
        }
      },
      saveChange
    }
  },
}
</script>

<style lang="less" scoped>
.page {
  div {
    margin: 30px;
  }
  .title {
    font-size: 40px;
  }
  .cell {
    font-size: 30px;
    display: flex;
    justify-content: space-around;
  }
}
</style>