<template>
  <div class="view">
    姓名: {{you.surname+you.givenName}}
    年龄: {{(you.body.month/12).toFixed(0)}}
    <button v-if="!Manager.playing" @click="Manager.play()">继续生活</button>
    <button v-if="Manager.playing" @click="Manager.stop()">暂停</button>
  </div>
</template>

<script>
import { ref, inject } from 'vue'
import characterPanel from './components/CharacterPanel'
export default {
  components: {
    characterPanel
  },
  setup() {
    const Manager = inject("Manager").value
    Manager.play()
    const you = Manager.you
    return {
      Manager,
      you
    }
  },
}
    

</script>
<style lang="less" scoped>
.view {
  margin: 40px 0;
}
</style>