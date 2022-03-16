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
    <button @click="saveArchive(Manager)">存档</button>
  </div>
</template>

<script>
import { reactive, inject } from 'vue'
export default {
  setup() {
    const Manager = inject("Manager").value
    const config = reactive({
      "游戏速度": Manager.GameWorld.config['游戏速度'],
      '记忆展示顺序': Manager.GameWorld.config['记忆展示顺序'] || '逆序'
    })
    const showSystemMessage = inject("showSystemMessage")
    const toUrl = inject("toUrl")
    const saveChange = ()=>{
      Object.assign(Manager.GameWorld.config, config)
      console.log(Manager.GameWorld.config)
      Manager.play()
      showSystemMessage("已修改配置")
      toUrl('./player-view')
    }
    return {
      config,
      setting: (e, num)=>{
        if (e=='游戏速度') {
          config[e] += num
          if (config[e]<1 || config[e]>20)
            config[e] -= num
        }
        if (e=='记忆展示顺序') {
          console.log(config[e])
          config[e] = config[e]=='逆序'? '顺序': '逆序'
        }
      },
      saveChange,
      saveArchive:inject('saveArchive')
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