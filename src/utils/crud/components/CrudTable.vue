<template>
  <v-card flat>
    <controls
      :create-mode="createMode"
      @create="create"
      @filter="filter"
      @refreshItemsView="refreshItemsView"
      @clearFilters="clearFilters"
    />
    <!-- Table -->
    <v-data-table
      :options.sync="pagination"
      :headers="headers"
      :items="filteredItems"
      item-key="meta.id"
      :no-results-text="'Keine passenden Resultate gefunden'"
      :no-data-text="'Keine Daten verfügbar'"
      :footer-props="footerProps"
      :items-per-page="100"
      :loading="loading"
      sort-by="songnumber"
      light
      dense
      @click:row="rowClicked"
    >
      <template
        v-for="(header, i) in headers"
        #[`item.${header.value}`]="{ item }"
      >
        <span :key="i">
          <list-item-actions
            v-if="header.value==='actions'"
            :item="item"
            :edit-button="editButton"
            @edit="edit"
            @destroy="destroy"
          />
          <span v-else>
            <slot
              :name="`field:${header.value}`"
              :value="item[header.value]"
              :item="item"
            >
              <list-item-field
                :value="item[header.value]"
              />
            </slot>
          </span>
        </span>
      </template>
      <template
        slot="footer.page-text"
        slot-scope="{ pageStart, pageStop, itemsLength }"
      >
        <table-footer
          :pagination="pagination"
          :page-start="pageStart"
          :page-stop="pageStop"
          :items-length="itemsLength"
          @setPage="setPage"
        />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>

import {
  mapState,
  mapActions,
} from 'vuex'

import CrudInstanceMixin from '../mixins/crud-instance'
import ControlsHandlerMixin from '../mixins/controls-handler'
import ItemsViewMixin from '../mixins/items-view'
import CrudTableMixin from '../mixins/crud-table'
import FilteringMixin from '../mixins/table-filtering'
import HelperMixin from '../mixins/table'

import Controls from './Controls.vue'

export default {
  name: 'CrudTable',
  components: {
    Controls,
  },
  mixins: [
    CrudInstanceMixin,
    ControlsHandlerMixin,
    ItemsViewMixin,
    CrudTableMixin,
    FilteringMixin,
    HelperMixin,
  ],
  data () {
    return {}
  },
  computed: {
    ...mapState('crud', [
      'loading',
      'isItemsViewRefreshed',
    ]),
    totalItems () {
      return this.filteredItems.length
    },
  },
  watch: {
    isItemsViewRefreshed (val) {
      if (val) {
        this.getItems()
      }
    },
  },
  created () {
    this.resetItems()
    this.getItems()
  },
  methods: {
    ...mapActions('crud', ['getItems']),
    moveDetailsItem (page, index) {
      this.pagination.page = page
      const realIndex = (page - 1) * this.pagination.itemsPerPage + index
      const newItemId = this.filteredItems[realIndex].meta.id
      this.setCurrentItem({ id: newItemId, index })
      this.getItemDetails([newItemId])
    },
    rowClicked (item, value) {
      this.edit(item.meta.id)
    },
  },
}
</script>
