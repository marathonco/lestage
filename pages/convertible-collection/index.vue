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
            <nuxt-link :to="'/convertible-collection/' + category.slug">
              <img
                :src="getThumbnail(category.slug)"
                alt="image thumbnail"
              >
            </nuxt-link>
          </div>
          <div class="copy">
            <h5 class="cat-title">
              {{ category.title }}
            </h5>
            <p class="cat-description">
              {{ category.description }}
            </p>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
import categories from '~/data/categories-convertible-collection'
import Logo from '~/assets/logo-convertible.svg?inline'

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
    getThumbnail(catSlug) {
      return require('~/assets/images/products/category/' + catSlug + '.jpg')
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
}
.cat-title {
  font-weight: 800;
  text-transform: uppercase;
  font-size: 1.1rem;
}
.cat-description {
  @include font-accent;
  font-size: 0.8rem;
  font-weight: 200;
  text-transform: uppercase;
}
@include tablet {
  .categories ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    li {
      width: 32vw;
      .cat-title,
      .cat-description {
        text-align: center;
      }
    }
  }
}
</style>
