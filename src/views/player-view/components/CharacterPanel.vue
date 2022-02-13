<template>
  <div> 
    <div class="info">{{character.surname+character.givenName}}({{(character.body.month/12).toFixed(0)}})
      <div v-if="character.marriaged">⇋{{showSpouse(GameWorld,character.spouse)}}</div>
    </div>
    <div class="skill-board">
      <div>技能</div>
      <div v-for="(e,i) in Object.keys(character.skills)" :key="i">{{e}}:{{character.skills[e]}}</div>
    </div>
    <div class="relationships">
      <div>人际关系：</div>
      <div v-for="(e2,i2) in relationshipShow" :key="i2" class="relationship">{{showRelationship(GameWorld,e2)}}</div>
    </div>
    <div class="memory">
      <div>记忆</div>
      <div v-for="(e,i) in character.memory" :key="i">{{e}}</div>
    </div>
  </div>
</template>

<script>
import { inject, computed } from 'vue'
export default {
  props: ['data'],
  setup(props) {
    const GameWorld = inject('GameWorld').value
    const character = props.data
    // const relationshipShow = computed(() => {
    //   return character.relationships.filter(item=>item.level>=8)
    // })
    const relationshipShow = character.relationships
    return {
      GameWorld,
      character,
      relationshipShow,
      showRelationship,
      showSpouse
    }
  },
}

function showRelationship(GameWorld,relathionship) {
  const ObjectCharacter = GameWorld.getCharacterById(relathionship.cId)
  return ObjectCharacter.surname+ObjectCharacter.givenName+":"+relathionship.level
}

function showSpouse(GameWorld,cId) {
  const character = GameWorld.getCharacterById(cId)
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
  height: 20px;
  overflow: hidden;
  div {
    font-size: 12px;
    color: #999;
  }
}
</style>