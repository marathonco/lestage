<template>
  <main class="main">
    <section class="collections">
      <div class="collection cape-cod">
        <div class="copy">
          <CapeCodLogo />
          <h4>A Legacy in Craftsmanship</h4>
          <p>
            Our authentic Cape Cod Jewelry<sup>®</sup> Collection is part of a
            storied company history focused on quality, design, and craftsmanship
            using responsibly sourced precious metals backed by a lifetime
            warranty.
          </p>
          <nuxt-link
            to="products/cape-cod-collection"
            class="button rounded primary bordered"
          >
            View Collection
          </nuxt-link>
        </div>
      </div>
      <div class="collection cape-cod slider">
        <div
          v-swiper:productSwiperCapeCod="swiperOptionCapeCod"
          class="product-image background-1"
        >
          <div class="swiper-wrapper">
            <div
              v-for="(productImage, key) of productImagesCapeCod"
              :key="key"
              class="swiper-slide"
            >
              <nuxt-link to="products/cape-cod-collection">
                <img
                  :src="getProductImage(productImage, 'cape-cod')"
                  class="swiper-slide-image"
                >
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="collection convertible-collection">
        <div class="copy">
          <ConvertibleLogo />
          <h4>So many options...</h4>
          <p>The Convertible Collection<sup>®</sup> offers endless style possibilities. Select a bracelet from various designs and then choose from over 300 interchangeable clasps that fit on the bracelet. </p>
          <nuxt-link
            to="products/convertible-collection"
            class="button rounded primary bordered"
          >
            View Collection
          </nuxt-link>
        </div>
      </div>
      <div class="collection convertible-collection slider">
        <div
          v-swiper:productSwiperConvertible="swiperOptionConvertible"
          class="product-image convertible"
        >
          <div class="swiper-wrapper">
            <div
              v-for="(productImage, key) of productImagesConvertible"
              :key="key"
              class="swiper-slide"
            >
              <nuxt-link to="products/convertible-collection">
                <img
                  :src="getProductImage(productImage, 'convertibles')"
                  class="swiper-slide"
                >
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="collection evening-tide">
        <div class="copy">
          <EveningTideLogo />
          <h4>Everyday elegance</h4>
          <p>The Evening Tide Collection encompasses a large assortment of jewelry highlighting the relaxed, yet refined lifestyle of the beach. The Collection is the perfect complement to Cape Cod Jewelry and the Convertible Collection.</p>
          <nuxt-link
            to="products/evening-tide-collection"
            class="button rounded primary bordered"
          >
            View Collection
          </nuxt-link>
        </div>
      </div>
      <div class="collection evening-tide slider">
        <div
          v-swiper:productSwiperEveningTide="swiperOptionEveningTide"
          class="product-image evening-tide"
        >
          <div class="swiper-wrapper">
            <div
              v-for="(productImage, key) of productImagesEveneningTide"
              :key="key"
              class="swiper-slide"
            >
              <nuxt-link to="products/evening-tide-collection">
                <img
                  :src="getProductImage(productImage, 'evening-tide')"
                  class="swiper-slide"
                >
              </nuxt-link>
            </div>
          </div>
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
      <nuxt-link
        to="/about"
        class="button rounded primary bordered"
      >
        See the History
      </nuxt-link>
    </section>
    <Preservation />
  </main>
</template>

<script>
import CapeCodLogo from '~/assets/images/logos/logo-cape-cod-round.svg?inline'
import ConvertibleLogo from '~/assets/images/logos/logo-convertible-round.svg?inline'
import EveningTideLogo from '~/assets/images/logos/logo-evening-tide-round.svg?inline'
import Preservation from '~/components/partials/Preservation'

export default {
  name: 'HomePage',
  components: {
    CapeCodLogo,
    ConvertibleLogo,
    EveningTideLogo,
    Preservation
  },
  data() {
    return {
      swiperOptionCapeCod: {
        autoplay: {
          delay: 3000,
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
      swiperOptionConvertible: {
        autoplay: {
          delay: 4500,
          disableOnInteraction: true
        },
        loop: true,
        speed: 1000,
        effect: 'slide'
      },
      swiperOptionEveningTide: {
        autoplay: {
          delay: 7500,
          disableOnInteraction: true
        },
        loop: true,
        speed: 1000,
        effect: 'slide'
      },
      productImagesCapeCod: [
        'cape-cod-bracelets-1',
        'cape-cod-anklets-1',
        'cape-cod-earrings-1',
        'cape-cod-necklaces-1',
        'cape-cod-rings-1'
      ],
      productImagesConvertible: ['convertible-1', 'convertible-2'],
      productImagesEveneningTide: ['evening-tide-bracelet', 'evening-tide-ring']
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
    getProductImage(image, category) {
      return require('~/assets/images/products/' +
        category +
        '/' +
        image +
        '.png')
    }
  }
}
</script>
<style lang="scss">
@import 'swiper/dist/css/swiper.css';
.collection {
  &.cape-cod,
  &.cape-cod div.copy {
    background: getColor(background, accent);
  }
  &.convertible-collection,
  &.convertible-collection div.copy {
    background: getColor(background, accent3);
  }
  &.evening-tide,
  &.evening-tide div.copy {
    background: #ffe6a1;
  }
}
.collection div.copy {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  padding: 1rem;
  h4 {
    margin-top: 0;
  }
  p {
    margin-bottom: 0;
  }
  svg {
    min-width: 150px;
    margin: 1rem;
    max-width: 100%;
    max-height: 150px;
  }
}
@include tablet {
  .collections {
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-template-rows: auto auto;
    grid-auto-flow: row;
    justify-content: center;
    .collection.slider {
      grid-row-start: 2;
    }
    .collection.cape-cod {
      grid-column-start: 1;
    }
    .collection.convertible-collection {
      grid-column-start: 2;
    }
    .collection.evening-tide {
      grid-column-start: 3;
    }
  }
}
.collection .swiper-wrapper,
.collection .swiper-container {
  height: auto !important;
}
.product-image a {
  align-items: center;
  display: flex;
  max-height: 50vh;
  position: relative;
  img {
    margin: 0 auto;
    max-height: 40vh;
    width: auto;
  }
}
.product-image::after {
  background-color: rgba(255, 255, 255, 1);
  content: '';
  display: block;
  height: 100%;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 1s linear; // must be less time than the animation speed of the swiper
  width: 100%;
}
.product-image.changing::after {
  opacity: 1;
}

@mixin product-image-background($angle, $color, $stop) {
  background: linear-gradient($angle, $color $stop, #ffffff $stop);
}
.product-image {
  background: #ffffff;
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
