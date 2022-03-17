<template>
  <div class="title">{{you.surname+you.givenName}}的记忆</div>
  <div class="memory-list">
    <div v-for="(e,i) in memoryList" :key="i" class="memory-word">{{Manager.parseMemory(you,e)}}</div>
  </div>
</template>
<script>
import { computed, inject } from 'vue'
export default {
  setup() {
    const Manager = inject("Manager").value
    const you = Manager.you
    const memoryList = computed(()=>{
      return Manager.you.memory.reduce((e1,e2)=>{
        if (Manager.GameWorld.config['记忆展示顺序']=='逆序') {
          e1.unshift(e2)
        } else {
          e1.push(e2)
        }
        return e1
      },[])
    })
    console.log(memoryList)
    return {
      Manager,
      you,
      memoryList
    }
  },
}
</script>
<style lang="less" scoped>
.memory-list {
  padding-bottom: 50px;
  .memory-word {
    font-size: 16px;
    color: #666;
    text-align: left;
  }
}
</style>