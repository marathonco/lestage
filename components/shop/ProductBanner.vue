<template>
  <header class="brand">
    <LogoCapeCod v-if="groups.collection === 'cape-cod-collection' && groups.category === null" />
    <LogoConvertibles v-if="groups.collection === 'convertible-collection' && groups.category === null" />
    <LogoEveningTide v-if="groups.collection === 'evening-tide-collection' && groups.category === null" />
    <img
      v-if="groups.category !== null"
      :src="banner"
      @error="banner=''"
    >
  </header>
</template>

<script>
import LogoCapeCod from '~/assets/images/logos/logo-cape-cod.svg?inline'
import LogoConvertibles from '~/assets/images/logos/logo-convertible.svg?inline'
import LogoEveningTide from '~/assets/images/logos/logo-evening-tide.svg?inline'

export default {
  components: {
    LogoCapeCod,
    LogoConvertibles,
    LogoEveningTide
  },
  props: {
    groups: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      banner: `/banners/banner-${this.groups.category}.png`
    }
  },
  // computed: {
  //   bannerLink() {
  //     if (this.groups.category !== null) {
  //       return require(`@/assets/images/headers/banner-${
  //         this.groups.category
  //       }.png`)
  //     } else {
  //       return ''
  //     }
  //   }
  // },
  methods: {
    imgError() {
      this.src = ''
    }
  }
}
</script>

<style lang="scss">
</style>
