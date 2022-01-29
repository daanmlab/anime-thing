import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import anime from "./modules/anime";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { anime },
});
