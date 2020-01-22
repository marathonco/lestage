<template>
  <header class="brand">
    <LogoCapeCod v-if="collection === 'cape-cod-collection' && !category" />
    <LogoConvertibles v-if="collection === 'convertible-collection' && !category" />
    <img :src="bannerLink" @error="imgError">
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import LogoCapeCod from '~/assets/images/logos/logo-cape-cod.svg?inline'
import LogoConvertibles from '~/assets/images/logos/logo-convertible.svg?inline'

export default {
  components: {
    LogoCapeCod,
    LogoConvertibles
  },
  props: {
    banner: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapGetters({
      collection: 'shop/collection',
      category: 'shop/category'
    }),
    bannerLink() {
      if (this.category !== null) {
        return require(`@/assets/images/headers/banner-${this.category}.png`)
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
