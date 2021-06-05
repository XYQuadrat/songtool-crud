<template>
  <div style="position:relative;">
    <div>
      <crud-table
        ref="crudtable"
        :meta="meta"
        :edit-button="editButton"
        :table-fields="tableFields"
        :details-fields="detailsFields"
        :primary-key="primaryKey"
        :create-mode="createMode"
      >
        <!-- slots for fields -->
        <template
          v-for="field in tableFields"
          #[`field:${field.name}`]="{ value, item }"
        >
          <slot
            :name="`list-item-field:${field.name}`"
            :item="item"
            :value="value"
          />
        </template>
      </crud-table>
      <item-details
        :title="detailsTitle"
        :details-fields="detailsFields"
        :width="itemDetailsWidth"
      >
        <!-- slot for item details title -->
        <template #title="{ title }">
          <slot
            name="item-details-title"
            :title="title"
          />
        </template>

        <template
          v-for="field in detailsFields"
          #[`field:${field.name}`]="{
            value,
            fieldType,
            rules,
            changeValue,
          }"
        >
          <slot
            :name="`item-details-field:${field.name}`"
            :value="value"
            :field-type="fieldType"
            :field="field"
            :rules="rules"
            :change-value="changeValue"
          />
        </template>
      </item-details>
      <item-filter
        :title="detailsTitle"
        :width="itemDetailsWidth * 0.6"
        @updateFilters="updateFilters()"
        @updateSearch="updateSearch"
      />
    </div>
  </div>
</template>

<script>

import {
  mapState,
  mapMutations,
  mapActions,
} from 'vuex'
import CrudTable from './CrudTable.vue'
import ItemDetails from './ItemDetails.vue'
import ItemFilter from './ItemFilter.vue'
import crud from '@/config/crud'

export default {
  components: {
    CrudTable,
    ItemDetails,
    ItemFilter,
  },
  props: {
    prefix: {
      type: String,
      default: null,
    },
    path: {
      type: String,
      default: null,
    },
    paths: {
      type: Object,
      default: () => ({}),
    },
    fieldsInfo: Array,
    detailsTitle: String,
    pageTitle: String,
    editButton: {
      type: Boolean,
      default: crud.editButton || true,
    },
    meta: {
      type: Array,
      default: () => [],
    },
    primaryKey: {
      type: String,
      default: crud.primaryKey || 'id',
    },
    createMode: {
      type: Boolean,
      default: crud.createMode === undefined ? true : crud.createMode,
    },
    itemDetailsWidth: {
      type: Number,
      default: 1000,
    },
  },
  computed: {
    ...mapState('crud', ['columnFilters']),
    tableFields () {
      return this.fieldsInfo.filter(field => field.table !== false && field.type !== 'divider')
    },
    detailsFields () {
      return this.fieldsInfo.filter(field => field.details !== false && field.type !== 'divider')
    },
  },
  created () {
    this.setPrefix(this.prefix)
    this.setPath(this.path)
    this.setPaths(this.paths)
    this.setPage(this.pageTitle)
  },
  methods: {
    ...mapMutations('crud', [
      'setPrefix',
      'setPath',
      'setPaths',
      'setPage',
    ]),
    ...mapActions('crud', ['runItemsViewRefreshing']),
    updateFilters (event) {
      this.$refs.crudtable.updateColumnFilters()
    },
    updateSearch (search) {
      this.$refs.crudtable.updateSearch(search)
    },
  },
}

</script>
