<template>
  <div> 
    <div>{{character.surname+character.givenName}} {{(character.body.survived_month/12).toFixed(1)}}</div>
    <div class="relationships">
      <div  v-for="(e2,i2) in relationshipShow" :key="i2" >{{showRelationship(GameWorld,e2)}}</div>
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
    const relationshipShow = computed(() => {
      return character.relationships.filter(item=>item.level>=8)
    })
    return {
      GameWorld,
      character,
      relationshipShow,
      showRelationship
    }
  },
}

function showRelationship(GameWorld,relathionship) {
  const ObjectCharacter = GameWorld.getCharacterById(relathionship.characterId)
  return ObjectCharacter.surname+ObjectCharacter.givenName+":"+relathionship.level
}

</script>

<style lang="less" scoped>
.relationships {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  color: #999
}
</style>