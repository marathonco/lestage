<template>
  <section class="fill">
    <div class="center">
      <h3>Preserving a Classic</h3>
      <p>LeStage<sup>®</sup> works with local Cape Cod artists and organizations to preserve the classic look and feel of the Cape. Click below to find out more about how we give back to the community.</p>
      <nuxt-link
        to="/preservation"
        class="button rounded contrast bordered"
      >Learn More</nuxt-link>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.fill {
  background-image: url('~assets/images/fillers/preservation.jpg');
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;

  // image is 3x2
  height: 66vw;
  justify-content: center;
  max-height: 80vh;
  min-height: 400px;
  width: 100%;
}
.center {
  max-width: 800px;
}
h3,
p,
p * {
  color: getColor(text, contrast);
  margin-bottom: 1rem;
  text-align: center;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
}
</style>
