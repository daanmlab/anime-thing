<template>
  <div id="Anime">
    <Title :title="title" :secondaryTitle="secondaryTitle" />
    <Genres :genres="this.anime.genres" />
    <Description v-if="description" :description="description" />
  </div>
</template>

<script>
import Title from "./Title";
import Description from "./Description";
import Genres from "./Genres";

export default {
  components: {
    Title,
    Description,
    Genres,
  },
  props: {
    anime: {
      type: Object,
      required: true,
    },
  },
  computed: {
    title() {
      return this.anime.titles[Object.keys(this.anime.titles)[0]];
    },
    secondaryTitle() {
      return this.anime.titles[Object.keys(this.anime.titles)[1]] ?? null;
    },
    description() {
      return this.anime.descriptions[Object.keys(this.anime.descriptions)[0]];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~bulma";
#Anime {
  position: fixed;
  margin: 5em 6vw 0 5em;
  padding: 2em;
  border: #ffffff26 solid 3px;
  border-radius: 1em;
  box-shadow: 0 0 20px #0000001c;
  color: #ffffffcf;

  @include touch {
    padding: 3em 2em 2em 2em;
    width: -webkit-fill-available;

    margin: 2em;
    pointer-events: none;
  }
}
</style>