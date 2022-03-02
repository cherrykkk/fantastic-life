<template>
 <button @click="saveArchive(GameWorld)">生成存档</button>
 <div>当前存档
   {{archive}}
 </div>
 <div>算了，等参数基本固定再搞存档</div>
</template>

<script>
import { inject, ref, computed } from 'vue'

export default {
  setup() {
    const GameWorld = inject('GameWorld').value 
    const archive = localStorage.getItem('archive')
    const saveArchive = inject('saveArchive')
    return {
      GameWorld,
      saveArchive,
      archive
    }
  }, 
}

</script>
<style lang="less" scoped>
.parents {
  text-align: left;
}
.children {
  display: flex;
  color: #999;
  div {
    margin: 0 2px;
  }
}
</style>