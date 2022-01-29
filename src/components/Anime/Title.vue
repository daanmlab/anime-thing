<template>
  <div id="Title">
    <h3>{{ title }}</h3>
    <h4 v-if="secondaryTitle">{{ secondaryTitle }}</h4>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    secondaryTitle: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
#Title {
  h3 {
    font-size: 3em;
    line-height: 1.1;
  }
  h4 {
    font-weight: bold;
    color: #00000055;
  }
}
</style>