<template>
  <div
    class="
      card-title
      table-controls
      px-3
      d-flex
      align-center
      justify-space-between
    "
  >

    <!-- left side -->
    <div>

      <!-- dialog for creating item -->
      <crud-button
        v-if="createMode"
        x-large
        color="light-blue lighten-2"
        @clicked="create()"
        icon="add"
      />
    </div>

    <!-- center side -->
    <div>

      <!-- Search by fields -->
      <crud-button
        x-large
        color="light-blue lighten-2"
        @clicked="filter()"
        icon="filter_list"
      />

      <!-- Search in table -->
      <span
        class="crud-controls__search"
      >
        <v-text-field
          v-model="search"
          :label="'Suche: Volltext, Autor, …'"
          class="crud-controls__search-input"
          append-icon="search"
          single-line
          hide-details
          @input="updateSearch"
        ></v-text-field>
      </span>

      <!-- clear filters -->
      <crud-button
        large
        color="grey"
        @clicked="clearFilters()"
        icon="delete_sweep"
      />
    </div>

    <!-- right side -->
    <div>

    </div>
  </div>

</template>

<script>
import CrudButton from './Button.vue'
import _ from 'lodash'
import {
  mapMutations,
} from 'vuex'

export default {
  name: 'Controls',
  components: {
    CrudButton,
  },
  props: ['createMode'],
  data () {
    return {
      search: '',
    }
  },
  methods: {
    ...mapMutations('crud', ['resetFilters']),
    create () {
      this.$emit('create')
    },
    filter () {
      this.$emit('filter')
    },
    refreshItemsView () {
      this.$emit('refreshItemsView')
    },
    updateSearch: _.debounce(function () {
      this.$emit('updateSearch', this.search)
    }, 250),
    updateColumnFilters (event) {
      this.$emit('updateColumnFilters')
    },
    clearFilters () {
      this.search = ''
      this.updateSearch()
      this.resetFilters()
      this.$emit('clearFilters')
    },
  },
  created () {
    this.search = ''
    this.filter()
  },
}
</script>
<style lang="scss" scoped>
.crud-controls {
  &__search {
    margin: 0 15px;
    display: inline-block;
    width: 120px;
    @media (min-width: 500px) {
      width: 250px;
    }
  }
  &__search-input {
    margin-top: -8px;
  }
}
</style>
