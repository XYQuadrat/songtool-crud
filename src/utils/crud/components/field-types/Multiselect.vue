<template>
  <v-autocomplete
    v-model="selection"
    :rules="rules"
    :items="items"
    :item-text="field.list.text"
    :item-value="field.list.value"
    :search-input.sync="search"
    :label="field.text"
    :disabled="field.disabled"
    :menu-props="{ top: true, maxHeight: 500 }"
    class="field--limited-width"
    item-disabled="itemDisabled"
    hide-details
    multiple
    chips
    @change="onChange()"
  />
</template>

<script>

import Vue from 'vue'

export default {
  name: 'MultiselectField',
  props: {
    value: {
      type: [
        Array,
        String,
      ],
    },
    rules: {
      type: Array,
      default: () => [],
    },
    field: {
      type: Object,
    },
  },
  data: () => ({
    selection: undefined,
    items: [],
    search: '',
    oldSearch: '',
    searchActive: true,
  }),
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.selection = val
      },
    },
    search: {
      handler (val) {
        setTimeout(() => {
          if (this.field.async && this.searchActive) {
            if (this.search === val) {
              const url = `${this.field.url}/phrase/${val}`
              this.refreshList(url)
            }
          }
        }, 500)
      },
    },
  },
  mounted () {
    if (!this.field.url) {
      this.items = this.field.list.data
    } else {
      this.items = []
      if (this.field.async) {
      } else {
        this.refreshList(this.field.url)
      }
    }
  },
  methods: {
    onChange () {
      this.$emit('input', this.selection)
    },
    refreshList (url) {
      this.searchActive = false
      let selectItems
      const required = this.field.required !== undefined ? this.field.required : true
      Vue.http.get(url).then((response) => {
        const items = response.body
        selectItems = items.map((item) => {
          const rItem = item
          if (typeof this.field.list.complexName !== 'undefined') {
            const textArray = this.field.list.complexName.map((textInfo) => {
              const splittedText = textInfo.split('.').reduce((object, property) => object[property] || '', item)
              return splittedText
            })
            rItem.complexName = textArray.join(', ')
          }
          return rItem.join(', ')
        })
        if (!required) {
          const nullElement = {}
          nullElement[this.field.list.value] = ['']
          nullElement[this.field.list.text] = '-'
          this.items = [
            nullElement,
            ...selectItems,
          ]
        } else {
          this.items = selectItems
        }
        this.searchActive = true
      })
    },
  },
}
</script>
