<template>
  <main>
    <section class="fill">
      <h2>Product Care</h2>
      <p>
        All of LeStage® by Marathon products are made form the highest quality
        natural silver which will patina with age. To remove tarnish from your
        item, please follow instructions from an appropriate jewelry cleaner.
      </p>
    </section>
    <section class="fill accent">
      <h2>Meaningful Warranty</h2>
      <p>
        LeStage Manufacturing® warranties all Cape Cod Jewelry® products against
        original manufacturing defects during the lifetime of the items. All
        LeStage Manufacturing® warranties are non-transferrable and are only
        available to the end-users of our products. Warranties do not apply to
        products purchased from online vendors or auction sites unauthorized to
        sell LeStage Manufacturing® products including ebay.com.
      </p>
      <p>
        The tarnishing of natural sterling silver products is not considered a
        manufacturing defect.
      </p>
      <p>
        Please direct all warranty inquiries to the authorized retailer from
        whom it was purchased or
        <nuxt-link to="contact">
          contact us
        </nuxt-link>
        directly.
      </p>
      <p>
        For a list of authorized retailers near you, please
        <nuxt-link to="retailers">
          check here
        </nuxt-link>.
      </p>
    </section>
    <section
      id="instructions"
      class="fill"
    >
      <header class="brand">
        <Logo />
      </header>
      <div class="panel">
        <h2>Wearing a Classic</h2>
        <p>Putting on your LeStage Cape Cod Bracelet®</p>
      </div>
      <div
        id="step-1"
        class="panel step"
      >
        <p
          data-aos="zoom-in-right"
          data-aos-once="true"
        >
          <span class="number">1</span>Hold bracelet so threads next to bead are
          on the left side
        </p>
        <img
          src="~/assets/images/fillers/warranty-instructions-01.png"
          alt="Cape Cod Bracelet"
          data-aos="zoom-in-left"
          data-aos-once="true"
        >
      </div>
      <div
        id="step-2"
        class="panel step"
      >
        <p
          data-aos="zoom-in-right"
          data-aos-once="true"
        >
          <span class="number">2</span>Unscrew the bead towards you
        </p>
        <img
          src="~/assets/images/fillers/warranty-instructions-02.png"
          alt="Cape Cod Bracelet"
          data-aos="zoom-in-left"
          data-aos-once="true"
        >
      </div>
      <div
        id="step-3"
        class="panel step"
      >
        <p
          data-aos="zoom-in-right"
          data-aos-once="true"
        >
          <span class="number">3</span>Twist open to side
        </p>
        <img
          src="~/assets/images/fillers/warranty-instructions-03.png"
          alt="Cape Cod Bracelet"
          data-aos="zoom-in-left"
          data-aos-once="true"
        >
      </div>
      <div
        id="step-4"
        class="panel step"
      >
        <p
          data-aos="zoom-in-bottom"
          data-aos-once="true"
        >
          <span class="number">4</span>Slip thinnest part of wrist into opening
          and reverse above process
        </p>
      </div>
    </section>
  </main>
</template>

<script>
import Logo from '~/assets/images/logos/logo-cape-cod.svg?inline'

export default {
  components: {
    Logo
  },
  head() {
    return {
      title: 'Authentic Cape Cod Jewelry Warranty',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: 'Providing customers with a meaningful lifetime warranty.'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
h2 {
  @include line-after;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
}
.fill {
  p {
    max-width: 600px;
  }
}
#instructions {
  background: getColor(background, body);
}
.panel {
  @include line-after;
  padding: 1rem;
  @include tablet {
    padding: 2rem;
  }
}
@include tablet {
  .step {
    align-items: center;
    display: flex;
    flex-direction: row;
    min-height: 300px;
    width: 100%;
    p,
    img {
      text-align: center;
      width: 50%;
    }
  }
  #step-4 {
    p {
      align-self: center;
      margin: 0 auto;
      width: 100%;
    }
  }
}

.number {
  background: getColor(background, light);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  border-radius: 100%;
  display: block;
  height: 2.5rem;
  line-height: 2.5rem;
  margin: 0.5rem auto;
  text-align: center;
  width: 2.5rem;
}
</style>
