<template>
  <div>
    <div> 角色数量{{World.characters.length}}</div>
    <div> 关系数量{{relationshipNum}}</div>
    <character-panel v-for="(e,i) in charactersRender" :key="i" :data='e'></character-panel>
  </div>
</template>

<script>
import { inject, ref, computed } from 'vue'
import CharacterPanel from './components/CharacterPanel.vue'

export default {
  components: {
    CharacterPanel
  },
  setup() {
    const World = inject('World').value
    const charactersRender = computed(()=>{
      return World.characters.filter(item=>item.month >= 12*0)
    })
    const relationshipNum = computed(()=>{
      let num = 0
      for( const character of World.characters) {
        num += character.relationships.length
      }
      return num
    })
    
    return {
      World,
      charactersRender,
      relationshipNum
    }
  }, 
}
</script>
<style lang="less" scoped>
</style>