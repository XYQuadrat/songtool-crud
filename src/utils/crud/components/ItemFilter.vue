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
                  :dynamic-field-type="dynamicFieldType(field.typeField)"
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
          <v-btn color="black" text @click.native="close()">{{ $t('global.details.buttons.close') }}</v-btn>
          <v-btn
            color="green"
            text
            @click="applyFilter()"
          >{{ $t('global.details.buttons.filter') }}</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import ItemDetailsField from './ItemDetailsField.vue'
// import { fieldModifiers } from '@/utils/crud/helpers/functions'
import {
  mapState,
  mapMutations,
  mapActions,
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
    this.resetItem()
    this.setFields()
  },
  computed: {
    ...mapState('crud', [
      'filter',
      'details',
      'path',
      'prefix',
    ]),
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
    ...mapActions(['openAlertBox']),
    ...mapMutations('crud', ['resetItem']),
    setFields () {
      const result = this.detailsFields.map((field) => {
        const rField = field
        rField.show = true
        rField.value = field.value
        if (typeof rField.value !== 'undefined') {
          const fieldValue = field.value
          if (field.type === 'select' || field.type === 'multiselect') {
            const defaultVal = field.list.default || field.required ? 1 : []
            rField.value = fieldValue || defaultVal
          } else if (field.type === 'date') {
            rField.value = (fieldValue || '').substring(0, 10)
          } else if (field.type === 'checkbox') {
            if ([
              1,
              '1',
              true,
              'true',
            ].includes(fieldValue)) {
              rField.value = 1
            } else if ([
              0,
              '0',
              false,
              'false',
            ].includes(fieldValue)) {
              rField.value = 0
            }
          }
        } else if (field.type === 'checkbox') {
          rField.value = 0
        }
        return rField
      })
      this.$set(this, 'fields', result)
    },
    dynamicFieldType (fieldType) {
      const refField = this.fields.find((field) => field.name === fieldType)
      return refField ? refField.value : undefined
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
      this.$emit('controlUpdateFilters', this.itemData)
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
