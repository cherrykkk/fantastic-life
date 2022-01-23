<template>
  <div> 
    <div>{{character.surname+character.givenName}} {{(character.body.survived_month/12).toFixed(1)}}</div>
    <div class="relationships">
      <div  v-for="(e2,i2) in relationshipShow" :key="i2" >{{showRelationship(game,e2)}}</div>
    </div>
  </div>
</template>

<script>
import { inject,computed } from 'vue'
import { GAME } from '@/core/apiForView/theGame.js'
export default {
  props: ['data'],
  setup(props) {
    const game = inject('game')
    const character = props.data
    const relationshipShow = computed(() => {
      return character.relationships.filter(item=>item.level>7)
    })
    return {
      game,
      character,
      relationshipShow,
      showRelationship
    }
  },
}

function showRelationship(game,relathionship) {
  const ObjectCharacter = GAME.getCharacterById(game,relathionship.characterId)
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