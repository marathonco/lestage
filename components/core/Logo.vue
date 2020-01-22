<template>
  <header class="brand">
    <LogoCapeCod v-if="collection === 'cape-cod'" />
    <LogoConvertibles v-if="collection === 'convertible-collection'" />
  </header>
</template>

<script>
import LogoCapeCod from '~/assets/images/logos/logo-cape-cod.svg?inline'
import LogoConvertibles from '~/assets/images/logos/logo-convertible.svg?inline'
import { mapGetters } from 'vuex'

export default {
  components: {
    LogoCapeCod,
    LogoConvertibles
  },
  computed: {
    ...mapGetters({
      collection: 'shop/collection'
    })
  }
}
</script>

<style lang="scss">
</style>
