<template>
  <div v-if="orgModule.load">
    <h1>Đang tải...</h1>
  </div>
  <div v-if="orgModule.org">
    <h1>{{ orgModule.org?.name }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'HomePage',
  computed: {
    ...mapState(['orgModule'])
  }
})

</script>
