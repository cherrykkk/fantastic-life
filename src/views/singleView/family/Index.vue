<template>
  <page-title title="家庭"></page-title>
  <div> 
    <page-person :info="family.familyMembers.host" label="男主人"></page-person>
    <page-person :info="family.familyMembers.hostess" label="女主人"></page-person>
    <page-person v-for="(e,i) in family.familyMembers.children" :key="i" :info="e" label="孩子"></page-person>
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