<template>
  <section class="fill">
    <div class="center">
      <h3>Responsible Manufacturing</h3>
      <p>We believe our workforce is the heart and soul of our brand. We strictly adhere to responsible and ethical practices that make careers at LeStage Manufacturing lasting ones.</p>
      <nuxt-link
        to="/responsibility"
        class="button rounded contrast bordered"
      >Learn More</nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  components: {}
}
</script>

<style lang="scss" scoped>
.fill {
  background-image: url('~assets/images/headers/header-responsibility.jpg');
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;

  // image is 3x2
  height: 66vw;
  justify-content: center;
  max-height: 75vh;
  min-height: 300px;
  width: 100%;
}
.center {
  max-width: 800px;
}
h3,
p {
  color: getColor(text, contrast);
  margin-bottom: 1rem;
  text-align: center;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
}
</style>
