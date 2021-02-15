<template>
    <span>
      {{ value | cropped }}
    </span>
</template>

<script>

export default {
  props: {
    value: {},
  },
  filters: {
    cropped (value) {
      const maxLength = 25

      if (Array.isArray(value) || value instanceof Array) {
        value = value.join(', ')
      }

      if (typeof value === 'string' || value instanceof String) {
        return value.length <= maxLength ? value : `${value.substring(0, maxLength - 3)}...`
      } else {
        return value
      }
    },
  },
}
</script>
