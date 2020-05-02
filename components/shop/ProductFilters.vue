<template>
  <div id="productFilters">
    <button
      v-if="activeFilters.length > 0"
      @click="clearFilters"
    >
      Clear All Filters
    </button>
    <div
      v-for="(group, groupKey) of filterGroups"
      :key="groupKey"
    >
      <h4>{{ group.filterGroup }}</h4>
      <ul class="filters">
        <li
          v-for="(filter, filterKey) of group.filters"
          v-show="filterKey < filterLimit || expanded.includes(groupKey)"
          :key="filterKey"
          class="filter"
        >
          <a
            :class="filter.filterStatus"
            @click="toggleFilter(filter)"
          >
            {{ filter.filterValue }} ( {{ filter.productCount }} )
          </a>
          <a
            v-show="filter.filterStatus === 'active'"
            class="close"
            @click="toggleFilter(filter)"
          >
            ×
          </a>
        </li>
        <button
          v-if="group.filters.length > filterLimit"
          @click="toggleExpand(groupKey)"
        >
          {{ !expanded.includes(groupKey) ? '...More' : '...Less' }}
        </button>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filters: {
      type: Array,
      default: null,
      required: true
    }
  },
  data() {
    return {
      expanded: [],
      filterLimit: 5
    }
  },
  computed: {
    filterGroups() {
      const groups = []
      this.filters.forEach(filter => {
        const match = groups.find(group => {
          return group.filterGroup === filter.filterType
        })
        if (match) {
          match.filters.push(filter)
        } else {
          groups.push({
            filterGroup: filter.filterType,
            filters: [{ ...filter }]
          })
        }
      })
      groups.forEach(group => {
        group.filters.sort((a, b) => {
          if (a.filterStatus === b.filterStatus) {
            return a.productCount < b.productCount ? 1 : -1
          } else {
            return a.filterStatus === 'inactive' ? 1 : -1
          }
        })
      })
      return groups
    },
    activeFilters() {
      return this.filters.filter(filter => {
        return filter.filterStatus === 'active'
      })
    }
  },
  mounted() {
    this.expanded = []
  },
  methods: {
    clearFilters() {
      this.$emit('changeFilters', null)
    },
    toggleFilter(filter) {
      this.$emit('changeFilters', filter.filterValue)
    },
    toggleExpand(groupKey) {
      if (this.expanded.includes(groupKey)) {
        this.expanded = this.expanded.filter(e => e !== groupKey)
      } else {
        this.expanded.push(groupKey)
      }
    }
  }
}
</script>

<style lang="scss">
.filters {
  display: flex;
  flex-direction: column;
}
.filter a {
  padding: 0.25rem;
  margin: 0.5rem 0;
  &.active {
    background: rgba(0, 0, 0, 0.25);
    border-radius: 1rem;
  }
}
</style>
