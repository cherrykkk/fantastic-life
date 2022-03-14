<template>
  <div class="title">{{you.surname+you.givenName}}的记忆</div>
  <div class="memory-list">
    <div v-for="(e,i) in you.memory" :key="i">{{Manager.parseMemory(you,e)}}</div>
  </div>
</template>
<script>
import { inject } from 'vue'
export default {
  setup() {
    const Manager = inject("Manager").value
    const you = Manager.you
    console.log(you)
    return {
      Manager,
      you
    }
  },
}
</script>
<style lang="less" scoped>
.memory-list {
  padding-bottom: 50px;
  div {
    font-size: 12px;
    color: #999;
  }
}
</style>