<template>
  <v-dialog
    v-model="details.show"
    :max-width="width"
  >
    <v-card>
      <slot
        name="title"
        :title="title"
      >
        <v-card-title
          class="headline"
        >Details</v-card-title>
      </slot>
      <v-form v-model="details.formValid">
        <v-layout>
          <v-flex>
            <v-card-text style="padding:10px 25px 15px !important;" class="details-list">
              <slot name="over-fields" />
              <div
                v-for="(field, i) in fields.slice(0,-1)"
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
                          rules,
                          changeValue,
                        }"
                      >
                        <slot
                          :name="`field:${field.name}`"
                          :value="value"
                          :field-type="fieldType"
                          :field="field"
                          :reload="reload"
                          :rules="rules"
                          :change-value="changeValue"
                        />
                      </template>
                    </item-details-field>
                  </v-flex>
                </v-layout>
              </div>
            </v-card-text>
          </v-flex>
          <v-flex md8>
          <div
            v-for="(field, i) in fields.slice(-1)"
            :key="i"
          >
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
                      rules,
                      changeValue,
                    }"
                  >
                    <slot
                      :name="`field:${field.name}`"
                      :value="value"
                      :field-type="fieldType"
                      :field="field"
                      :reload="reload"
                      :rules="rules"
                      :change-value="changeValue"
                    />
                  </template>
                </item-details-field>
          </div>
          </v-flex>
        </v-layout>
          <slot name="under-fields" />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" text @click.native="close()">{{ 'Schliessen' }}</v-btn>
          <v-btn
            :disabled="!details.formValid"
            v-if="details.action == 'create'"
            color="green"
            text
            @click="store()"
          >{{ 'Erstellen' }}</v-btn>
          <v-btn
            :disabled="!details.formValid"
            v-else-if="details.action == 'edit'"
            color="orange"
            text
            @click="update()"
          >{{ 'Aktualisieren' }}</v-btn>
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
    detailsShow: function (val) {
      if (val) {
        this.setFields()
        if (this.details.action === 'edit') {
          this.reload = true
          setTimeout(() => {
            this.reload = false
          }, 100)
        }
      }
    },
  },
  mounted () {
    this.resetItem()
    this.setFields()
  },
  computed: {
    ...mapState('crud', [
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
    detailsShow () {
      return this.details.show
    },
  },
  methods: {
    ...mapActions('crud', [
      'updateItem',
      'storeItem',
      'mulitipleItemsUpdate',
    ]),
    ...mapActions(['openAlertBox']),
    ...mapMutations('crud', ['resetItem']),
    setFields () {
      const result = this.detailsFields.map((field) => {
        const rField = field
        let show = true
        if (this.details.action === 'create') {
          show = field.create !== false
        } else if (this.details.action === 'edit') {
          show = field.edit !== false
        }
        rField.show = show
        rField.value = this.details.item[field.column]
        if (typeof rField.value !== 'undefined') {
          const fieldValue = this.details.item[field.column]
          if (field.type === 'select' || field.type === 'multiselect') {
            const defaultVal = field.list.default || field.required ? 1 : []
            rField.value = fieldValue || defaultVal
          } else if (field.type === 'date') {
            rField.value = (fieldValue || '').substring(0, 10)
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
      this.details.show = false
    },
    update () {
      this.updateItem([
        this.details.id,
        this.itemData,
        'Aktualisiert',
        'Fehler! Update nicht erfolgreich',
      ]).then((response) => {
        this.close()
      })
    },
    store () {
      this.storeItem([
        this.itemData,
        'Gespeichert',
        'Fehler! Speichern nicht erfolgreich',
      ]).then((response) => {
        this.close()
      })
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
