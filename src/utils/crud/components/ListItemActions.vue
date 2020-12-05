<template>
  <!-- action buttons -->
  <span style="white-space: nowrap">
    <!-- edit record -->
    <crud-button
      v-if="editButton && editMode"
      small
      color="#FF8A65aa"
      icon="edit"
      :tooltip="$t('global.datatable.buttons.edit')"
      @clicked="edit(item.meta.id)"
    ></crud-button>
    <!-- buttons for open modal with item elements -->
    <crud-button
      v-for="(button, key) in itemElements"
      :key="key"
      small
      :color="button.color"
      :icon="button.icon"
      :tooltip="button.buttonText"
      @clicked="editItemElements(key, item.meta.id)"
    ></crud-button>
    <!-- hard delete -->
    <crud-button
      small
      color="black"
      icon="delete"
      :tooltip="$t('global.datatable.buttons.delete')"
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
    customButtons: {},
    itemElements: {},
    dynamicTextModes: {},
    editMode: {},
  },
  methods: {
    edit (id) { this.$emit('edit', id) },
    custom (name, item) { this.$emit('custom', name, item) },
    suspend (id) { this.$emit('suspend', id) },
    restore (id) { this.$emit('restore', id) },
    destroy (id) { this.$emit('destroy', id) },
    editItemElements (name, id) { this.$emit('editItemElements', name, id) },
  },
}
</script>
