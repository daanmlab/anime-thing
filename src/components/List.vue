<template>
  <div id="List">
    <div class="columns is-multiline">
      <div v-for="anime in animes" class="column is-12 py-0" :key="anime.id">
        <img
          @click="selectAnime(anime)"
          class="custom--image"
          :class="{ selected: anime === $store.state.anime.selected }"
          :src="anime.cover_image"
          :data-id="anime.id"
        />
      </div>
      <template v-if="$store.state.anime.loading">
        <div v-for="skeleton in 10" class="column is-12 py-0" :key="skeleton">
          <span class="skeleton"></span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    animes: {
      type: Array,
      required: true,
    },
  },

  methods: {
    selectAnime(anime) {
      this.$store.commit("selectAnime", { anime });
    },
  },
};
</script>

<style lang="scss">
#List {
  padding: calc(50vh - 100px) 0 calc(100vh - 280px);
  img.custom--image {
    width: 100%;
    margin: 0 0;

    transition: transform 500ms, margin 500ms;
    transform: scale(100%, 100%);

    &.selected {
      transform: scale(120%, 120%);
      margin: 20% 0;
    }
  }

  @keyframes pulse {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.7;
    }
    100% {
      opacity: 0;
    }
  }

  .skeleton {
    display: inline-block;

    width: 100%;
    height: 250px;

    background-color: #000;

    animation: pulse 2s ease infinite forwards;
  }
}
</style>