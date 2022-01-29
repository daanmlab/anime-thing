import { getRandomAnimes } from "../../api/aniApi";

export default {
  state: () => ({
    animes: [],
    selected: null,
    loading: false,
  }),
  mutations: {
    addAnimes(state, { newAnimes }) {
      state.animes = [...state.animes, ...newAnimes];
    },
    selectAnime(state, { anime }) {
      state.selected = anime;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
  },
  actions: {
    async getNewAnimes({ commit }) {
      commit("toggleLoading");
      try {
        const newAnimes = (await getRandomAnimes()).data.data;

        commit("addAnimes", { newAnimes });
      } catch (e) {
        console.error(e);
        // TODO: add error handling
      }
      commit("toggleLoading");
    },
  },
  getters: {},
};
