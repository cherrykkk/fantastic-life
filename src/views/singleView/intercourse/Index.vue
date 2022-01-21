<template>
  <page-title title="社交"></page-title>
  <div> 
    <page-person v-for="(e,i) in intercourse.relationships" :key="i" :info="e.target" :label="e.type"></page-person>
  </div>
  <page-go-back></page-go-back>
</template>

<script>
import { inject } from 'vue'
import PageTitle from '../components/PageTitle'
import PagePerson from '../components/PagePerson'
import PageGoBack from '../components/PageGoBack.vue'

export default {
  components: {PageTitle,PagePerson,PageGoBack},
  setup() {
    const intercourse = inject("getCurrentLife")().intercourse
    console.log(intercourse)
    return {
      intercourse,
    }
  },
}
</script>

<style lang="less" scoped>
.person {

}
</style>