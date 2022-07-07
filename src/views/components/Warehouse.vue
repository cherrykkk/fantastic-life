<template>
  <div class="title">我家仓库</div>
  <div class="content">
    <div v-for="(e,i) in you.家.warehouse" :key="i" class="item-warehouse">
      {{e.类型}}: {{e.number}}
    </div>
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