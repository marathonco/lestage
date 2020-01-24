<template>
  <!-- <li
    class="product"
    :class="product.categorySlug + ' ' + product.collectionSlug"
    :data-aos-delay="200*index"
    data-aos="flip-left"
    data-aos-anchor=".productList"
    data-aos-once="true"
  > -->
  <li
    class="product"
    :class="product.categorySlug + ' ' + product.collectionSlug"
  >
    <nuxt-link
      :to="routerLink"
      class="link"
    >
      <h5 class="title">
        {{ product.title }}
      </h5>
      <img
        :src="thumbnail"
        alt="image thumbnail"
        class="thumbnail"
        @error="fallbackImage"
      >
    </nuxt-link>
  </li>
</template>

<script>
// TODO: items not flipping if they start on screen consider using wow.js instead of aos.js

export default {
  props: {
    index: {
      type: Number,
      default: null
    },
    product: {
      type: Object,
      default: null,
      required: true
    }
  },
  computed: {
    routerLink() {
      return '/product/' + this.product.slug
    },
    thumbnail() {
      return (
        'https://marathon-co.com/media/lestage/' +
        this.product.collectionSlug +
        '/' +
        this.product.slug +
        '.jpg'
      )
    }
  },
  methods: {
    fallbackImage(event) {
      event.target.src = require('~/assets/images/fallback.svg')
    }
  }
}
</script>

<style lang="scss">
$thumbSize: 140px;
.productList {
  .product {
    background: #ffffff;
    height: $thumbSize;
    margin: 10px;
    position: relative;
    width: $thumbSize;

    .link {
      align-items: center;
      display: flex;
      height: $thumbSize;
      justify-content: center;
      overflow: hidden;
      position: relative;
      width: $thumbSize;
    }

    &::after {
      // box-shadow
      box-shadow: 0px 15px 15px -15px rgba(0, 0, 0, 0.75);
      content: '';
      height: 100%;
      left: 0;
      opacity: 1;
      position: absolute;
      top: 0;
      transition: box-shadow $transition-duration ease-in-out;
      width: 100%;
      z-index: -1;
    }

    .thumbnail {
      background: #ffffff;
      max-width: 100%;
      max-height: 100%;
    }

    .title {
      align-content: center;
      align-items: center;
      background: rgba(255, 255, 255, 0);
      bottom: -100%;
      display: flex;
      justify-content: center;
      height: $thumbSize;
      margin: 0;
      padding: 0 0.75rem;
      position: absolute;
      transition: bottom $transition-duration ease-in-out,
        background $transition-duration ease-in-out;
      width: $thumbSize;
      z-index: 50px;
    }
    &:hover {
      &::after {
        // box-shadow
        box-shadow: 0px 5px 15px -5px rgba(0, 0, 0, 0.75);
      }

      .title {
        background: rgba(255, 255, 255, 0.75);
        bottom: 0;
      }
    }
  }
}
</style>
