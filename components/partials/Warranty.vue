<template>
  <section class="fill accent">
    <div class="center">
      <h3>Maintaining A Classic</h3>
      <p>
        Our authentic Cape Cod Jewelry<sup>®</sup> Collection is part of a storied company history focused on quality, design and craftsmanship using responsibly sourced precious metals backed by a lifetime warranty.
      </p>
      <nuxt-link
        to="/warranty"
        class="button rounded primary bordered"
      >Learn More</nuxt-link>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.center {
  max-width: 800px;
}
h3,
p {
  color: getColor(text, primary);
  margin-bottom: 1rem;
  text-align: center;
}
</style>
