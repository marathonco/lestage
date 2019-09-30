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

.products-list {
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;

  li {
    background: #ffffff;
    height: 140px;
    margin: 10px;
    overflow: hidden;
    position: relative;
    width: 140px;

    @include tablet {
      height: 250px;
      margin: 1rem;
      width: 250px;
    }
  }

  .link {
    img {
      transition: opacity $transition-duration linear;
    }

    .title {
      align-content: center;
      align-items: center;
      display: flex;
      height: 100%;
      justify-content: center;
      padding: 1rem;
      position: absolute;
      transition: top $transition-duration ease-in-out,
        right $transition-duration ease-in-out;
      width: 100%;
      z-index: 5;

      &::before {
        background: rgba(255, 255, 255, 0);
        content: '';
        height: 100%;
        position: absolute;
        transition: top $transition-duration ease-in-out,
          right $transition-duration ease-in-out;
        width: 100%;
        z-index: -1;
      }
    }
  }

  li .link:hover {
    img {
      opacity: 0 !important;
    }

    .title {
      right: 0 !important;
      top: 0 !important;

      &::before {
        right: 0 !important;
        top: 0 !important;
      }
    }
  }

  li:nth-child(1) {
    @include flagBackground(122deg, getColor(background, accent2), 35%);
  }

  li:nth-child(2) {
    @include flagBackground(40deg, getColor(background, accent), 40%);
  }

  li:nth-child(3) {
    @include flagBackground(218deg, getColor(background, accent3), 50%);
  }

  li:nth-child(4) {
    @include flagBackground(188deg, getColor(background, accent4), 44%);
  }

  li:nth-child(5) {
    @include flagBackground(217deg, getColor(background, accent2), 22%);
  }

  li:nth-child(6) {
    @include flagBackground(33deg, getColor(background, accent), 73%);
  }

  li:nth-child(7) {
    @include flagBackground(261deg, getColor(background, accent3), 40%);
  }

  li:nth-child(8) {
    @include flagBackground(193deg, getColor(background, accent4), 77%);
  }

  li:nth-child(9) {
    @include flagBackground(13deg, getColor(background, accent2), 60%);
  }

  li:nth-child(10) {
    @include flagBackground(68deg, getColor(background, accent), 28%);
  }

  li:nth-child(11) {
    @include flagBackground(232deg, getColor(background, accent3), 35%);
  }
}

body header.brand {
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
