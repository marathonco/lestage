<template>
  <main>
    <section class="lead">
      <div class="content">
        <h3>Exceptional Craftsmanship</h3>
        <p>
          The acceptance and achievements of Marathon &amp; LeStage have been
          due to our ability to manufacture fine jewelry of superior design and
          craftsmanship - backed by a Lifetime Guarantee accompanied with every
          item we manufacture.
        </p>
      </div>
      <div class="filler">
        <img
          src="~/assets/images/fillers/polishing-animated.gif"
          alt="craftsmanship"
          data-aos="fade-left"
        >
      </div>
    </section>
    <Responsibility />
    <section class="history">
      <div class="content">
        <h3>Good Catch</h3>
        <p>
          The company's drive to succeed began with baseball. Our founder,
          Donald LeStage, excelled for local clubs in North Attleboro and during
          his college career at Brown University. After receiving professional
          contract offers for his catching services, Donald opted to bring that
          same drive for excellence to the jewelry industry. Established in
          1863, LeStage Manufacturing's guiding principle has always been an
          honest insistence on the highest quality products and the absolute
          best service. And that principle, much like the LeStage family’s
          connection to fine jewelry, has endured for generations.
        </p>
      </div>
      <div class="filler">
        <img
          src="~/assets/images/fillers/craftsmanship.jpg"
          alt="polishing"
          data-aos="fade-left"
        >
      </div>
    </section>
    <section class="fill accent3">
      <h4>Attleboro Roots, Cape Cod Spirit</h4>
      <p>
        It started with a phone call from 4th generation owner Matthew LeStage
        to a jeweler on Cape Cod about a bracelet he made laying the foundation
        for what would ultimately become the classic bracelet &amp; brand that
        we know today.
      </p>
    </section>
    <Preservation />
  </main>
</template>

<script>
import Preservation from '~/components/partials/Preservation'
import Responsibility from '~/components/partials/Responsibility'

export default {
  components: {
    Preservation,
    Responsibility
  },
  mounted() {
    const header = [
      {
        image: 'header-about',
        heroTxt: 'Marathon Co. & LeStage Manufacturing'
      }
    ]
    this.$store.dispatch('header/changeHeaders', header)
  },
  head() {
    return {
      title: 'About LeStage Manufacturing',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: 'Creating Exceptional Jewelry for Generations.'
        }
      ]
    }
  }
}
</script>
<style lang="scss">
.fill {
  img {
    max-width: 50%;
  }
  p {
    line-height: 1.4;
    text-align: center;
    max-width: 600px;
  }
}
.lead,
.history {
  @include tablet {
    align-items: center;
    display: flex;
    .content {
      max-width: 50vw;
    }
  }

  .filler {
    padding: 1rem 3rem;
    img {
      max-height: 80vh;
    }
  }
}
.extra {
  max-height: 200px;
}
// .bios {
//   padding: 1rem 3rem;
//   .bio {
//     align-items: center;
//     display: flex;
//   }
//   img {
//     max-height: 200px;
//   }
// }
</style>
