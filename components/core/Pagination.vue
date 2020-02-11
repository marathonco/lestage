<template>
  <div
    v-if="totalPages > 1"
    class="pagination"
  >
    <button
      :disabled="currentPage == 1"
      class="previous"
      @click="pageChange(currentPage - 1)"
    >
      &lt;
    </button>
    <button
      :disabled="currentPage == 1"
      :class="currentPage == 1 ? 'is-active': ''"
      @click="pageChange(1)"
    >
      1
    </button>
    <button
      v-if="pageRange[0] !== 2 && totalPages > 4"
      disabled
      class="disabled"
    >
      ...
    </button>
    <button
      v-for="(page, key) of pageRange"
      :key="key"
      :disabled="currentPage == page"
      :class="currentPage == page ? 'is-active': ''"
      @click="pageChange(page)"
    >
      {{ page }}
    </button>
    <div v-if="pageRange[pageRange.length] !== totalPages - 1 && totalPages > 4">
      ...
    </div>
    <button
      :disabled="currentPage == totalPages"
      @click="pageChange(totalPages)"
    >
      {{ totalPages }}
    </button>
    <button
      :disabled="currentPage == totalPages"
      :class="currentPage == totalPages ? 'is-active': ''"
      class="next"
      @click="pageChange(currentPage + 1)"
    >
      &gt;
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1,
      required: true
    },
    totalPages: {
      type: Number,
      default: null,
      required: true
    }
  },
  computed: {
    pageRange() {
      const visiblePages = 2
      const lowRange = Math.max(this.currentPage - visiblePages, 2)
      const highRange = Math.min(
        this.currentPage + visiblePages,
        this.totalPages - 1
      )
      const range = []
      for (let i = lowRange; i <= highRange; i++) {
        range.push(i)
      }
      return range
    }
  },
  methods: {
    pageChange(newPage) {
      this.$emit('pageChange', newPage)
    }
  }
}
</script>

<style lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  margin: 1rem;
  button,
  div {
    background: #ffffff;
    border: 1px solid #cccccc;
    height: 2.5rem;
    width: 2.5rem;
    &:hover {
      background: #dddddd;
    }
    &.is-active {
      background: getColor(state, success);
      &:hover {
        background: getColor(state, success);
      }
    }
    &.is-disabled:hover {
      background: #ffffff;
    }
  }
}
</style>
