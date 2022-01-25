<template>
 <button @click="saveArchive(GameWorld)">生成存档</button>
 <div>算了，等参数基本固定再搞存档</div>
</template>

<script>
import { inject, ref, computed } from 'vue'

export default {
  setup() {
    const GameWorld = inject('GameWorld').value
    return {
      GameWorld,
      saveArchive
    }
  }, 
}

function saveArchive(GameWorld) {
  const archive = GameWorld.makeArchive()
  console.log(archive)
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