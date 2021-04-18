<template>
  <!-- action buttons -->
  <span style="white-space: nowrap">
    <!-- edit record -->
    <crud-button
      v-if="editButton"
      small
      color="#FF8A65aa"
      icon="edit"
      @clicked="edit(item.meta.id)"
    />
    <!-- hard delete -->
    <crud-button
      small
      color="black"
      icon="delete"
      @clicked="destroy(item.meta.id)"
    />
  </span>
</template>

<script>
import CrudButton from './Button.vue'

export default {
  components: {
    CrudButton,
  },
  props: {
    item: [Object],
    editButton: Boolean,
  },
  methods: {
    edit (id) { this.$emit('edit', id) },
    destroy (id) { this.$emit('destroy', id) },
  },
}
</script>
