<template>
  <div style="position:relative;">
    <div>
      <crud-table
        :meta="meta"
        :edit-button="editButton"
        :table-fields="tableFields"
        :details-fields="detailsFields"
        :primary-key="primaryKey"
        :create-mode="createMode"
        ref="crudtable"
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

        <!-- slot over fields -->
        <template #over-fields>
          <slot name="item-details-over-fields"/>
        </template>

        <!-- slots for fields -->
        <template
          v-for="field in detailsFields"
          #[`field:${field.name}`]="{
            value,
            fieldType,
            field,
            reload,
            rules,
            changeValue,
          }"
        >
          <slot
            :name="`item-details-field:${field.name}`"
            :value="value"
            :field-type="fieldType"
            :field="field"
            :reload="reload"
            :rules="rules"
            :change-value="changeValue"
          />
        </template>

        <!-- slot under fields -->
        <template #under-fields>
          <slot name="item-details-under-fields"/>
        </template>

      </item-details>
      <item-filter
        :title="detailsTitle"
        :width="itemDetailsWidth * 0.6"
        @updateFilters="updateFilters()">
      </item-filter>
    </div>
    <div class="details-loader-container">
      <v-layout
        v-if="detailsLoading"
        class="details-loader"
        justify-center
        align-center
      >
        <v-progress-circular
          indeterminate
          :size="100"
          :width="3"
          color="primary"
        ></v-progress-circular>
      </v-layout>
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
      default: 1000,
    },
  },
  computed: {
    ...mapState('crud', [
      'detailsLoading',
      'columnFilters',
    ]),
    tableFields () {
      return this.fieldsInfo.filter(field => field.table !== false && field.type !== 'divider')
    },
    detailsFields () {
      return this.fieldsInfo.filter(field => field.details !== false && field.type !== 'divider')
    },
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
  },
  created () {
    this.setPrefix(this.prefix)
    this.setPath(this.path)
    this.setPaths(this.paths)
    this.setPage(this.pageTitle)
  },
}

</script>

<style scoped>
.details-loader-container {
  position: absolute;
  top: 200px;
  text-align: center;
  width: 100%;
}
.details-loader {
  height: 100px !important;
  width: 100px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 100%;
  display: inline-block;
}
</style>
