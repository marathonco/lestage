<template>
  <div
    v-if="totalPages > 1"
    class="pagination"
  >
    <button
      :disabled="currentPage == 1"
      @click="pageChange(currentPage - 1)"
    >
      Previous
    </button>
    <button
      :disabled="currentPage == 1"
      @click="pageChange(1)"
    >
      1
    </button>
    <div v-if="pageRange[0] !== 2">
      ...
    </div>
    <button
      v-for="(page, key) of pageRange"
      :key="key"
      :disabled="currentPage == page"
      @click="pageChange(page)"
    >
      {{ page }}
    </button>
    <div v-if="pageRange[pageRange.length] !== totalPages - 1">
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
      @click="pageChange(currentPage + 1)"
    >
      Next
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
  button,
  div {
    margin: 0.25rem;
  }
}
</style>
