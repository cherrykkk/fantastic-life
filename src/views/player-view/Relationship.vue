<template>
  <div class="title">{{you.surname+you.givenName}}的关系谱</div>
  <div class="family-board">
    <div>家庭</div>
    <div>父亲：{{family.father?Manager.getName(family.father):null}} </div>
    <div>母亲：{{family.mother?Manager.getName(family.mother):null}} </div>
    <div v-for="(e,i) in family.children" :key="i">{{Manager.getName(e)}}</div>
  </div>
  <div class="friend-board">
    <div>朋友</div>
    <div v-for="(e2,i2) in you.relationships" :key="i2" class="relationship">
      {{e2.type}} | {{Manager.getName(e2.id)}} | {{e2.level}}
      <character-avater :character="Manager.getCharacterById(e2.id)" size="40" class="avater"></character-avater>
    </div>
  </div>

</template>
<script>
import { inject } from 'vue'
import CharacterAvater from './components/CharacterAvater.vue'
export default {
  components: {
    CharacterAvater
  },
  setup() {
    const Manager = inject("Manager").value
    const you = Manager.you
    const family = {
      father: you.body.father ? Manager.getCharacterById(you.body.father) : null,
      mother: you.body.mother ? Manager.getCharacterById(you.body.mother) : null,
      children: []
    }
    if (family.mother) {
      family.mother.children.forEach( child => {
        family.children.push(Manager.getCharacterById(child))
      })
    }
    return {
      Manager,
      you,
      family
    }
  },
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
  .relationship {
    position: relative;
    height: 40px;
    text-align: left;
    .avater {
      position: absolute;
      right: 40px;
      top: 0;
    }
  }
  padding-bottom: 50px;
}
</style>