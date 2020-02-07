<template>
  <header class="brand">
    <LogoCapeCod v-if="groups.collection === 'cape-cod-collection' && groups.category === null" />
    <LogoConvertibles v-if="groups.collection === 'convertible-collection' && groups.category === null" />
    <img
      :src="bannerLink"
      @error="imgError"
    >
  </header>
</template>

<script>
import LogoCapeCod from '~/assets/images/logos/logo-cape-cod.svg?inline'
import LogoConvertibles from '~/assets/images/logos/logo-convertible.svg?inline'

export default {
  components: {
    LogoCapeCod,
    LogoConvertibles
  },
  props: {
    groups: {
      type: Object,
      default: null
    }
  },
  computed: {
    bannerLink() {
      if (this.groups.category !== null) {
        return require(`@/assets/images/headers/banner-${this.groups.category}.png`)
      } else {
        return ''
      }
    }
  },
  methods: {
    imgError() {
      this.src = ''
    }
  }
}
</script>

<style lang="scss">
</style>
