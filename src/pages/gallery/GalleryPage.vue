<template>
  <v-container v-if="!orgModule.galleries.load" class="container">
    <v-tabs :show-arrows="false" color="var(--deep-orange)" v-model="tab" bg-color="primary">
      <v-tab 
        :hide-slider="true" class="tab-item" 
        v-for="item in orgModule.galleries.data" 
        :key="item?.id" :value="item?.id"
      >
        {{ item.name }}
      </v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item v-for="item in orgModule.galleries.data" :key="item?.id" :value="item?.id">
          {{ item.name }}
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-container>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import store from '@/store';
import { mapState } from 'vuex';
export default defineComponent({
  name: 'GalleryPage',
  computed: {
    ...mapState(['orgModule'])
  },
  data() {
    return {
      tab: store.state.orgModule.galleries.data?.[0]?.id
    }
  },
  created() {
    if (this.orgModule.galleries.load) {
      store.dispatch('GET_GALLERIES')
    }
  },
})
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.tab-item{
  height: 38px !important;
  border-radius: 19px !important;
}
.v-slide-group-item--active{
  border: solid 1px var(--deep-orange);
}


</style>