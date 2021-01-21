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
        :tooltip="'Neu'"
      />
    </div>

    <!-- center side -->
    <div>

      <!-- Search by fields -->
      <crud-button
        v-if="fieldFilters"
        x-large
        color="light-blue lighten-2"
        @clicked="filter()"
        icon="filter_list"
        :tooltip="'Filtern'"
      />

      <!-- Search in table -->
      <span
        class="crud-controls__search"
      >
        <v-text-field
          v-model="search"
          :label="'Suchen'"
          class="crud-controls__search-input"
          append-icon="search"
          single-line
          hide-details
          @input="updateSearch"
        ></v-text-field>
      </span>

      <!-- clear filters -->
      <crud-button
        v-if="fieldFilters"
        large
        color="grey"
        @clicked="clearFilters()"
        icon="delete_sweep"
        :tooltip="'Filter aufheben'"
      />
    </div>

    <!-- right side -->
    <div>

      <!-- Refresh table -->
      <crud-button
        v-if="refreshButton"
        large
        color="blue"
        @clicked="refreshItemsView()"
        icon="refresh"
        :tooltip="'Daten aktualisieren'"
      />
    </div>
  </div>

</template>

<script>
import CrudButton from './Button.vue'
import _ from 'lodash'

export default {
  name: 'Controls',
  components: {
    CrudButton,
  },
  props: [
    'createMode',
    'editMode',
    'fieldFilters',
    'refreshButton',
    'initialColumnFilters',
  ],
  data () {
    return {
      search: '',
      columnFilters: [],
    }
  },
  methods: {
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
      this.$emit('updateColumnFilters', event)
    },
    clearFilters () {
      this.search = ''
      this.updateSearch()
      for (const column of this.columnFilters) {
        column.value = ''
      }
      this.updateColumnFilters()
      this.$emit('clearFilters')
    },
  },
  created () {
    this.search = ''
    this.columnFilters = this.initialColumnFilters
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
