<template>
  <div @click="info.func">{{info.title}}</div>
</template>

<script>
export default {
  props: ["info"],
  setup() {
    
  },
}
</script>