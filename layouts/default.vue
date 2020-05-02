<template>
  <div
    id="container"
    :class="embedded ? 'embedded ' + menuIsActive : menuIsActive"
  >
    <Nav v-if="embedded !== true" />
    <Header v-if="embedded !== true" />
    <nuxt />
    <Footer v-if="embedded !== true" />
    <label
      v-if="embedded !== true"
      :class="menuIsActive"
      for="menu-toggle"
      class="nav-overlay"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '~/components/layout/Header'
import Nav from '~/components/layout/Nav'
import Footer from '~/components/layout/Footer'

export default {
  components: {
    Header,
    Nav,
    Footer
  },
  computed: {
    ...mapGetters({
      embedded: 'embed/isEmbedded'
    }),
    menuIsActive() {
      return this.$store.state.menu.menuIsActive ? 'is-active' : ''
    }
  },
  watch: {
    $route() {
      this.$store.dispatch('header/changeHeaders', [])
      this.$store.dispatch('menu/closeMenu')
    }
  },
  beforeCreate() {
    if (this.$route.query.embed) {
      this.$store.dispatch('embed/setEmbedded')
    }
  },
  mounted() {
    if (this.$route.query.embed) {
      this.$store.dispatch('embed/setEmbedded')
      if (process.client) {
        window.addEventListener('resize', () => {
          this.$store.dispatch('embed/postResize')
        })
      }
    }
    this.$store.dispatch('embed/postResize')
  },
  transition: {
    appear: true,
    name: 'fade',
    afterEnter(el) {
      this.$store.dispatch('embed/postResize')
    }
  },
  head() {
    return {
      title: 'LeStage Manufacturing',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: 'LeStage Manufacturing.'
        },
        {
          vmid: 'keywords',
          name: 'keywords',
          content:
            'Cape Cod, Jewelry, Authentic, Original, Lifetime, Sterling Silver, Silver, Screwball, Bead'
        }
      ]
    }
  }
}
</script>
<style lang="scss">
$header-height: 40vw;
$header-height-large: 30vw;

#container {
  transition: transform $menu-animation-duration ease-in-out;
}

#container {
  #navbar,
  #header,
  & > main,
  #footer {
    transition: all $menu-animation-duration ease-in-out;
    // z-index: 2;
  }

  &.is-active {
    #navbar,
    #header,
    & > main,
    #footer {
      transform: translate3d(-$drawer-width-small, 0, 0);

      @include tablet {
        transform: translate3d(-$drawer-width-medium, 0, 0);
      }

      @include desktop {
        transform: translate3d(-$drawer-width-large, 0, 0);
      }
    }
  }

  #header {
    height: $header-height;
    // max-height: 40vh;
    width: 100vw;
    position: fixed;
    z-index: 2 !important;
    @include desktop {
      height: $header-height-large;
    }
  }

  & > main {
    background-color: getColor(background, body);
    z-index: 3;
  }

  #header + main {
    margin-top: $header-height;
    @include desktop {
      margin-top: $header-height-large;
    }
  }
}

#nav + main {
  border-top: 60px solid getColor(text, accent);
}

body .brand {
  display: block;
  margin: 1rem auto;
  max-width: 800px;
  width: 100%;
  svg {
    margin: 0 auto;
    max-width: 90%;
  }
  path {
    fill: getColor(text, primary); // navy
  }
}
</style>
