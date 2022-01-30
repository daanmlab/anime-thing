<template>
  <div id="List">
    <span
      v-for="anime in $store.state.anime.animes"
      @click="selectAnime(anime)"
      class="custom--image-container"
      :class="{ selected: anime === $store.state.anime.selected }"
      :data-id="anime.id"
      :key="anime.id"
    >
      <img class="custom--image" :src="anime.cover_image" />
    </span>

    <div class="skeleton-container">
      <span
        v-for="skeleton in $store.state.anime.loading ? 10 : 0"
        class="skeleton"
        :key="skeleton"
      ></span>
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
@import "~bulma";

$gap: 10px;
#List {
  padding: calc(50vh - 100px) 0 0;
  display: inline-flex;
  flex-direction: column;
  height: 100%;

  .custom--image-container {
    padding: $gap 0;
    transition: transform 500ms, padding 500ms;

    img.custom--image {
      width: 100%;
      border-radius: 0.5em;
      box-shadow: 0 0 0 0 #0000004a;

      transition: box-shadow 500ms;
    }

    &.selected {
      transform: scale(120%, 120%);
      padding: $gap * 2 0;

      img.custom--image {
        box-shadow: 0 0 20px 4px #0000004a;
      }
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
    display: grid;
    height: calc(50vh - 30px);
    overflow: hidden;
    .skeleton {
      width: 100%;
      height: 250px;
      margin: $gap 0;
      border-radius: 0.5em;

      background-color: rgba(255, 255, 255, 0.509);

      animation: pulse 2s ease infinite forwards;
    }
  }

  @include touch {
    padding: 1rem calc(50vw - 80px);
    flex-direction: row;
    width: max-content;

    .custom--image-container {
      padding: 0 $gap;
      transition: transform 500ms, padding 500ms;

      img.custom--image {
        height: 100%;
        min-width: min-content;
        min-height: min-content;
        border-radius: 3px;
        box-shadow: 0 0 0 0 #0000004a;

        transition: box-shadow 500ms;
      }

      &.selected {
        transform: scale(120%, 120%);
        padding: 0 $gap * 2;

        img.custom--image {
          box-shadow: 0 0 20px 4px #0000004a;
        }
      }
    }
    .skeleton-container {
      display: contents;
      width: calc(50vw - 30px);
      overflow: hidden;
      height: 100%;
      .skeleton {
        display: inline-block;
        width: 150px;
        height: 100%;
        margin: 0 $gap;
      }
    }
  }
}
</style>