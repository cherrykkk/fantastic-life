<template>
  <div>
    谋生之计
  </div>
  <div>
    主营生计
  </div>
  <div>
    <router-link to='/game'>提升草药能力</router-link><br>
    <router-link to='/game2'>提升御剑能力</router-link>
  </div>
  <div class="skill-list">
    <div class="skill-card" v-for="(e,i) in Object.keys(Manager.you.skills)" :key="i">
      <div class="skill-name">{{e}}</div>
      <div class="skill-level">{{Manager.you.skills[e]}}</div>
    </div>
  </div>
</template>
<script>
import { inject } from 'vue'
export default {
  setup() {
    const Manager = inject("Manager").value
    return {
      Manager
    }
  },
}
</script>

<style lang="less" scoped>
@color: red;
.skill-list {
  position: absolute;
  bottom: 0;
  height: 80px;
  display: flex;
  justify-content: space-around;
  .skill-card {
    width: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
}
</style>