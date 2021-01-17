<template>
  <div style="position:relative;">
    <div>
      <crud-table-client-mode
        :itemsViewConfig="itemsViewConfig"
        :meta="meta"
        :custom-buttons="customButtons"
        :edit-button="editButton"
        :table-fields="tableFields"
        :primary-key="primaryKey"
        :create-mode="createMode"
        :edit-mode="editMode"
        :main-filter="mainFilter"
        :field-filters="fieldFilters"
        :refresh-button="refreshButton"
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
      </crud-table-client-mode>
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
        :details-fields="filterFields"
        :width="itemDetailsWidth"
        @controlUpdateFilters="updateFilters($event)">
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
import CrudTableClientMode from './CrudTableClientMode.vue'
import ItemDetails from './ItemDetails.vue'
import ItemFilter from './ItemFilter.vue'
import crud from '@/config/crud'

export default {
  components: {
    CrudTableClientMode,
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
    customHeaderButtons: {
      type: Array,
      default: () => [],
    },
    customButtons: {
      type: Array,
      default: () => [],
    },
    meta: {
      type: Array,
      default: () => [],
    },
    watchForCreation: {
      type: Boolean,
      default: false,
    },
    primaryKey: {
      type: String,
      default: crud.primaryKey || 'id',
    },
    mode: {
      type: String,
      validator (value) {
        return [
          'ClientSide',
          'ServerSide',
        ].indexOf(value) !== -1
      },
      default: 'ClientSide',
    },
    itemsView: {
      type: Object,
      validator (value) {
        const isTypeCorrect = (field) => {
          const fieldType = field ? field.type : 'table'
          return [
            'table',
            'tree',
          ].indexOf(fieldType) !== -1
        }
        const isModeCorrect = (field) => {
          const fieldMode = field ? field.mode : 'client'
          return [
            'client',
            'server',
          ].indexOf(fieldMode) !== -1
        }
        return isTypeCorrect(value) && isModeCorrect(value)
      },
    },
    createMode: {
      type: Boolean,
      default: crud.createMode === undefined ? true : crud.createMode,
    },
    editMode: {
      type: Boolean,
      default: crud.editMode === undefined ? true : crud.editMode,
    },
    mainFilter: {
      type: Boolean,
      default: crud.mainFilter === undefined ? true : crud.mainFilter,
    },
    fieldFilters: {
      type: Boolean,
      default: crud.fieldFilters === undefined ? true : crud.fieldFilters,
    },
    refreshButton: {
      type: Boolean,
      default: crud.refreshButton === undefined ? true : crud.refreshButton,
    },
    itemDetailsWidth: {
      default: 600,
    },
  },
  data () {
    return {
      defaultItemsViewMode: 'client',
      defaultItemsViewType: 'table',
      componentTypesMap: {
        'table': 'Table',
        'tree': 'Tree',
      },
      componentModesMap: {
        'server': 'ServerMode',
        'client': 'ClientMode',
      },
    }
  },
  computed: {
    ...mapState('crud', ['detailsLoading']),
    tableFields () {
      return this.fieldsInfo.filter(field => field.table !== false && field.type !== 'divider')
    },
    detailsFields () {
      return this.fieldsInfo.filter(field => field.details !== false && field.type !== 'divider')
    },
    filterFields () {
      if (this.$refs.crudtable != null) {
        return this.$refs.crudtable.columnFilters
      }
      return this.detailsFields
    },
    itemsViewType () {
      return this.itemsView && this.itemsView.type ? this.itemsView.type : this.defaultItemsViewType
    },
    itemsViewMode () {
      let itemsViewMode
      if (this.itemsView && this.itemsView.mode) {
        itemsViewMode = this.itemsView.mode
      } else if (this.mode) {
        itemsViewMode = this.calcitemsViewMode(this.mode)
      }
      return itemsViewMode || this.defaultItemsViewMode
    },
    itemsViewConfig () {
      let config = {}
      if (this.itemsViewType === 'tree' && this.itemsView) {
        config = this.itemsView.config || {}
      }
      return config
    },
  },
  methods: {
    ...mapMutations('crud', [
      'setPrefix',
      'setPath',
      'setPaths',
      'setPage',
      'setItemsViewType',
    ]),
    ...mapActions('crud', ['runItemsViewRefreshing']),
    custom (name, item, index) {
      this.$parent[name](item, index)
    },
    calcitemsViewMode (mode) {
      const modesMap = {
        ServerSide: 'server',
        ClientSide: 'client',
      }
      return modesMap[mode]
    },
    updateFilters (event) {
      this.$refs.crudtable.updateColumnFilters(event)
    },
  },
  created () {
    this.setPrefix(this.prefix)
    this.setPath(this.path)
    this.setPaths(this.paths)
    this.setPage(this.pageTitle)
    this.setItemsViewType(this.itemsViewType)
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
