<template>
  <v-autocomplete
      v-model="value"
      :items="items"
      auto-select-first
      class="flex-full-width"
      density="comfortable"
      item-props
      placeholder="Pesquise a Cidade"
      prepend-inner-icon="mdi-cloud-search-outline"
      rounded
      variant="solo"
      @update:search="search"
      @update:model-value="submit"
      :loading="loading"
      menu-icon=""
  />
</template>

<script>
import service from "@/services/service";

export default {
  emits: ['submit'],
  name: "SearchComponent",
  data: () => ({
    loading: false,
    timeout: undefined,
    value: undefined,
    items: [],
  }),
  mounted() {
    navigator.geolocation.getCurrentPosition( ({coords}) => service.coordinates({
      limit: 1,
      lat: coords.latitude,
      lon: coords.longitude
    }, 'reverse')
        .then(response => this.submit(response[0].value)));
  },
  methods: {
    async search(search) {
      if (search) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(async () => {
          this.loading = true;
          this.items = await service.coordinates({q: search});
          this.loading = false;
        }, 400);
      }
    },
    submit(value) {
      this.$emit('submit', value);
    }
  }
}
</script>

<style scoped>

</style>