<template>
  <div> 
    <div class="info">{{character.name}}({{(character.month/12).toFixed(0)}})
      <div v-if="character.marriaged">⇋{{showSpouse(World,character.spouse)}}</div>
    </div>
    <div @click="showRawInfo=!showRawInfo">展开原始信息<div  v-if="showRawInfo">{{data}}</div></div>
    <div @click="showMemory=!showMemory">展开记忆
      <div  class="memory" v-if="showMemory"> 
        <div v-for="(e,i) in character.memories" :key="i">{{World.parseMemory(character,e)}}</div>
      </div>
    </div>
    <div class="relationships">
      <div v-for="(e2,i2) in relationshipShow" :key="i2" class="relationship">{{showRelationship(World,e2)}}</div>
    </div>
  </div>
</template>

<script>
import { inject, computed,ref } from 'vue'
export default {
  props: ['data'],
  setup(props) {
    const World = inject('World').value
    const character = props.data
    const relationshipShow = computed(() => {
      return character.relationships.filter(item=>item.level>=8)
    })
    const showRawInfo = ref(false)
    const showMemory = ref(false)
    return {
      World,
      character,
      relationshipShow,
      showRelationship,
      showSpouse,
      showRawInfo,
      showMemory
    }
  },
}

function showRelationship(World,relathionship) {
  const ObjectCharacter = World.getCharacterById(relathionship.uid)
  return ObjectCharacter.surname+ObjectCharacter.givenName+":"+relathionship.level
}

function showSpouse(World,uid) {
  const character = World.getCharacterById(uid)
  return character.surname+character.givenName+`(${(character.month/12).toFixed(0)})`
}

</script>

<style lang="less" scoped>
.info {
  display: flex;
}
.relationships {
  display: flex;
  text-align: left;
  flex-wrap: wrap;
  color: #999;
  .relationship {
    margin: 0 2px;
  }
}
.memory {
  div {
    font-size: 12px;
    color: #999;
  }
}
</style>