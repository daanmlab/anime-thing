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
#Anime {
  position: fixed;
  padding: 7em 6vw 0 7em;
}
</style>