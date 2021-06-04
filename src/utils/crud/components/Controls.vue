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
        icon="add"
        @clicked="create()"
      />
    </div>

    <!-- center side -->
    <div>
      <!-- Search by fields -->
      <crud-button
        x-large
        color="blue"
        icon="filter_list_alt"
        text="Filtern"
        @clicked="filter()"
      />
    </div>

    <!-- right side -->
    <div />
  </div>
</template>

<script>
import CrudButton from './Button.vue'
import {
  mapMutations,
} from 'vuex'

export default {
  name: 'Controls',
  components: {
    CrudButton,
  },
  props: {
    createMode: Boolean,
  },
  created () {
    this.search = ''
    this.filter()
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
    updateSearch () {
      this.$emit('updateSearch', this.search)
    },
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
}
</script>
