export default {
  data () {
    return {
      search: '',
      selectedStatuses: [1],
      columnFilters: [],
    }
  },
  methods: {

    updateColumnFilters (columnFilters) {
      const obj = this.columnFilters
      let i = 0
      for (let key in columnFilters) {
        if (columnFilters[key] != null) {
          obj[i].value = columnFilters[key]
        }
        ++i
      }
      this.$set(this, 'columnFilters', obj)
      this.startSearching()
    },
    updateSearch (search) {
      this.search = search
      this.startSearching()
    },
    updateSelectedStatuses (statuses) {
      this.selectedStatuses = statuses
      this.startSearching()
    },
  },
  created () {
    this.columnFilters = this.tableFields.map((field) => {
      const item = {}
      item.mode = 'like'
      item.text = field.text
      item.name = field.name.toLowerCase()
      item.column = field.column
      item.value = ''
      return item
    })
  },
}
