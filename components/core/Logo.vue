<template>
  <header class="brand">
    <LogoCapeCod v-if="collection === 'cape-cod'" />
    <LogoConvertibles v-if="collection === 'convertible-collection'" />
    <LogoEveningTide v-if="collection === 'evening-tide'" />
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
    collection: {
      type: String,
      default: null,
      required: true
    }
  }
}
</script>

<style lang="scss">
</style>
