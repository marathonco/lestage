<template>
  <main>
    <section class="collection">
      <div class="copy">
        <Logo />
        <h4>A Legacy in Craftsmanship</h4>
        <p>
          Our authentic Cape Cod Jewelry<sup>®</sup> Collection is part of a
          storied company history focused on quality, design, and craftsmanship
          using responsibly sourced precious metals backed by a lifetime
          warranty.
        </p>
        <nuxt-link to="/products" class="button rounded primary bordered">
          View Collection
        </nuxt-link>
      </div>
      <div
        v-swiper:productSwiper="swiperOption"
        class="product-image background-1"
      >
        <div class="swiper-wrapper">
          <div
            v-for="(productImage, key) of productImages"
            :key="key"
            class="swiper-slide"
          >
            <nuxt-link to="/products">
              <img :src="getProductImage(productImage)" class="swiper-slide">
            </nuxt-link>
          </div>
          <!-- <div class="swiper-button-prev" />
          <div class="swiper-button-next" /> -->
        </div>
      </div>
    </section>
    <section class="fill">
      <h3>The History</h3>
      <img
        src="~/assets/images/fillers/marathon-building.png"
        alt="Marathon Building"
        class="building"
      >
      <p>
        LeStage Manufacturing and Marathon Company pioneered the jewelry
        industry in Massachusetts during the 19th century. Both family owned and
        operated, we have been continuously manufacturing fine jewelry in the
        United States for over 150 years. In 2016, Marathon acquired LeStage,
        combining a heritage and legacy other jewelers can only hope for.
        Together, we have long established a reputation for integrity,
        reliability, quality and service.
      </p>
      <nuxt-link to="/about" class="button rounded primary bordered">
        See the History
      </nuxt-link>
    </section>
    <Preservation />
  </main>
</template>

<script>
import Logo from '~/assets/logo-cape-cod-round.svg?inline'
import Preservation from '~/components/partials/Preservation'

export default {
  name: 'HomePage',
  components: {
    Logo,
    Preservation
  },
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 4000,
          disableOnInteraction: true
        },
        loop: true,
        speed: 1000,
        effect: 'slide',
        on: {
          slideChangeTransitionStart() {
            this.el.classList.add('changing')
          },
          slideChangeTransitionEnd() {
            this.el.classList.remove('changing')
            this.el.classList.forEach(element => {
              if (
                element !== this.activeIndex &&
                element.startsWith('background-')
              ) {
                this.el.classList.remove(element)
              }
            })
            this.el.classList.add('background-' + this.activeIndex)
          }
        }
      },
      productImages: [
        'bracelets1',
        'anklets1',
        'earrings1',
        'necklaces1',
        'rings1'
      ]
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
        image: 'header-2'
      },
      {
        image: 'header-3'
      }
    ]
    this.$store.dispatch('header/changeHeaders', header)
  },
  methods: {
    getProductImage(image) {
      return require('~/assets/images/products/category/' + image + '.png')
    }
  }
}
</script>
<style lang="scss">
@import 'swiper/dist/css/swiper.css';
.collection div.copy {
  background: getColor(background, accent);
  padding: 1rem;
  h4 {
    margin-top: 0;
  }
  p {
    margin-bottom: 0;
  }
  svg {
    min-width: 150px;
    max-width: 25%;
    @include tablet-only {
      max-height: 100px;
    }
  }
}
@include tablet {
  //TODO: there is a window size where the content is greater than 50vw, and it breaks
  .collection {
    background: getColor(background, accent);
    align-items: center;
    display: flex;
    min-height: 50vw;
    padding: 0;
    position: relative;
    .copy,
    .product-image {
      width: 50vw;
    }
  }
}

.product-image a {
  background-color: rgba(255, 255, 255, 0);
  display: block;
  height: 100%;
  transition: background-color 1s; // must be less time than the animation speed of the swiper
  width: 100%;
}
.product-image.changing a {
  background-color: rgba(255, 255, 255, 1);
}

@mixin product-image-background($angle, $color, $stop) {
  background: linear-gradient($angle, $color $stop, #ffffff $stop);
}
.product-image {
  &.background-1 {
    @include product-image-background(
      202deg,
      getColor(background, accent2),
      35%
    );
  }

  &.background-2 {
    @include product-image-background(
      40deg,
      getColor(background, accent3),
      40%
    );
  }

  &.background-3 {
    @include product-image-background(
      218deg,
      getColor(background, accent4),
      50%
    );
  }

  &.background-4 {
    @include product-image-background(
      188deg,
      getColor(background, accent2),
      44%
    );
  }

  &.background-5 {
    @include product-image-background(
      217deg,
      getColor(background, accent3),
      22%
    );
  }

  &.background-6 {
    @include product-image-background(
      33deg,
      getColor(background, accent4),
      73%
    );
  }

  &.background-7 {
    @include product-image-background(
      261deg,
      getColor(background, accent2),
      40%
    );
  }

  &.background-8 {
    @include product-image-background(
      193deg,
      getColor(background, accent3),
      77%
    );
  }

  &.background-9 {
    @include product-image-background(
      13deg,
      getColor(background, accent4),
      60%
    );
  }
}
.building {
  margin: 0.5rem;
  max-width: 300px;
}
</style>
