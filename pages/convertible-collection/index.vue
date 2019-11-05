<template>
  <main class="convertibles">
    <header class="brand">
      <Logo />
    </header>
    <section class="categories">
      <ul>
        <li
          v-for="(category, key) of categories"
          :key="key"
          :class="category.slug"
        >
          <nuxt-link :to="'/convertible-collection/' + category.slug">
            <img
              :src="getThumbnail('convertibles-' + category.slug, 'convertibles')"
              alt="image thumbnail"
            >
            <div class="image" />
            <div class="copy">
              <h5 class="cat-title">
                {{ category.title }}
              </h5>
              <p class="cat-description">
                {{ category.description }}
              </p>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
import categories from '~/data/categories-convertible-collection'
import Logo from '~/assets/images/logos/logo-convertible.svg?inline'

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
        image: 'header-2'
      },
      {
        image: 'header-3'
      }
    ]
    this.$store.dispatch('header/changeHeaders', header)
  },
  methods: {
    getThumbnail(image, category) {
      return require('~/assets/images/products/' +
        category +
        '/' +
        image +
        '.jpg')
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
.categories ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  li {
    border: 20px double #555;
    margin: 2vw;
    padding: 8px 8px 0;
    transition-property: background, box-shadow;
    transition-duration: 400ms;
    transition-timing-function: ease-in-out;
    &:hover {
      background: #fff;
      box-shadow: 0 25px 15px -15px rgba(0, 0, 0, 0.25);
    }
  }
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
.categories ul li {
  .cat-title {
    color: #b1b3b3;
    text-align: center;
  }
  .cat-description {
    line-height: 1.1;
    text-align: center;
  }
  &.convertible-bracelets {
    border-color: #b1b3b3;
    .cat-description {
      color: #b1b3b3;
    }
  }
  &.by-the-sea {
    border-color: #cda077;
    .cat-description {
      color: #cda077;
    }
  }
  &.beauty-in-nature {
    border-color: #768f31; // originally #c5e86c
    .cat-description {
      color: #768f31;
    }
  }
  &.personal-touch {
    border-color: #e89cae;
    .cat-description {
      color: #e89cae;
    }
  }
  &.sparkle-and-shine {
    border-color: #bbbcbc;
    .cat-description {
      color: #bbbcbc;
    }
  }
  &.open-and-airy {
    border-color: #af95a6;
    .cat-description {
      color: #af95a6;
    }
  }
  &.joyful-moments {
    border-color: #9bcbeb;
    .cat-description {
      color: #9bcbeb;
    }
  }
  &.just-for-fun {
    border-color: #c8102e;
    .cat-description {
      color: #c8102e;
    }
  }
  &.petites {
    border-color: #b3b995;
    .cat-description {
      color: #b3b995;
    }
  }
}
</style>
