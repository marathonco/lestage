<template>
  <header class="brand">
    <LogoCapeCod v-if="collection === 'cape-cod'" />
    <LogoConvertibles v-if="collection === 'convertible-collection'" />
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
