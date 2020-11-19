
export default {
  computed: {
    filteredItems () {
      let items = this.items

      var { columnFilters } = this
      columnFilters = columnFilters.filter(e => !!e.value || (e instanceof Array && e.length > 0))

      items = items.filter((item) => {
        for (let i = 0; i < columnFilters.length; i++) {
          let matchesFilter = false
          const colName = columnFilters[i].name
          let field = item[colName]
          const keys = columnFilters[i].value.split(',').map(item => item.trim().toLowerCase())
          for (var j = 0; j < keys.length; ++j) {
            if (typeof field === 'string' || field instanceof String || typeof field === 'number') {
              field = field.toString().toLowerCase()
              if (field.includes(keys[j])) {
                matchesFilter = true
              }
            } else if (field instanceof Array || Array.isArray(field)) {
              field = field.join(' ').toLowerCase()
              if (field.includes(keys[j])) {
                matchesFilter = true
              }
            }
          }
          if (!matchesFilter) return false
        }
        return true
      })

      if (this.search !== '') {
        const phrases = this.search.toLowerCase().split(' ')
        items = items.filter((item) => {
          let found = true
          for (let i = 0; i < phrases.length; i++) {
            found = false
            for (const key in item) {
              let field = item[key]
              if (
                typeof field === 'string' ||
                field instanceof String ||
                typeof field === 'number'
              ) {
                field = field.toString().toLowerCase()
                if (field.includes(phrases[i])) {
                  return true
                }
              } else if (
                field instanceof Array ||
                Array.isArray(field)
              ) {
                field = field.join(' ').toLowerCase()
                if (field.includes(phrases[i])) {
                  return true
                }
              }
            }
            if (!found) break
          }
          return found
        })
      }

      return items
    },
  },
  methods: {
    getItemIndex (id) {
      return this.filteredItems.map((item) => item.meta.id).indexOf(id)
    },
    startSearching () {},
  },
  watch: {
    selectedStatuses () {
      this.pagination.page = 1
    },
  },
}
