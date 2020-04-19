<template>
  <div
    id="container"
    :class="embed ? 'embedded-iframe': menuIsActive"
  >
    <Nav v-if="!embed" />
    <Header v-if="!embed" />
    <nuxt />
    <Footer v-if="!embed" />
    <label
      v-if="!embed"
      :class="menuIsActive"
      for="menu-toggle"
      class="nav-overlay"
    />
  </div>
</template>

<script>
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
    embed() {
      return this.$store.state.embed.embed
    },
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
  mounted() {
    if (this.$route.query.embed) {
      this.$store.dispatch('embed/setEmbed')
    }
    this.$store.dispatch('embed/postResize')
  },
  // methods: {
  //   onResize() {
  //     const height = document.getElementById('container').offsetHeight
  //     console.log(height)
  //     window.parent.postMessage({
  //       frameHeight: height
  //     }, '*')
  //   }
  // },
  transition: {
    appear: true,
    name: 'fade'
  },
  head() {
    return {
      title: 'LeStage Manufacturing',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: 'Cape Cod Jewelry.'
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
