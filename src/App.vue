<template>
  <div id="app">
    <!-- <pre>
      {{ centerScreenX }}
    </pre> -->
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

const controller = new AbortController();

export default {
  name: "App",
  components: {
    Anime,
    List,
  },
  data: () => ({
    centerScreenX: 250,
    centerScreenY: 300,
    controller: null,
  }),
  async mounted() {
    await this.$store.dispatch("getNewAnimes");
    this.$store.commit("selectAnime", {
      anime: this.$store.state.anime.animes[0],
    });

    addEventListener("scroll", this.onScroll, {
      passive: true,
      signal: controller.signal,
    });
    addEventListener("touchmove", this.onTouchMove, {
      passive: true,
      signal: controller.signal,
    });
    addEventListener("touchend", this.onTouchEnd, {
      passive: true,
      signal: controller.signal,
    });
    addEventListener("resize", this.onResize, {
      passive: true,
      signal: controller.signal,
    });
    this.onResize(); // to set the centerScreenX & centerScreenY
  },

  beforeDestroy() {
    controller.abort();
  },
  methods: {
    onResize() {
      this.centerScreenX = Math.round(window.outerWidth / 2);
      this.centerScreenY = Math.round(window.innerHeight / 2);
    },
    onScroll() {
      const imageElement =
        this.$refs.List.$el.getElementsByClassName("selected")[0];

      const check = (el) =>
        el.y + el.naturalHeight > this.centerScreenY &&
        el.y < this.centerScreenY;

      if (!check(imageElement)) {
        const newAnimeElement = Array.from(this.$refs.List.$el.children).find(
          (el) => check(el)
        );

        if (newAnimeElement) {
          const newSelectedAnime = this.$store.state.anime.animes.find(
            (a) => a.id === +newAnimeElement.dataset.id
          );

          this.$store.commit("selectAnime", {
            anime: newSelectedAnime,
          });
        }
      }

      if (imageElement === imageElement.parentElement.lastElementChild) {
        this.$store.dispatch("getNewAnimes");
      }
    },
    onTouchMove() {
      const imageElement =
        this.$refs.List.$el.getElementsByClassName("selected")[0];

      const check = (el) =>
        el.x + el.width > this.centerScreenX && el.x < this.centerScreenX;

      if (!check(imageElement)) {
        const newAnimeElement = Array.from(this.$refs.List.$el.children).find(
          (el) => check(el)
        );

        if (newAnimeElement) {
          const newSelectedAnime = this.$store.state.anime.animes.find(
            (a) => a.id === +newAnimeElement.dataset.id
          );

          this.$store.commit("selectAnime", {
            anime: newSelectedAnime,
          });
        }
      }

      if (imageElement === imageElement.parentElement.lastElementChild) {
        this.$store.dispatch("getNewAnimes");
      }
    },
    onTouchEnd() {
      // To make sure the selection is correct
      setTimeout(() => {
        this.onTouchMove();
        this.onTouchMove();
      }, 1500);
    },
  },
};
</script>

<style lang="scss">
@import "~bulma";

body {
  @include touch {
    overflow-y: hidden;
    overflow-x: scroll;
    height: 100vh;
  }
}

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

    @include touch {
      .main-container {
        display: inline-grid;
        padding-top: 1em;
        width: 100%;
        height: 100vh;
        grid-template-columns: none;
        grid-template-rows: [list] 220px [anime] auto;
      }
    }
  }
}
</style>
