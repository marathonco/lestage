<template>
  <div
    id="container"
    :class="menuIsActive"
  >
    <Nav />
    <Header />
    <nuxt />
    <Footer />
    <label
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
    menuIsActive() {
      return this.$store.state.menu.menuIsActive ? 'is-active' : ''
    }
  },
  transition: {
    appear: true,
    name: 'fade'
  },
  watch: {
    $route() {
      this.$store.dispatch('header/changeHeaders', [])
      this.$store.dispatch('menu/closeMenu')
    }
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
$header-height: 50vw;

#container {
  transition: transform $menu-animation-duration ease-in-out;
}

#container {
  #navbar,
  #header,
  & > main,
  #footer {
    transition: all $menu-animation-duration ease-in-out;
    z-index: 2;
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
    max-height: 80vh;
    width: 100vw;
    // max-height: 80vh;
    position: fixed;
    z-index: 1;
  }

  & > main {
    background-color: getColor(background, body);
  }

  #header + main {
    margin-top: $header-height;
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
