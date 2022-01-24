<template>
  <div>
    <div> 角色数量{{GameWorld.society.characters.length}}</div>
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
    const GameWorld = inject('GameWorld').value
    const charactersRender = computed(()=>{
      return GameWorld.society.characters.filter(item=>item.body.survived_month >= 12*0)
    })
    const relationshipNum = computed(()=>{
      let num = 0
      for( const character of GameWorld.society.characters) {
        num += character.relationships.length
      }
      return num
    })
    
    return {
      GameWorld,
      charactersRender,
      relationshipNum
    }
  }, 
}
</script>
<style lang="less" scoped>
</style>