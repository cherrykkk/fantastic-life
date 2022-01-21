<template>
  <div class="message-box">
    <div v-for="(e,i) in eventsLiberary.liberary" :key="i">
      {{e.message}}
    </div>
  </div>
</template>

<script>
import {ref,watch} from 'vue'
export default ({  
  props:["eventsLiberary"],
  setup ( props ) {
    const eventsLiberary = ref(props.eventsLiberary)
    console.log(eventsLiberary.value)
    return {
    }
  }
})

</script>

<style lang="less" scoped>
.message-box {

}
</style>