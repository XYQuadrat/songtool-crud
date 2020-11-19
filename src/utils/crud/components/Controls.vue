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
        :tooltip="$t('global.datatable.add')"
      />

      <!-- multiple edit -->
      <crud-button
        v-if="editMode && selectManyMode && updateManyMode"
        large
        color="orange"
        @clicked="editSelected()"
        icon="edit"
        :tooltip="$t('global.datatable.buttons.editSelected')"
      />

      <!-- suspend/restore record (if soft deletes are enabled) -->
      <template v-if="['soft', 'both'].includes(deleteMode) && selectManyMode && updateManyMode">
        <crud-button
          large
          color="red"
          @clicked="suspendSelected()"
          icon="undo"
          :tooltip="$t('global.datatable.buttons.suspendSelected')"
        />
        <crud-button
          large
          color="green"
          @clicked="restoreSelected()"
          icon="redo"
          :tooltip="$t('global.datatable.buttons.restoreSelected')"
        />
      </template>

      <!-- hard delete -->
      <crud-button
        v-if="['hard', 'both'].includes(deleteMode) && selectManyMode && removeManyMode"
        large
        color="black"
        @clicked="destroySelected()"
        icon="delete"
        :tooltip="$t('global.datatable.buttons.deleteSelected')"
      />

      <!-- slot -->
      <slot name="left"></slot>

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
        :tooltip="$t('global.datatable.searchByColumns')"
      />

      <!-- Search in table -->
      <span
        v-if="mainFilter"
        class="crud-controls__search"
      >
        <v-text-field
          v-model="search"
          :label="$t('global.datatable.search')"
          class="crud-controls__search-input"
          append-icon="search"
          single-line
          hide-details
          @input="updateSearch"
        ></v-text-field>
      </span>

      <!-- Select statuses (active/inactive) -->
      <template v-if="['soft', 'both', 'filter'].includes(deleteMode)">
        <span class="crud-controls__select-statuses">
          <v-autocomplete
            v-model="selectedStatuses"
            :items="statuses"
            :label="$t('global.datatable.status.title')"
            item-text="text"
            item-value="value"
            single-line
            multiple
            chips
            @change="updateSelectedStatuses"
          ></v-autocomplete>
        </span>
      </template>

      <!-- clear filters -->
      <crud-button
        v-if="mainFilter || fieldFilters"
        large
        color="grey"
        @clicked="clearFilters()"
        icon="delete_sweep"
        :tooltip="$t('global.datatable.buttons.clearFilters')"
      />

      <!-- slot -->
      <slot name="center"></slot>

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
        :tooltip="$t('global.datatable.buttons.refreshTable')"
      />

      <!-- slot -->
      <slot name="right"></slot>

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
    'deleteMode',
    'selectManyMode',
    'updateManyMode',
    'removeManyMode',
    'mainFilter',
    'fieldFilters',
    'refreshButton',
    'exportButton',
    'initialSearch',
    'initialSelectedStatuses',
    'initialColumnFilters',
  ],
  data () {
    return {
      search: '',
      selectedStatuses: [],
      columnFilters: [],
    }
  },
  computed: {
    statuses () {
      return [
        {
          text: this.$t('global.datatable.status.active'),
          value: 1,
        },
        {
          text: this.$t('global.datatable.status.inactive'),
          value: 0,
        },
      ]
    },
    filterModes () {
      return [
        {
          name: 'like',
          text: this.$t('global.datatable.filterModes.options.like'),
        },
        {
          name: 'equals',
          text: this.$t('global.datatable.filterModes.options.equals'),
        },
        {
          name: 'list',
          text: this.$t('global.datatable.filterModes.options.list'),
        },
      ]
    },
  },
  methods: {
    create () {
      this.$emit('create')
    },
    filter () {
      this.$emit('filter')
    },
    editSelected () {
      this.$emit('editSelected')
    },
    suspendSelected () {
      this.$emit('suspendSelected')
    },
    restoreSelected () {
      this.$emit('restoreSelected')
    },
    destroySelected () {
      this.$emit('destroySelected')
    },
    refreshItemsView () {
      this.$emit('refreshItemsView')
    },
    updateSearch: _.debounce(function () {
      this.$emit('updateSearch', this.search)
    }, 250),
    updateSelectedStatuses () {
      this.$emit('updateSelectedStatuses', this.selectedStatuses)
    },
    updateColumnFilterMode (event, index) {
      this.$emit('updateColumnFilterMode', event, index)
    },
    updateColumnFilterValue: _.debounce(function (event, index) {
      this.$emit('updateColumnFilterValue', event, index)
    }, 250),
    updateColumnFilters () {
      this.$emit('updateColumnFilters', this.columnFilters)
    },
    clearFilters () {
      this.search = ''
      this.updateSearch()
      this.selectedStatuses = [1]
      this.updateSelectedStatuses()
      for (const column of this.columnFilters) {
        column.mode = 'like'
        column.value = ''
      }
      this.updateColumnFilters()
      this.$emit('clearFilters')
    },
  },
  created () {
    this.search = this.initialSearch
    this.selectedStatuses = this.initialSelectedStatuses
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
  &__select-statuses {
    margin: 0 15px;
    display: inline-block;
    width: 120px;
    @media (min-width: 500px) {
      width: 250px;
    }
  }
}
</style>
