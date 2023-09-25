<template>
  <v-fade-transition>
    <v-card class="mx-auto" v-if="weather" max-width="500">
      <v-card-item :title="weather.name">
        <template v-slot:subtitle>
          <v-icon
              icon="mdi-alert"
              size="18"
              class="me-1 pb-1"
          />
          {{ucFirst(icon.desc)}}
        </template>
      </v-card-item>

      <v-card-text class="py-0">
        <v-row align="center" no-gutters>
          <v-col class="text-h2">
            <p v-text="`${weather.main.temp}&deg;C`"/>
          </v-col>
          <v-col class="text-center ">
            <v-img :src="icon.src" min-height="88" max-height="188"/>
          </v-col>
        </v-row>
      </v-card-text>

      <div class="d-flex py-3 justify-space-between">
        <v-list-item
            density="compact"
            prepend-icon="mdi-thermometer-alert"
        >
          <v-list-item-subtitle v-text="`${weather.main.temp_min}&deg;C/${weather.main.temp_max}&deg;C`"/>
        </v-list-item>
        <v-list-item
            density="compact"
            prepend-icon="mdi-water-percent"
        >
          <v-list-item-subtitle v-text="`${weather.main.humidity}%`"/>
        </v-list-item>
      </div>

      <div class="d-flex py-3 justify-space-between mb-5">
        <v-list-item
            density="compact"
            prepend-icon="mdi-weather-windy"
        >
          <v-list-item-subtitle v-text="`${floatFormat(weather.wind.speed * 3.6)} km/h`"/>
        </v-list-item>
        <v-list-item
            density="compact"
            prepend-icon="mdi-cloud-percent-outline"
        >
          <v-list-item-subtitle v-text="`${weather.clouds.all}%`"/>
        </v-list-item>
      </div>
    </v-card>
  </v-fade-transition>

</template>

<script>
import service from "@/services/service";
import {floatFormat, ucFirst} from "@/helpers";

export default {
  name: "WeatherComponent",
  methods: {ucFirst, floatFormat},
  props: {
    data: Object
  },
  data: () => ({
    index: 0,
    expand: false,
    icon: {desc: undefined, src: undefined},
    labels: {0: 'SU', 1: 'MO', 2: 'TU', 3: 'WED', 4: 'TH', 5: 'FR', 6: 'SA'},
    time: 0,
    weather: undefined,
  }),
  watch: {
    data: {
      async handler(value) {
        this.weather = await service.weather(value.lat, value.lon);
        console.log(this.weather);
        if (this.weather.weather[0].icon) {
          let {icon, description} = this.weather.weather[0];
          this.icon.desc = description;
          this.icon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        }
      },
      deep: true,
    }
  }
}
</script>

<style scoped>

</style>