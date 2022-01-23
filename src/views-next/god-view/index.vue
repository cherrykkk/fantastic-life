<!--调试模式-->
<template>
  <button @click="nextMonth(1)">nextMonth</button>
  <button @click="nextMonth(12)">nextYear</button>
  <div class="nav">
    <router-link :to="{name:'characters'}">角色信息</router-link>
  </div>
  <!-- <router-view></router-view> -->
</template>

<script>
import { inject } from 'vue'
import { GAME } from '@/core/apiForView/theGame.js'
export default {
  setup() {
    const game = inject("game").value
    const nextMonth = (time)=>{   
      for(let i = 0 ;i<time;i++) 
        GAME.monthGame(game) 
    }
    
    return {
      nextMonth
    }
  },
}


</script>