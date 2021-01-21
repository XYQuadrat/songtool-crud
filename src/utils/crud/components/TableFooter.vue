<template>
  <span>
    <span>
      {{ 'Einträge' }} {{ pageStart }} - {{ pageStop }} {{ 'von' }} {{ itemsLength }}
    </span>
    <span style="margin-left:30px;">
      {{ 'Seite' }}:
      &nbsp;
      <span style="width:50px;display:inline-block !important;">
        <v-text-field
          :value="pagination.page"
          @input="setPage($event)"
          type="number"
          min="1"
          :max="calcPages"
        />
      </span>
    </span>
  </span>
</template>

<script>
export default {
  props: [
    'pageStart',
    'pageStop',
    'itemsLength',
    'pagination',
  ],
  computed: {
    calcPages () {
      return Math.ceil(this.itemsLength / this.pagination.itemsPerPage)
    },
  },
  methods: {
    setPage (val) {
      this.$emit('setPage', val)
    },
  },
}
</script>
