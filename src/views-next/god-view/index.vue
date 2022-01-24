<!--调试模式-->
<template>
  <div class="nav-bar">
    <button @click="nextMonth(1)">nextMonth</button>
    <button @click="nextMonth(12)">nextYear</button>
    <div>上次操作花费时间(ms){{lastOperaterTime}}</div>
    <div class="nav">
      <router-link :to="{name:'characters'}">角色信息</router-link>
    </div>
  </div>
  <div class="router-view">
    <router-view></router-view>
  </div>
</template>

<script>
import { inject, ref } from 'vue'
export default {
  setup() {
    const GameWorld = inject("GameWorld").value
    const lastOperaterTime = ref( 0 )
    const nextMonth = (time)=>{   
      const t1 = Date.now()
      for( let i = 0 ; i < time ; i++ ) 
        GameWorld.aMonthGoBy()
      const t2 = Date.now() 
      lastOperaterTime.value = t2-t1
    }
    return {
      lastOperaterTime,
      nextMonth
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
.router-view {
  padding-left: 120px;
}
</style>