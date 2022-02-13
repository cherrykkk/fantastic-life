<template>
  <div>
    世界运行{{(GameWorld.world_month/12).toFixed(0)}}年{{GameWorld.world_month%12}}月
  </div>
  <div v-for="(e,i) in familyList" :key="i">
    <div class="parents">{{showName(GameWorld,e.idA)}} ⇋ {{showName(GameWorld,e.idB)}}</div>
    <div class="children">
      <div v-for="(e2,i2) in GameWorld.getCharacterById(e.idA).children" :key="i2">
        {{GameWorld.getName(e2)}}
      </div>
    </div>
  </div>
</template>

<script>
import { inject, ref, computed } from 'vue'

export default {
  setup() {
    const GameWorld = inject('GameWorld').value
    const familyList = computed(()=>{
      const tempList = []
      GameWorld.society.characters.forEach( character => {
        if( character.marriaged && character.body.sex=='女') {
          const family = {
            idA: character.cId,
            idB: character.spouse,
            correction: true
          }
          tempList.push(family)
          //检查自己的对象的对象是否是自己
          const spouseCharacter = GameWorld.getCharacterById(character.spouse)
          if( spouseCharacter.spouse != character.cId ) {
            console.log(showName(GameWorld,character.cId) + "出问题了")
          }
        }
      })
      return tempList
    })
    return {
      GameWorld,
      familyList,
      showName
    }
  }, 
}
function showName(GameWorld,cId) {
  const character = GameWorld.getCharacterById(cId)
  return character.surname+character.givenName+`(${(character.body.month/12).toFixed(0)})`
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