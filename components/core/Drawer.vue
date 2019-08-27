<template>
  <nav
    :class="isActive"
    class="nav-drawer"
  >
    <Hamburger />
    <ul class="nav-menu">
      <li
        v-for="(item, key) of menu"
        :key="key"
      >
        <nuxt-link
          :to="item.to"
          exact-active-class="is-active"
        >{{ item.title }}</nuxt-link>
      </li>
    </ul>
    <ul class="nav-social">
      <li
        v-for="(item, key) of social"
        :key="key"
      >
        <a :href="item.link">
          <icon :icon="['fab', item.icon]" />
        </a>
      </li>
    </ul>
    <ul class="nav-menu">
      <li>
        <a href="https://blog.lestage.com">Blog</a>
      </li>
    </ul>
    <div class="nav-byline">
      Visit
      <a href="https://marathon-co.com">Marathon Company</a> for all collections found in the Marathon/LeStage family.
    </div>
  </nav>
</template>

<script>
import menu from '~/data/menu.json'
import social from '~/data/social.json'
import Hamburger from '~/components/core/Hamburger'

export default {
  components: {
    Hamburger
  },
  data() {
    return {
      menu,
      social
    }
  },
  computed: {
    isActive() {
      return this.$store.state.menu.menuIsActive ? 'is-active' : ''
    }
  },
  methods: {
    loadIcon(icon) {
      return require('~/assets/images/icons/' + icon + '.svg')
    }
  }
}
</script>

<style lang="scss">
$menu-animation-duration: 2 * $transition-duration;

$drawer-bgcolor: getColor(background, light);
$drawer-width-small: 100%;
$drawer-width-medium: 300px;
$drawer-width-large: 500px;

.nav-drawer {
  background-color: $drawer-bgcolor;
  box-shadow: -0 0 0 rgba(0, 0, 0, 0.5);
  height: 100%;
  position: fixed;
  right: 0;
  transition-property: transform, box-shadow;
  transition-duration: $menu-animation-duration;
  transition-timing-function: ease-in-out;
  transform: translate3d(100%, 0, 0);
  width: $drawer-width-small;
  z-index: 1300;
  @include tablet {
    width: $drawer-width-medium;
  }
  @include desktop {
    width: $drawer-width-large;
  }
}

.nav-menu {
  li {
    @include line-after;
    // border-bottom: 1px solid getColor(state, disabled);
    font-size: pxToEm($h6-size);
    position: relative;
    width: 100%;
    a {
      background: rgba(255, 255, 255, 0);
      display: block;
      padding: 1.5rem 0;
      transition: background $transition-duration ease-in-out;
      width: 100%;
      &.is-active {
        background: getColor(background, accent);
        &:hover {
          cursor: default !important;
        }
      }
      &:hover {
        background: getColor(background, accent);
      }
    }
  }
}

.nav-social {
  @include line-after;
  padding: 0.5rem;
  li {
    display: inline-block;
    margin: 10px;
  }
  a {
    * {
      color: getColor(text, primary);
      fill: getColor(text, primary);
      font-size: 30px;
    }
    &:hover {
      * {
        color: getColor(text, secondary);
        fill: getColor(text, secondary);
      }
    }
  }
}

.nav-byline {
  @include font-accent;
  font-size: pxToEm(10);
  margin: 1rem;
  a {
    color: getColor(text, secondary);
  }
}

.nav-drawer.is-active {
  transform: translate3d(0, 0, 0);
  @include tablet {
    box-shadow: -5px 0 5px rgba(0, 0, 0, 0.25);
  }
}
</style>
