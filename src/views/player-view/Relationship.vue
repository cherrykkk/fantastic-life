<template>
  <div class="title">{{you.surname+you.givenName}}的关系谱</div>
  <!-- <div class="family-board">
    <div>家庭</div>
    <div>父亲：{{family.father?Manager.getName(family.father):null}} </div>
    <div>母亲：{{family.mother?Manager.getName(family.mother):null}} </div>
    <div v-for="(e,i) in family.children" :key="i">{{Manager.getName(e)}}</div>
  </div> -->
  <div class="friend-board">
    <div>朋友</div>
    <div v-for="(e2) in you.relationships" :key="e2" class="relationship">
      <div class="buff-area">
        <span v-for="(e,i) in e2.buff" :key="i" class="buff">{{e}}</span>
      </div>
      {{Manager.getName(e2.uid)}} <br>熟悉{{e2.熟悉}} 纯洁{{e2.纯洁}}
      <character-avater :character="Manager.getCharacterById(e2.uid)" size="60" class="avater"></character-avater>
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
  width: 45%;
  left: 55%;
  top: 40px;
  .relationship {
    position: relative;
    height: 60px;
    text-align: left;
    border: 1px solid grey;
    margin: 1px;
    padding: 1px;
    .buff-area {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
    }
    .buff {
      padding-right: 10px;
    }
    .avater {
      position: absolute;
      right: 0;
      top: 0;
      height: 60px;
      width: 60px;
    }
  }
  padding-bottom: 50px;
}
</style>