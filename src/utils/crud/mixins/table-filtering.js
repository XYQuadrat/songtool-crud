import {
  mapState,
} from 'vuex'

export default {
  computed: {
    ...mapState('crud', ['columnFilters']),
    filteredItems () {
      let items = this.items

      var { columnFilters } = this
      var filters = columnFilters.filter(e => !!e.value || (e instanceof Array && e.length > 0))

      items = items.filter((item) => {
        for (let i = 0; i < filters.length; i++) {
          let matchesFilter = false
          const colName = filters[i].name
          let field = item[colName]
          const keys = filters[i].value.toString().split(',').map(item => item.trim().toLowerCase())
          for (var j = 0; j < keys.length; ++j) {
            if (typeof field === 'string' || field instanceof String || typeof field === 'number') {
              field = field.toString().toLowerCase()
              if (colName === 'songnumber') {
                matchesFilter = field === keys[j]
              } else if (field.includes(keys[j])) {
                matchesFilter = true
              }
            } else if (Array.isArray(field)) {
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
          for (let i = 0; i < phrases.length; i++) {
            let found = false
            for (const key in item) {
              let field = item[key]
              if (
                typeof field === 'string' ||
                field instanceof String ||
                typeof field === 'number'
              ) {
                field = field.toString().toLowerCase()
                if (field.includes(phrases[i])) {
                  found = true
                }
              } else if (
                field instanceof Array ||
                Array.isArray(field)
              ) {
                field = field.join(' ').toLowerCase()
                if (field.includes(phrases[i])) {
                  found = true
                }
              }
            }
            if (!found) {
              return false
            }
          }
          return true
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
}
