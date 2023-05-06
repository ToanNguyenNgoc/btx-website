<template>
  <div>
    <app-header />
    <slot />
    <app-footer />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer/Footer.vue";

export default defineComponent({
  name: 'MainLayout',
  components: {
    AppHeader: Header,
    AppFooter: Footer
  },
})
</script>