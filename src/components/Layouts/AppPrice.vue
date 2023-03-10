<template>
  <span :class="className">{{ price }} {{ currency }}</span>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { formatPrice } from '@/utils'
export default defineComponent({
  name: 'AppPrice',
  props: {
    price: { type: Number, required: true },
    currency: { type: String, default: "" },
    className: { type: String, default: "" }
  },
  setup(props) {
    const price = computed(() => formatPrice(props.price))
    const currency = props.currency
    const className = props.className
    return { price, currency, className }
  }
})
</script>