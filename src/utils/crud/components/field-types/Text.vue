<template>
  <v-text-field
    v-model="text"
    :type="['number', 'decimal'].includes(fieldType) ? 'number' : 'text'"
    :label="field.text === 'Nr. im RG' ? 'Nummer im Reformierten Gesangbuch' : field.text"
    :disabled="field.disabled"
    :rules="rules"
    :step="fieldType == 'decimal' ? 0.01 : 1"
    :mask="['date', 'time', 'datetime'].includes(fieldType) ? masks[fieldType] : undefined"
    :return-masked-value="['date', 'time', 'datetime'].includes(fieldType) ? true : false"
    min="0"
    hide-details
    @blur="onBlur()"
  />
</template>

<script>

export default {
  name: 'TextField',
  props: {
    value: String,
    fieldType: String,
    field: Object,
    rules: Array,
  },
  data () {
    return {
      text: undefined,
      masks: {
        date: '####-##-##',
        time: '##:##',
        datetime: '####-##-## ##:##:##',
      },
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.text = val
      },
    },
  },
  methods: {
    onBlur () {
      this.$emit('input', this.text)
    },
  },
}
</script>
