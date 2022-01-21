<template>
  <div class="npc-panel">
    <div class="label">{{label}}</div>
    <div class="name" @click="pagePersonFixedShown=true">{{name}}</div>
  </div>
  <page-person-fixed :info="info" v-if="pagePersonFixedShown" :closeFun="()=>pagePersonFixedShown=false"></page-person-fixed>
</template>

<script>
import { ref } from 'vue'
import PagePersonFixed from './PagePersonFixed.vue'
export default {
  components: {PagePersonFixed},
  props: ["info","label","theLife"],
  setup(props) {
    const label = props.label
    const info = props.info
    const name = info.surname+info.givenName
    if( label == "我" ) {
      name = props.theLife.surname + props.theLife.givenName
    }
    const pagePersonFixedShown = ref(false)
    return {
      info,
      name,
      pagePersonFixedShown,
      label
    }
  },
}
</script>

<style lang="less" scoped>
.npc-panel {
  float: left;
  margin: 20px;
  .label {
  }
  .name {
    border: 1px black solid;
    border-radius: 5px;
    padding: 5px;
  }
}
</style>