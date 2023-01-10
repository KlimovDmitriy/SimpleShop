import Vue from "vue";
import App from "./App.vue";
import VueCookies from "vue-cookies";

let vm = new Vue({
  render: (h) => h(App),
});
Vue.use(VueCookies);
vm.$mount("#app");
