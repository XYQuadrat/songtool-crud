<template>
  <v-dialog
    v-model="filter.show"
    :max-width="width"
    persistent
    no-click-animation
  >
    <v-card>
      <slot
        name="title"
        :title="title"
      >
        <v-card-title
          class="headline"
        >Filtern</v-card-title>
      </slot>
      <v-form>
        <v-card-text style="padding:25px !important;" class="details-list">
          <slot name="over-fields" />
          <div
            v-for="(field, i) in fields"
            :key="i"
          >
            <v-layout row wrap>
              <v-flex :class="'sm12'">
                <item-details-field
                  :field="field"
                  :field-value="field.value"
                  :reload="reload"
                  @valueChanged="valueChanged"
                >
                  <template
                    #default="{
                      value,
                      fieldType,
                      field,
                      reload,
                      changeValue,
                    }"
                  >
                    <slot
                      :name="`field:${field.name}`"
                      :value="value"
                      :field-type="fieldType"
                      :field="field"
                      :reload="reload"
                      :change-value="changeValue"
                    />
                  </template>
                </item-details-field>
              </v-flex>
            </v-layout>
          </div>
          <slot name="under-fields" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" text @click.native="close()">{{ 'Schliessen' }}</v-btn>
          <v-btn
            color="green"
            text
            @click="applyFilter()"
          >{{ 'Filtern' }}</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>

import ItemDetailsField from './ItemDetailsField.vue'
import {
  mapState,
  mapMutations,
} from 'vuex'

export default {
  components: {
    ItemDetailsField,
  },
  props: [
    'title',
    'detailsFields',
    'width',
  ],
  data () {
    return {
      reload: false,
      fields: [],
    }
  },
  watch: {
    filterShow: function (val) {
      if (val) {
        this.setFields()
      }
    },
  },
  mounted () {
    this.setFields()
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
  methods: {
    ...mapState('crud', ['columnFilters']),
    ...mapMutations('crud', ['setFilters']),
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
  },
}
</script>

<style scoped>
.details-list {
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}
</style>
