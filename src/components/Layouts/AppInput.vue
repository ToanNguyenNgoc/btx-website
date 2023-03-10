<template>
  <div>
    <input 
      class="app-input"
      :value="modelValue" 
      @input="(e) => $emit('update:modelValue', (e.target as HTMLInputElement).value)" 
      :placeholder="placeholder" 
      />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppInput',
  props: {
    type: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
})
</script>