<template>
  <header class="brand">
    <img :src="bannerLink">
  </header>
</template>

<script>
export default {
  props: {
    banner: {
      type: String,
      default: null
    }
  },
  computed: {
    bannerLink() {
      return require(`~/assets/images/headers/banner-${this.banner}.png`)
    }
  }
}
</script>

<style lang="scss">
</style>
