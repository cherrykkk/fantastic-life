<template>
  <page-title title="学业"></page-title>
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
    const family = inject("getCurrentLife")().family
    console.log(family)
    return {
      family,
    }
  },
}
</script>

<style lang="less" scoped>
.person {

}
</style>