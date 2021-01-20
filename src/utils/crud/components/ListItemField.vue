<template>
  <span>
    <!-- html -->
    <span v-if="textMode === 'html'" v-html="value"></span>
    <!-- cropped text -->
    <span v-else-if="textMode === 'cropped'">
      {{ value | cropped }}
    </span>
    <!-- text -->
    <span v-else-if="textMode === 'text'">
      {{ value }}
    </span>
  </span>
</template>

<script>
import crud from '@/config/crud'

export default {
  props: {
    value: {},
    textMode: {
      type: String,
      default: 'text',
    },
  },
  filters: {
    cropped (value) {
      const maxLength = crud.maxLength || 35
      if (typeof value === 'string' || value instanceof String) {
        return value.length <= maxLength ? value : `${value.substring(0, maxLength - 3)}...`
      } else if (Array.isArray(value) || value instanceof Array) {
        return value.join(', ')
      } else {
        return value
      }
    },
  },
}
</script>
