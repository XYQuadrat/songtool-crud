<template>
  <!-- action buttons -->
  <span style="white-space: nowrap">
    <!-- edit record -->
    <crud-button
      v-if="editButton && editMode"
      small
      color="#FF8A65aa"
      icon="edit"
      :tooltip="'Bearbeiten'"
      @clicked="edit(item.meta.id)"
    ></crud-button>
    <!-- hard delete -->
    <crud-button
      small
      color="black"
      icon="delete"
      :tooltip="'Löschen'"
      @clicked="destroy(item.meta.id)"
    ></crud-button>
  </span>
</template>

<script>
import CrudButton from './Button.vue'

export default {
  components: {
    CrudButton,
  },
  props: {
    item: {},
    editButton: {},
    dynamicTextModes: {},
    editMode: {},
  },
  methods: {
    edit (id) { this.$emit('edit', id) },
    destroy (id) { this.$emit('destroy', id) },
  },
}
</script>
