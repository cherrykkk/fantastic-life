<template>
  <div class="page view-page">
    <div class="title">配置</div>
    <div v-for="(e,i) in Object.keys(config)" :key="i" class="cell">
      {{e}}: 
      <button class="less-more" @click="setting(e,-1)">&lt;</button>
      {{config[e]}}
      <button class="less-more" @click="setting(e,1)">&gt;</button>
    </div>
    <button @click="saveChange(config)">确定修改</button><br>
    <button @click="saveArchive(Manager)">存档</button><br>
    <button @click="toUrl('god-view')">切换主角(夺舍？)</button>
  </div>
</template>

<script>
import { reactive, inject } from 'vue'
export default {
  setup() {
    const Manager = inject("Manager").value
    const config = reactive({
      "游戏速度": Manager.World.config['游戏速度'],
      '记忆展示顺序': Manager.World.config['记忆展示顺序'] || '逆序'
    })
    const showSystemMessage = inject("showSystemMessage")
    const toUrl = inject("toUrl")
    const saveChange = ()=>{
      Object.assign(Manager.World.config, config)
      showSystemMessage("已修改配置")
      Manager.play()
      toUrl('./personal-view')
    }
    return {
      config,
      toUrl,
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