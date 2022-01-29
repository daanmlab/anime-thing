<template>
  <div id="app">
    <div v-if="$store.state.anime.selected" class="container is-widescreen">
      <div class="main-container">
        <div class="list-container">
          <List ref="List" :animes="$store.state.anime.animes" />
        </div>
        <div class="anime-container">
          <template v-if="$store.state.anime.selected">
            <Anime :anime="$store.state.anime.selected" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Anime from "./components/Anime";
import List from "./components/List";

export default {
  name: "App",
  components: {
    Anime,
    List,
  },
  data: () => ({
    middleOfScreenY: 300,
  }),
  async mounted() {
    await this.$store.dispatch("getNewAnimes");
    this.$store.commit("selectAnime", {
      anime: this.$store.state.anime.animes[0],
    });

    addEventListener("scroll", this.onScroll, { passive: true });
    addEventListener("resize", this.onResize, { passive: true });
    this.onResize(); // to set the middleOfScreenY
  },

  beforeDestroy() {
    removeEventListener("scroll", this.onScroll, { passive: true });
    removeEventListener("resize", this.onResize, { passive: true });
  },
  methods: {
    onResize() {
      this.middleOfScreenY = Math.round(window.innerHeight / 2);
    },
    onScroll() {
      const imageElement =
        this.$refs.List.$el.firstElementChild.getElementsByClassName(
          "selected"
        )[0];

      const check = (el) =>
        el.y + el.naturalHeight > this.middleOfScreenY &&
        el.y < this.middleOfScreenY;

      if (!check(imageElement)) {
        const newAnimeElement = Array.from(
          this.$refs.List.$el.firstElementChild.children
        ).find((el) => check(el.firstElementChild))?.firstElementChild;

        if (newAnimeElement) {
          const newSelectedAnime = this.$store.state.anime.animes.find(
            (a) => a.id === +newAnimeElement.dataset.id
          );

          this.$store.commit("selectAnime", {
            anime: newSelectedAnime,
          });
        }
      }

      if (
        imageElement.parentElement ===
        imageElement.parentElement.parentElement.lastElementChild
      ) {
        this.$store.dispatch("getNewAnimes");
      }
    },
  },
};
</script>

<style lang="scss">
@import "~bulma";

#app {
  .container {
    transition: background-color 500ms;

    .main-container {
      display: inline-grid;
      width: 100%;
      grid-template-columns: [list] 160px [anime] auto;

      .list-container {
        grid-area: list;
      }
      .anime-container {
        grid-area: anime;
      }
    }
  }
}
</style>
