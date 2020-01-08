<template>
  <!-- <li
    class="product"
    :data-aos-delay="200*index"
    data-aos="flip-left"
    data-aos-anchor="#productList"
    data-aos-once="true"
  > -->
  <li class="product">
    <nuxt-link
      :to="routerLink"
      class="link"
    >
      <div class="title">
        {{ product.title }}
      </div>
      <img
        :src="thumbnail"
        alt="image thumbnail"
      >
    </nuxt-link>
  </li>
</template>

<script>
// TODO: items not flipping if they start on screen
export default {
  props: {
    index: {
      type: Number,
      default: null
    },
    product: {
      type: Object,
      default: null
    }
  },
  computed: {
    routerLink() {
      return 'test'
    },
    thumbnail() {
      return 'https://via.placeholder.com/200x200'
    }
  }
}
</script>

<style lang="scss">
$thumbSize: 140px;
.product {
  background: #ffffff;
  height: $thumbSize;
  margin: 10px;
  position: relative;
  width: $thumbSize;

  .link {
    display: block;
    height: $thumbSize;
    overflow: hidden;
    position: relative;
    width: $thumbSize;
  }

  &::after {
    // box-shadow
    box-shadow: 0px 15px 15px -15px rgba(0, 0, 0, 0.5);
    content: '';
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    transition: opacity $transition-duration ease-in-out;
    width: 100%;
    z-index: -1;
  }

  img {
    background: #ffffff;
  }

  .title {
    align-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0);
    bottom: -100%;
    display: flex;
    justify-content: center;
    padding: 1rem;
    position: absolute;
    transition: bottom $transition-duration ease-in-out,
      background $transition-duration ease-in-out;
    width: 100%;
    z-index: 50px;
  }
  &:hover {
    &::after {
      // box-shadow
      opacity: 1;
    }

    .title {
      background: rgba(0, 0, 0, 0.25);
      bottom: 0;
    }
  }
}
</style>
