<template>
  <div id="Description">
    <p v-html="description"></p>
  </div>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
</style>