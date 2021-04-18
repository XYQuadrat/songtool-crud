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
          type="number"
          min="1"
          :max="calcPages"
          @input="setPage($event)"
        />
      </span>
    </span>
  </span>
</template>

<script>
export default {
  props: {
    pageStart: Number,
    pageStop: Number,
    itemsLength: Number,
    pagination: Object,
  },
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
