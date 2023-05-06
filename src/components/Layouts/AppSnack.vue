<template>
  <v-snackbar location="top right" variant='flat' :color="color" :model-value="open" >
    <div  class="container" >
      <div>
        <h3>Thông báo</h3>
        <span>{{ content }}</span>
      </div>
      <button class="btn" @click="onButtonAction">{{ titleBtn }}</button>
    </div>
  </v-snackbar>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'AppSnack',
  emits: ['click-action'],
  props: {
    content: { type: String, default: '' },
    open: { type: Boolean, default: true },
    color: { type: String, default: 'var(--green-dark)' },
    titleBtn: { type: String, default: '' }
  },
  methods: {
    onButtonAction() {
      this.$emit('click-action')
    }
  }
})
</script>
<style scoped >
.container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.btn{
  font-weight: 700;
}
</style>