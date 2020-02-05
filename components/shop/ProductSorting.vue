<template>
  <div id="productSorting">
    <input
      v-model="searchText"
      type="text"
      name="search"
      placeholder="Search"
      @keyup="changeSearch(searchText)"
    >
    <select
      id="productCollection"
      v-model="collection"
      name="collection"
      @change="changeGroup('collection')"
    >
      <option
        selected
        :value="null"
      >
        All Collections
      </option>
      <option
        v-for="(option, collKey) of collections"
        :key="collKey"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <select
      v-if="categories.length > 0"
      id="productCategory"
      v-model="category"
      name="category"
      @change="changeGroup('category')"
    >
      <option
        selected
        :value="null"
      >
        All Categories
      </option>
      <option
        v-for="(option, catKey) of categories"
        :key="catKey"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <select
      v-if="subcategories.length > 0"
      id="productsubcategory"
      v-model="subcategory"
      name="subcategory"
      @change="changeGroup('subcategory')"
    >
      <option
        selected
        :value="null"
      >
        All subcategories
      </option>
      <option
        v-for="(option, subCatKey) of subcategories"
        :key="subCatKey"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <label for="sorting">Sort by:</label>
    <select
      id="productSorting"
      v-model="sortBy"
      name="sorting"
      @change="changeSorting"
    >
      <option value="collection">
        Collection(default)
      </option>
      <option value="msrp-low">
        MSRP (Lowest)
      </option>
      <option value="msrp-high">
        MSRP (Highest)
      </option>
      <option value="sku">
        SKU
      </option>
    </select>
  </div>
</template>

<script>
// TODO: autocomplete for search
export default {
  props: {
    searchTerm: {
      type: String,
      default: ''
    },
    hierarchy: {
      type: Array,
      default: null,
      required: true
    },
    groups: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      searchText: this.searchTerm,
      collection: null,
      category: null,
      subcategory: null,
      sortBy: 'collection'
    }
  },
  computed: {
    collections() {
      return this.hierarchy.filter(group => {
        return group.type === 'collection'
      })
    },
    categories() {
      return this.hierarchy.filter(group => {
        return group.type === 'category' && group.parent === this.collection
      })
    },
    subcategories() {
      return this.hierarchy.filter(group => {
        return group.type === 'subcategory' && group.parent === this.category
      })
    }
  },
  mounted() {
    if (this.groups) {
      this.collection = this.groups.collection
      this.category = this.groups.category
      this.subcategory = this.groups.subcategory
    }
  },
  methods: {
    changeSearch(searchValue) {
      this.$emit('changeSearch', searchValue)
    },
    changeSorting() {
      this.$emit('changeSorting', this.sortBy)
    },
    changeGroup(level) {
      // TODO: this is where breadcrumbs makes more sense...

      if (level === 'collection') {
        this.category = null
        this.subcategory = null
      } else if (level === 'category') {
        this.subcategory = null
      }
      this.$emit('changeHierarchy', {
        collection: this.collection,
        category: this.category,
        subcategory: this.subcategory
      })
    }
  }
}
</script>

<style lang="scss">
#productSorting {
  display: flex;
  flex-direction: column;
  padding: 1rem 0.25rem;
  select {
    margin: 0.25rem 0;
  }
}
.search {
  display: flex;
  button {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
}
</style>
