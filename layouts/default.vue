<template>
  <div
    id="container"
    :class="iFrame ? 'embedded-iframe': menuIsActive"
  >
    <Nav v-if="!iFrame" />
    <Header v-if="!iFrame" />
    <nuxt />
    <Footer v-if="!iFrame" />
    <label
      v-if="!iFrame"
      :class="menuIsActive"
      for="menu-toggle"
      class="nav-overlay"
    />
  </div>
</template>

<script>
// TODO: Just make separate entry point for embedded pages. Means duplication but right now
// there is a problem with links opening in new window and showing retailer info.
// This way it can all be sized and accounted for specifically for embedded pages.
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
      iFrame: 'iFrame/isIFrame'
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
      this.$store.dispatch('iFrame/setIFrame')
    }
  },
  mounted() {
    if (this.iFrame) {
      this.$store.dispatch('iFrame/setIFrame')
      if (process.client) {
        window.addEventListener('resize', () => {
          this.$store.dispatch('iFrame/postResize')
        })
      }
    }
    this.$store.dispatch('iFrame/postResize')
  },
  transition: {
    appear: true,
    name: 'fade',
    afterEnter(el) {
      console.log('caught transition enter')
      this.$store.dispatch('iFrame/postResize')
    }
  },
  head() {
    return {
      bodyAttrs: {
        class: (this.iFrame) ? 'embedded' : ''
      },
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
