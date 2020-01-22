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
      :index="groupKey"
    >
      <h4>{{ group.filterGroup }}</h4>
      <ul class="filters">
        <li
          v-for="(filter, filterKey) of group.filters"
          :key="filterKey"
          class="filter"
        >
          <a
            :class="filter.filterStatus"
            @click="addFilter(filter)"
          >
            {{ filter.filterValue }} ( {{ filter.productCount }} )
          </a>
          <a
            v-show="filter.filterStatus === 'active'"
            class="close"
            @click="removeFilter(filter)"
          >
            ×
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      activeFilters: 'shop/activeFilters',
      filters: 'shop/filters'
    }),
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
      return groups
    }
  },
  methods: {
    ...mapActions({
      addFilter: 'shop/addFilter',
      removeFilter: 'shop/removeFilter',
      clearFilters: 'shop/clearFilters'
    })
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
