<template>
  <v-app>
    <v-main>
      <v-container>
        <search @submit="change"/>
      </v-container>
      <v-container class="mx-auto">
        <weather :data="data"/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import {defineAsyncComponent} from "vue";

export default {
  name: 'App',
  data: () => ({
    data: undefined
  }),
  methods: {
    change(value) {
     this.data = value;
    }
  },
  components: {
    Search: defineAsyncComponent(() => import('@/components/SearchComponent.vue')),
    Weather: defineAsyncComponent(() => import('@/components/WeatherComponent.vue')),
  }
}
</script>
