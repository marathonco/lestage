<template>
  <main>
    <header class="brand">
      <Logo />
    </header>
    <section class="categories">
      <ul>
        <li
          v-for="(category, key) of categories"
          :key="key"
        >
          <div class="image">
            <nuxt-link :to="'/cape-cod/' + category.slug">
              <img
                :src="getThumbnail(category.thumbnails)"
                alt="image thumbnail"
              >
            </nuxt-link>
          </div>
          <div class="copy">
            <h5 class="cat-title">
              {{ category.title }}<sup>®</sup>
            </h5>
            <p class="cat-description">
              {{ category.description }}
            </p>
            <nuxt-link
              :to="'/cape-cod/' + category.slug"
              class="button primary rounded bordered"
            >View {{ category.slug }}</nuxt-link>
          </div>
        </li>
      </ul>
    </section>
    <aside class="filler gull">
      <img
        src="~/assets/images/fillers/gull.jpg"
        alt="artwork"
        data-aos="zoom-in"
      >
    </aside>
  </main>
</template>

<script>
import categories from '~/data/categories-cape-cod'
import Logo from '~/assets/logo-cape-cod.svg?inline'

export default {
  name: 'Products',
  components: {
    Logo
  },
  data() {
    return {
      categories
    }
  },
  mounted() {
    const header = [
      {
        image: 'header-0'
      },
      {
        image: 'header-1'
      },
      {
        image: 'header-4'
      }
    ]
    this.$store.dispatch('header/changeHeaders', header)
  },
  methods: {
    getThumbnail(thumbnails) {
      return require('~/assets/images/products/category/' +
        thumbnails[0] +
        '.png')
    }
  },
  head() {
    return {
      title: 'Authentic Cape Cod Jewelry',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: 'Authentic Sterling Silver and 14K Gold Cape Cod Jewelry.'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.categories {
  li {
    display: block;
    width: 100%;
  }
  .image,
  .copy {
    background: getColor(background, accent);
    display: block;
    padding: 1rem;
  }
  .image {
    background: #fff;
  }
}
@include tablet {
  .categories {
    li {
      align-items: center;
      display: flex;
      flex-direction: row;
      height: 50vw;
      width: 100vw;
    }
    .image,
    .copy {
      align-content: center;
      align-items: center;
      display: flex;
      flex-direction: column;
      height: 50vw;
      justify-content: center;
      padding: 2rem;
      width: 50vw;
    }
    li:nth-child(odd) {
      flex-direction: row-reverse;
    }
  }
}
.filler.gull {
  background: #fff;
  height: 100%;
  max-height: 600px;
  max-width: 600px;
  padding: 2rem;
  width: 100%;
  img {
    height: 100%;
    width: 100%;
  }
}
</style>
