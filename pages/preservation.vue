<template>
  <main>
    <section class="fill compact">
      <div class="center">
        <div class="half">
          <img
            src="~/assets/images/compact-logo.png"
            alt="compact-logo"
            class="compact-logo"
          >
          <div>
            <h3>Preserving a Classic</h3>
            <p>
              LeStage<sup>®</sup> is committed to supporting the efforts to
              preserve Cape Cod's Land.
            </p>
            <p>
              A portion of each Cape Cod Jewelry® sale is donated to The Compact
              of Cape Cod Conservation Trusts, Inc., supporting its mission to
              protect open space on Cape Cod.
            </p>
          </div>
        </div>
      </div>
      <a
        href="http://thecompact.net/"
        class="button rounded contrast bordered"
      >
        Learn More About The Compact
      </a>
    </section>
    <section class="content">
      <h2>Supporting Local Artists</h2>
      <h4>Capturing the simple elegance of Cape Cod, Massachusetts</h4>
      <p>
        There lies a simplicity here that has to be seen and experienced to
        truly understand why many call it home and visitors flock to its waters
        every summer. Its beautiful sunsets, quaint shops, and laid back
        lifestyle give residents and visitors alike a reason to slown down and
        soak in the small details. We asked artists to capture elements of Cape
        Cod’s landscape to compliment the LeStage Cape Cod Jewelry® brand. Known
        for its maritime history and beautiful beaches, the famous peninsula
        provides endless inspiration.
      </p>
    </section>
    <section class="artist">
      <div>
        <img
          src="~/assets/images/fillers/crab.jpg"
          alt="artwork"
          data-aos="fade-left"
        >
      </div>
      <div>
        <h4>David Scheirer</h4>
        <p>
          David is a painter and illustrator specializing in watercolors. His
          love of the outdoors significantly influence his work—combining fine,
          crisp details with the fluid nature of watercolor—to create simple,
          elegant work that perfectly captures beauty in nature. You can view
          more of David’s beautiful work
          <a
            href="https://www.dswatercolors.com/"
            target="_blank"
          >
            here
          </a>.
        </p>
      </div>
    </section>
    <section class="artist">
      <div>
        <img
          src="~/assets/images/fillers/cottage.jpg"
          alt="artwork"
          data-aos="fade-right"
        >
      </div>
      <div>
        <h4>Nancy Colella</h4>
        <p>
          Nancy is able to expressively tell stories through her work in such
          simple, effective ways. With a focus on the relationships between
          shape, color, and line, she captures perfect moments in time that
          convey familiar memories of time spent on the Cape. See more of
          Nancy’s wonderful paintings
          <a
            href="http://www.nancycolellastudio.com/"
            target="_blank"
          >
            here
          </a>.
        </p>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  head() {
    return {
      title: 'Preserving Cape Cod',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: 'Supporting the environment and local artists on Cape Cod'
        }
      ]
    }
  }
}
</script>
<style lang="scss">
.artist {
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  @include tablet {
    flex-direction: row;
    &:nth-child(odd) {
      flex-direction: row-reverse;
    }
    div {
      padding: 1rem;
      width: 50%;
    }
  }
  h4 {
    @include line-after;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
}
.fill.compact {
  background-image: url('~assets/images/compact.jpg');
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;

  width: 100%;
  .center {
    max-width: 800px;
  }
  @include tablet {
    .fill.compact {
      // image is 3x2
      height: 66vw;
      justify-content: center;
      max-height: 80vh;
      min-height: 400px;
    }
    // TODO: need to work out mobile
    .half {
      align-items: center;
      display: flex;
      flex-direction: row;
      & > * {
        margin: 1rem;
      }
    }
  }
  h3,
  p,
  p * {
    color: getColor(text, contrast);
    margin-bottom: 1rem;
    text-align: center;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  }
}
</style>
