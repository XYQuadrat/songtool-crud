<template>
  <div v-if="field.show">
    <slot
      :value="value"
      :field-type="fieldType"
      :field="field"
      :reload="reload"
      :rules="fieldRules(field)"
      :change-value="changeValue"
    >
      <component
        v-model="value"
        :is="fieldComponent"
        :field-type="fieldType"
        :field="field"
        :reload="reload"
        :rules="fieldRules(field)"
        :class="{'field--limited-width': isWidthLimited}"
      />
    </slot>
  </div>
</template>
<script>

export default {
  name: 'ItemDetailsField',
  props: [
    'field',
    'fieldValue',
    'reload',
  ],
  data () {
    return {
      value: null,
      isEmitLocked: false,
      componentsMap: {
        input: 'Text',
        number: 'Text',
        decimal: 'Text',
        time: 'Text',
        datetime: 'Text',
        textarea: 'Textarea',
        select: 'Select',
        multiselect: 'Multiselect',
      },
    }
  },
  computed: {
    fieldType () {
      return this.field.type
    },
    componentName () {
      return this.componentsMap[this.fieldType]
    },
    fieldComponent () {
      return this.componentName ? () => import(`./field-types/${this.componentName}.vue`) : undefined
    },
    isWidthLimited () {
      return ![
        'richTextBox',
        'textarea',
      ].includes(this.fieldType)
    },
    rules () {
      return {
        required: (v) => !!v || 'Feld ist obligatorisch',
      }
    },
  },
  methods: {
    fieldRules (field) {
      const rules = []
      const required = field.required !== undefined ? field.required : false
      if (required) {
        rules.push(this.rules.required)
      }
      return rules
    },
    changeValue (forcedValue) {
      if (forcedValue) this.value = forcedValue
      this.$emit('valueChanged', this.value, this.field.column)
    },
  },
  watch: {
    fieldValue: {
      immediate: true,
      handler (val) {
        this.isEmitLocked = true
        this.value = val
        this.isEmitLocked = false
      },
    },
    value: {
      handler (val) {
        if (!this.isEmitLocked) {
          this.changeValue()
        }
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.field {
  &--limited-width {
    max-width: 600px;
  }
}
</style>
