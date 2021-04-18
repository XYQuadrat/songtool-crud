<template>
  <v-textarea
    v-model="text"
    :rules="rules"
    :label="field.text"
    :disabled="field.disabled"
    hide-details
    no-resize
    @blur="onBlur()"
  />
</template>
<script>

export default {
  name: 'TextareaField',
  props: {
    value: {
      type: String,
      default: '',
    },
    rules: {
      type: Array,
      default: () => [],
    },
    field: {
      type: Object,
    },
  },
  data () {
    return {
      text: undefined,
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

<style>
textarea {
  height: 65vh;
}
</style>
