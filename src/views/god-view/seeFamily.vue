<template>
  <div>
    世界运行{{(World.world_month/12).toFixed(0)}}年{{World.world_month%12}}月
  </div>
  <div v-for="(e,i) in familyList" :key="i">
    <div class="parents">{{showName(World,e.idA)}} ⇋ {{showName(World,e.idB)}}</div>
    <div class="children">
     
    </div>
  </div>
</template>

<script>
import { inject, ref, computed } from 'vue'

export default {
  setup() {
    const World = inject('World').value
    const familyList = computed(()=>{
      const tempList = []
     
    })
    return {
      World,
      familyList,
      showName
    }
  }, 
}
function showName(World,uid) {
  const character = World.getCharacterById(uid)
  return character.name +`(${(character.month/12).toFixed(0)})`
}

</script>
<style lang="less" scoped>
.parents {
  text-align: left;
}
.children {
  display: flex;
  flex-wrap: wrap;
  color: #999;
  div {
    margin: 0 2px;
  }
}
</style>