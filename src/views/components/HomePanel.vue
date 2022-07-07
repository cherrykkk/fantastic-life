<template>
  <div class="title">家里</div>
  <div>类型：{{you.家.structure}}</div>
  <div>人口:
    <span v-for="e in you.家.使用权" :key="e">| {{e.name}} |</span>
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  setup() {
    return {
      you: inject('Manager').value.you
    }
  },
}
</script>