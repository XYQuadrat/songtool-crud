<template>
  <v-dialog
    v-model="filter.show"
    :max-width="width"
  >
    <v-card>
      <slot
        name="title"
        :title="title"
      >
        <v-card-title
          class="headline"
        >
          SongTool - Filtern
        </v-card-title>
      </slot>
      <v-form>
        <v-card-text
          style="padding:10px 25px 15px !important;"
          class="details-list"
        >
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
              @change="updateSearch"
            />
          </span>
          <div
            v-for="(field, i) in fields"
            :key="i"
          >
            <v-layout
              row
              wrap
            >
              <v-flex :class="'sm12'">
                <item-details-field
                  :field="field"
                  :field-value="field.value"
                  @valueChanged="valueChanged"
                >
                  <template
                    #default="{
                      value,
                      fieldType,
                      changeValue,
                    }"
                  >
                    <slot
                      :name="`field:${field.name}`"
                      :value="value"
                      :field-type="fieldType"
                      :field="field"
                      :change-value="changeValue"
                    />
                  </template>
                </item-details-field>
              </v-flex>
            </v-layout>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <crud-button
            large
            color="grey"
            icon="delete_sweep"
            @clicked="clearFilters()"
          />
          <v-btn
            color="black"
            text
            @click.native="close()"
          >
            {{ 'Schliessen' }}
          </v-btn>
          <v-btn
            color="green"
            text
            @click="applyFilter()"
          >
            {{ 'Filtern' }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>

import CrudButton from './Button.vue'
import ItemDetailsField from './ItemDetailsField.vue'
import {
  mapState,
  mapMutations,
} from 'vuex'

export default {
  components: {
    CrudButton,
    ItemDetailsField,
  },
  props: {
    title: String,
    width: Number,
  },
  data () {
    return {
      fields: [],
      search: '',
    }
  },
  computed: {
    ...mapState('crud', ['filter']),
    itemData () {
      const result = {}
      for (const field of this.fields) {
        if (field.type === 'multiselect') {
          result[field.column] = field.value !== undefined ? field.value : []
        } else if (field.type === 'textarea') {
          result[field.column] = field.value !== undefined ? field.value : ''
        } else {
          result[field.column] = field.value !== undefined ? field.value : null
        }
      }
      return result
    },
    filterShow () {
      return this.filter.show
    },
  },
  watch: {
    filterShow: function (val) {
      if (val) {
        this.setFields()
      }
    },
  },
  mounted () {
    // this.resetItem()
    this.setFields()
  },
  methods: {
    ...mapState('crud', ['columnFilters']),
    ...mapMutations('crud', [
      'setFilters',
      'resetFilters',
    ]),
    setFields () {
      const result = Object.values(this.$store.state.crud.columnFilters).map((field) => {
        const rField = field
        rField.show = true
        rField.value = field.value
        if (typeof rField.value !== 'undefined') {
          const fieldValue = field.value
          if (field.type === 'select' || field.type === 'multiselect') {
            const defaultVal = []
            rField.value = fieldValue || defaultVal
          }
        }
        return rField
      })
      this.$set(this, 'fields', result)
    },
    valueChanged (val, fieldColumn) {
      const field = this.fields[this.fields.findIndex(el => el.column === fieldColumn)]
      this.$set(field, 'value', val)
      if (field.onChange) {
        field.onChange(val, this.fields)
      }
    },
    close () {
      this.filter.show = false
    },
    applyFilter () {
      this.setFilters(this.itemData)
      this.$emit('updateFilters')
      this.close()
    },
    updateSearch () {
      this.$emit('updateSearch', this.search)
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

<style lang="scss" scoped>
.details-list {
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}
.crud-controls {
  &__search {
    margin: 0px;
  }
  &__search-input {
    margin-top: -8px;
  }
}
</style>
