<template>
  <div id="Genres">
    <span class="genre" v-for="genre in genres" :key="genre">
      {{ genre }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    genres: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
#Genres {
  .genre {
    background-color: #ffffff3a;
    border-radius: 1em;
    padding: 0em 0.4em;
    margin: 0.2em 0.5em 0.2em 0;
    display: inline-block;
    font-size: 0.9em;
    font-weight: 800;
    color: #fff;
  }
}
</style>