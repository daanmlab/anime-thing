<template>
  <div id="List">
    <img
      v-for="anime in animes"
      @click="selectAnime(anime)"
      class="custom--image"
      :class="{ selected: anime === $store.state.anime.selected }"
      :src="anime.cover_image"
      :data-id="anime.id"
      :key="anime.id"
    />
    <template v-if="$store.state.anime.loading">
      <div class="skeleton-container">
        <span v-for="skeleton in 10" class="skeleton" :key="skeleton"></span>
      </div>
    </template>
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
@import "~bulma";

$gap: 10px;
#List {
  padding: calc(50vh - 100px) 0 calc(100vh - 280px);
  display: inline-flex;
  flex-direction: column;
  height: 100%;

  img.custom--image {
    width: 100%;
    padding: $gap 0;

    transition: transform 500ms, margin 500ms;
    transform: scale(100%, 100%);

    &.selected {
      transform: scale(120%, 120%);
      padding: $gap * 2 0;
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

  .skeleton-container {
    display: flex;
    flex-direction: column;
    .skeleton {
      width: 100%;
      height: 250px;
      margin: $gap 0;

      background-color: #000;

      animation: pulse 2s ease infinite forwards;
    }
  }

  @include touch {
    padding: 1rem calc(50vw - 80px);
    flex-direction: row;

    img.custom--image {
      // to counter stretching
      min-width: min-content;
      min-height: min-content;
      margin: 0 0;
      padding: 0 $gap * 2;

      &.selected {
        transform: scale(120%, 120%);
        margin: 0 0;
      }

      &:last-child {
        padding-right: calc(50vw - 100px);
      }
    }
    .skeleton-container {
      .skeleton {
        display: block;
        width: 150px;
        height: 100%;
        margin: 0 $gap;
      }
    }
  }
}
</style>