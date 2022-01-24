<!--调试模式-->
<template>
  <button @click="nextMonth(1)">nextMonth</button>
  <button @click="nextMonth(12)">nextYear</button>
  <div>上次操作花费时间(ms){{lastOperaterTime}}</div>
  <div class="nav">
    <router-link :to="{name:'characters'}">角色信息</router-link>
  </div>
  <router-view></router-view>
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