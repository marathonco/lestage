<template>
  <nav
    id="nav"
    role="navigation"
  >
    <div id="navbar">
      <div class="navbar-left">
        <nuxt-link
          to="/retailers"
          class="navbar-item"
        >Find A Retailer</nuxt-link>
      </div>
      <div class="navbar-center">
        <nuxt-link
          to="/"
          class="navbar-item logo"
        >
          <Logo />
        </nuxt-link>
      </div>
      <div class="navbar-right" />
    </div>
    <Drawer />
  </nav>
</template>

<script>
import Drawer from '~/components/core/Drawer'
import Logo from '~/assets/images/logos/logo-lestage.svg?inline'

// add `.scrolled` to `body` if page has been scrolled
if (process.browser) {
  window.onscroll = () => {
    if (window.scrollY <= 10) {
      document.body.classList.remove('scrolled')
    } else document.body.classList.add('scrolled')
  }
}

export default {
  components: {
    Drawer,
    Logo
  }
}
</script>

<style lang="scss">
$navbarHeight: 60px;
$navbarColor: getColor(text, contrast);
$navbarLinkColor: getColor(text, contrast);
$navbarLinkColorHover: getColor(text, contrast);

$navbarContrastColor: getColor(text, primary);
$navbarContrastLinkColor: getColor(text, primary);
$navbarContrastLinkColorHover: getColor(text, primary);

$menu-transition-duration: 3 * $transition-duration;
#nav {
  position: absolute;
  width: 100vw;
  @include tablet {
    position: fixed;
    top: 0;
  }
  z-index: 1200;
}
#navbar {
  @include contentColor($navbarColor, $navbarLinkColor, $navbarLinkColorHover);
  @include font-accent;
  align-items: center;
  background-color: rgba(255, 255, 255, 0);
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
  display: flex;
  flex-direction: row;
  font-size: pxToEm(12);
  height: $navbarHeight;
  position: absolute;
  transition: background $menu-transition-duration linear,
    box-shadow $menu-transition-duration linear;
  width: 100%;
  z-index: 1200;
  @include tablet {
    position: fixed;
    top: 0;
  }
  * {
    transition: color $menu-transition-duration linear;
  }
}
.navbar-left,
.navbar-center,
.navbar-right {
  flex: 1;
}

.navbar-left {
  display: none;
  padding-left: 1rem;
  text-align: left;
}
.navbar-center {
  padding: 5px 60px;
}
.navbar-right {
  display: none;
}

@include tablet {
  .navbar-left,
  .navbar-right {
    display: block;
  }
}

.logo {
  display: block;
  height: 100%;
  // margin: auto;
  // padding: 1rem;
  svg {
    max-height: 100%;
    max-width: 100%;
  }
  path {
    fill: getColor(background, light);
    transition: fill $menu-transition-duration linear;
  }
}

.scrolled #navbar {
  @include contentColor(
    $navbarContrastColor,
    $navbarContrastLinkColor,
    $navbarContrastLinkColorHover
  );
  background-color: getColor(background, light);
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
  .logo path {
    fill: getColor(text, primary);
  }
}

.nav-overlay {
  background: rgba(156, 137, 137, 0.4);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 0;
  height: 0;
  opacity: 0;
  transition: opacity $menu-animation-duration ease-out;
  transition-delay: (0.5 * $menu-animation-duration);
  z-index: 1;

  &.is-active {
    width: 100%;
    height: 100%;
    opacity: 1;
  }
}
</style>
