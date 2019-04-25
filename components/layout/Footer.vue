<template>
  <footer id="footer">
    <p>Every piece of LeStage® Cape Cod Jewelry® is made in the U.S.A. and is certified by the responsible jewellry council. LeStage® is not affiliated with Eden Hand Arts of Dennis, MA. the creator of the Cape Cod Screwball® bracelet. LeStage® and Cape Cod Jewelry® are registered trademarks owned by Marathon Company.</p>
    <p>
      Send inquiries, comments, and feedback to:
      <a :href="encodeURI('mailto:info@lestage.com')">
        {{ encodeURI('info@lestage.com') }}
      </a>
    </p>
    <p class="copyright">
      © {{ year }} Marathon Company, Inc. All rights reserved.
    </p>
  </footer>
</template>

<script>
export default {
  computed: {
    year() {
      const currentYear = new Date().getFullYear()
      return currentYear
    }
  }
}
</script>

<style lang="scss">
#footer {
  background: getColor(background, accent2);
  padding: 2rem 4rem 1rem;
  text-align: center;
  width: 100%;
  p {
    @include font-accent;
    font-size: pxToEm(10);
  }
}
</style>
