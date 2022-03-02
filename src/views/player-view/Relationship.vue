<template>
  <div class="title">{{you.surname+you.givenName}}的关系谱</div>
  <div class="family-board">
    <div>家庭</div>
    <div>父亲：{{family.father?family.father.surname+family.father.givenName:null}} </div>
    <div>母亲：{{family.mother?family.mother.surname+family.mother.givenName:null}} </div>
  </div>
  <div class="friend-board">
    <div>朋友</div>
    <div v-for="(e2,i2) in you.relationships" :key="i2" class="relationship">{{showRelationship(GameWorld,e2)}}</div>
  </div>

</template>
<script>
import { inject } from 'vue'
export default {
  setup() {
    const GameWorld = inject("GameWorld").value
    const you = GameWorld.getCharacterById(GameWorld.theMainCharacterId)
    const family = {
      father: you.body.father ? GameWorld.getCharacterById(you.body.father) : null,
      mother: you.body.mother ? GameWorld.getCharacterById(you.body.mother) : null
    }
    return {
      GameWorld,
      you,
      family,
      showRelationship
    }
  },
}

function showRelationship(GameWorld,relathionship) {
  const ObjectCharacter = GameWorld.getCharacterById(relathionship.cId)
  return ObjectCharacter.surname+ObjectCharacter.givenName+":"+relathionship.level
}


</script>
<style lang="less" scoped>
.family-board {
  position: absolute;
  width: 50%;
  left: 0;
  top: 40px;
}
.friend-board {
  position: absolute;
  width: 50%;
  left: 50%;
  top: 40px;
}
</style>