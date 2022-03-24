<template>
  <div> 
    <div class="info">{{character.surname+character.givenName}}({{(character.body.month/12).toFixed(0)}})
      <div v-if="character.marriaged">⇋{{showSpouse(GameWorld,character.spouse)}}</div>
    </div>
    <div @click="showRawInfo=!showRawInfo">展开原始信息<div  v-if="showRawInfo">{{data}}</div></div>
    <div @click="showMemory=!showMemory">展开记忆
      <div  class="memory" v-if="showMemory"> 
        <div v-for="(e,i) in character.memory" :key="i">{{GameWorld.parseMemory(character,e)}}</div>
      </div>
    </div>
    <div class="relationships">
      <div v-for="(e2,i2) in relationshipShow" :key="i2" class="relationship">{{showRelationship(GameWorld,e2)}}</div>
    </div>
  </div>
</template>

<script>
import { inject, computed,ref } from 'vue'
export default {
  props: ['data'],
  setup(props) {
    const GameWorld = inject('GameWorld').value
    const character = props.data
    const relationshipShow = computed(() => {
      return character.relationships.filter(item=>item.level>=8)
    })
    const showRawInfo = ref(false)
    const showMemory = ref(false)
    return {
      GameWorld,
      character,
      relationshipShow,
      showRelationship,
      showSpouse,
      showRawInfo,
      showMemory
    }
  },
}

function showRelationship(GameWorld,relathionship) {
  const ObjectCharacter = GameWorld.getCharacterById(relathionship.uid)
  return ObjectCharacter.surname+ObjectCharacter.givenName+":"+relathionship.level
}

function showSpouse(GameWorld,uid) {
  const character = GameWorld.getCharacterById(uid)
  return character.surname+character.givenName+`(${(character.body.month/12).toFixed(0)})`
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