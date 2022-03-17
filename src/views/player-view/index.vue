<template>
  <div class="view">
    姓名: {{you.surname+you.givenName}}
    年龄: {{(you.body.month/12).toFixed(0)}}
    <character-avater :character="you" class="avater"></character-avater>
    <div v-if="!you.spouse">未婚</div>
    <div v-if="you.spouse">配偶: 
      <div class="relationship" :he="Manager.getCharacterById(you.spouse)" >
        <!-- <span v-for="(e,i) in e2.buff" :key="i" class="buff">{{e}}</span>
        <br> {{Manager.getName(e2.id)}} <br> {{e2.level}}
        <character-avater :character="Manager.getCharacterById(e2.id)" size="60" class="avater"></character-avater> -->
        {{he}}
      </div>
    </div>
    <div v-for="(e,i) in you.buff" :key="i">拥有状态:{{e}}</div> 
    <div>财产资源
      <div v-for="(e,i) in estates" :key="i">
        类型：{{e.类型}} | 尺寸：{{e.尺寸}} | 质量：{{e.质量}}
      </div>
    </div>
    <div>拥有物品
      <div v-for="(e,i) in estates" :key="i">
        类型：{{e.类型}} | 尺寸：{{e.尺寸}} | 质量：{{e.质量}}
      </div>
    </div>
    <div v-for="(e,i) in Object.keys(bigFive)" :key="i">{{bigFive[e]}}:{{you[e]}}</div>
  </div>
</template>

<script>
import { ref, inject } from 'vue'
import CharacterAvater from './components/CharacterAvater.vue'
export default {
  components: {
    CharacterAvater
  },
  setup() {
    const Manager = inject("Manager").value
    const you = Manager.you
    const bigFive = {
      BIG_FIVE_Openness: '开放性',
      BIG_FIVE_Conscientiousness: '尽责性',
      BIG_FIVE_Extraversion: '外倾性',
      BIG_FIVE_Agreeableness: '宜人性',
      BIG_FIVE_Neuroticism: '神经质'
    } 
    const estates = you.estates.reduce((e1,e2)=>{
      e1.push(Manager.getEstateById(e2))
      return e1
    },[])
    return {
      Manager,
      you,
      bigFive,
      estates
    }
  },
}
    

</script>
<style lang="less" scoped>
.view {
  margin: 40px 0;
  .avater {
    height: 100px;
    width: 100px;
  }
}
</style>