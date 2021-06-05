const mutations = {
  // page info
  setPrefix (state, prefix) {
    state.prefix = prefix
  },
  setPath (state, path) {
    state.path = path
  },
  setPaths (state, paths) {
    state.paths = paths
  },
  setPage (state, value) {
    state.page = value
  },
  // table items
  setItems (state, data) {
    state.items = data
  },
  resetItems (state) {
    state.items = []
    state.currentItemId = null
    state.currentItemIndex = null
  },
  setCurrentItem (state, item) {
    state.currentItemId = item.id
    state.currentItemIndex = item.index
  },
  // details item
  setItem (state, data) {
    state.details.item = data
  },
  resetItem (state) {
    state.details.item = {}
  },
  editItemDialog (state, id) {
    state.details.action = 'edit'
    state.details.id = id
    state.details.formValid = true
    state.details.show = true
  },
  createItemDialog (state) {
    state.details.action = 'create'
    state.details.formValid = false
    state.details.show = true
  },
  // refresh table
  refreshTable (state, status) {
    state.isItemsViewRefreshed = status
  },
  filterDialog (state) {
    state.filter.show = true
  },
  initializeFilters (state, tableFields) {
    state.columnFilters = tableFields.map((field) => {
      const item = {}
      item.type = field.type
      item.list = field.list
      item.text = field.text
      item.name = field.name.toLowerCase()
      item.column = field.column
      item.value = undefined
      return item
    })
  },
  setFilters (state, data) {
    let i = 0
    for (let key in data) {
      if (data[key] != null) {
        state.columnFilters[i].value = data[key]
      }
      ++i
    }
  },
  resetFilters (state) {
    for (const column of state.columnFilters) {
      if (column != null) {
        column.value = ''
      }
    }
  },
  setSearch (state, searchstring) {
    state.search = searchstring
  },
}

export default mutations
