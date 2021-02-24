<template>
  <v-textarea
    v-model="text"
    :rules="rules"
    :label="field.text"
    :disabled="field.disabled"
    hide-details
    @blur="onBlur()"
    no-resize
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
  methods: {
    onBlur () {
      this.$emit('input', this.text)
    },
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.text = val
      },
    },
  },
}
</script>

<style>
textarea {
  height: 65vh;
}
</style>
