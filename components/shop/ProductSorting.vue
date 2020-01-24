<template>
  <div id="productSorting">
    <form
      class="search"
      @submit.prevent="searchProducts(searchText)"
    >
      <input
        v-model="searchText"
        type="text"
        name="search"
        placeholder="Search"
      >
      <button type="submit">
        Search
      </button>
    </form>
    <select
      id="productCollection"
      :value="collection"
      name="collection"
      @change="changeCollection($event.target.value)"
    >
      <option
        selected
        :value="null"
      >
        All Collections
      </option>
      <option
        v-for="(option, collKey) of collectionOptions"
        :key="collKey"
        :value="option.slug"
      >
        {{ option.label }}
      </option>
    </select>
    <select
      v-if="categoryOptions.length > 0"
      id="productCategory"
      :value="category"
      name="category"
      @change="changeCategory($event.target.value)"
    >
      <option
        selected
        :value="null"
      >
        All Categories
      </option>
      <option
        v-for="(option, catKey) of categoryOptions"
        :key="catKey"
        :value="option.slug"
      >
        {{ option.label }}
      </option>
    </select>
    <select
      v-if="subcategoryOptions.length > 0"
      id="productsubcategory"
      :value="subcategory"
      name="subcategory"
      @change="changeSubcategory($event.target.value)"
    >
      <option
        selected
        :value="null"
      >
        All subcategories
      </option>
      <option
        v-for="(option, subCatKey) of subcategoryOptions"
        :key="subCatKey"
        :value="option.slug"
      >
        {{ option.label }}
      </option>
    </select>
    <label for="sorting">Sort by:</label>
    <select
      id="productSorting"
      :value="sorting"
      name="sorting"
      @change="changeSorting($event.target.value)"
    >
      <option value="collection">
        Collection(default)
      </option>
      <option value="msrp">
        MSRP
      </option>
      <option value="sku">
        SKU
      </option>
    </select>
  </div>
</template>

<script>
// TODO: autocomplete for search
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      searchText: ''
    }
  },
  computed: {
    ...mapGetters({
      collection: 'shop/collection',
      collectionOptions: 'shop/collectionOptions',
      category: 'shop/category',
      categoryOptions: 'shop/categoryOptions',
      subcategory: 'shop/subcategory',
      subcategoryOptions: 'shop/subcategoryOptions',
      sorting: 'shop/sorting'
    }),
    search() {
      return ''
    }
  },
  methods: {
    ...mapActions({
      changeCollection: 'shop/changeCollection',
      changeCategory: 'shop/changeCategory',
      changeSubcategory: 'shop/changeSubcategory',
      changeSorting: 'shop/changeSorting',
      searchProducts: 'shop/searchProducts'
    })
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
