<template>
  <header
    v-if="headers.length > 0"
    id="header"
    class="fixed"
  >
    <div
      ref="headerSwiper"
      v-swiper:headerSwiper="swiperOption"
      :style="{ backgroundImage: 'url(' + getBannerImg(headers[0].image) + ')'}"
      class="background"
    >
      <div class="swiper-wrapper">
        <div
          v-for="(header, key) of headers"
          :key="key"
          class="swiper-slide"
        >
          <div
            :style="{ backgroundImage: 'url(' + getBannerImg(header.image) + ')'}"
            class="background"
          >
            <h3
              v-if="header.heroTxt"
              v-html="header.heroTxt"
            />
            <p
              v-if="header.subTxt"
              v-html="header.subTxt"
            />
          </div>
        </div>
      </div>
      <div
        v-if="headers.length > 1"
        class="swiper-pagination swiper-pagination-bullets"
      />
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 6000,
          disableOnInteraction: true
        },
        effect: 'fade',
        loop: true,
        speed: 500,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  computed: {
    ...mapGetters({ headers: 'header/headers' })
  },
  watch: {
    headers(newHeaders, oldHeaders) {
      if (this.headerSwiper) {
        this.headerSwiper.removeAllSlides()
        this.headerSwiper.update()
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.updateSwiper)
  },
  destroyed() {
    window.removeEventListener('resize', this.updateSwiper)
  },
  methods: {
    updateSwiper() {
      if (this.headerSwiper) {
        this.headerSwiper.update()
      }
    },
    getBannerImg(image) {
      return require('~/assets/images/headers/' + image + '.jpg')
    }
  }
}
</script>

<style lang="scss">
@import 'swiper/dist/css/swiper.css';

#header.fixed {
  align-items: flex-start;
  overflow: hidden;
  width: 100%;
}

.swiper-container {
  align-items: center;
  background-color: getColor(background, body);
  display: flex;
  flex-direction: column;
  font-size: 38px;
  font-weight: 700;
  height: 100%;
  justify-content: center;
  overflow: hidden;
  position: relative;
  text-align: center;
  width: 100%;
  .swiper-pagination {
    > .swiper-pagination-bullet {
      background-color: getColor(state, success);
    }
  }
}
#header + * {
  box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.25);
  // transition: box-shadow 5s ease-in; //set in default.vue because of slideout menu
}
.scrolled #header + * {
  box-shadow: 0 -100px 200px rgba(0, 0, 0, 0.5);
}
#header .background {
  align-items: center;
  background-color: getColor(background, body);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: inset 0 $navbar-height/2 $navbar-height -$navbar-height/4 rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;
}

#header h3,
#header p {
  color: getColor(text, contrast);
  font-size: pxToEm(16);
  max-width: 600px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.75);
  width: 80vw;
}
#header p {
  font-size: pxToEm(10);
  a {
    color: lighten(getColor(text, linkHover), 20%);
    &:hover {
      color: getColor(text, linkHover);
    }
  }
}
</style>
