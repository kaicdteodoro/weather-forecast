import App from './App.vue';
import {createApp} from 'vue';
import {usePlugins} from "@/plugins";

const vue = createApp(App);

usePlugins(vue);

vue.mount('#app');