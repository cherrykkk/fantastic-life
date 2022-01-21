<template>
  <page-title title="身体"></page-title>
  <div> 
    <div>体质 {{consititution}}</div>
    <div>外貌 {{appearance}}</div>
    <div>智力 {{intelligence}}</div>
    <div>健康 {{healthy}}</div>
    <div>年龄 {{Math.floor(month/12)}}岁 {{month%12}}月</div>
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
    const body = inject("getCurrentLife")().body
    const {intelligence,healthy,month,appearance,consititution} = body.state
    return {
      body,
      intelligence,
      healthy,
      month,
      appearance,
      consititution
    }
  },
}
</script>

<style lang="less" scoped>
.person {

}
</style>