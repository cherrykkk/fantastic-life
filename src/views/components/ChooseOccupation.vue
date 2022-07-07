<template>
  <div class="board">
    <div v-for="(e,i) in Manager.主专职信息表" :key="i">
      {{e.occupation}}
      <button class="small-button" @click="切换专职(e.occupation)">选择</button>
    </div>
  </div>
</template>
<script>
import { inject } from 'vue'
export default {
  setup() {
    const Manager = inject('Manager')
    const setMaskLayer = inject('setMaskLayer')
    const 切换专职 = (occupation)=> {
      Manager.value.you.给自己确定一个专职(occupation)
      setMaskLayer()
    }
    return {
      Manager,
      切换专职
    }
  }
}
</script>