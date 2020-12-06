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
  // items view type
  setItemsViewType (state, type) {
    state.itemsViewType = type
    state.isItemsViewFlat = type === 'table'
  },
  // table items
  setItems (state, data) {
    state.items = data
    state.loading = false
  },
  setLoadingStatus (state, val) {
    state.loading = val
  },
  setItemsServerSide (state, data) {
    state.items = data.data
    state.totalItems = data.total
    state.loading = false
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
  moveItem (state, [
    direction,
    run,
  ]) {
    state.moveItemRun = run
    state.moveItemDirection = direction
  },
  setNextItem (state, bool) {
    state.previousItem = bool
  },
  // details item
  setDetailsLoader (state, bool) {
    state.detailsLoading = bool
  },
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
  setCreationMode (state, creationMode) {
    state.createdElement.mode = creationMode
  },
  setCreatedItemStatus (state, [
    created,
    id,
  ]) {
    state.createdElement.created = created
    state.createdElement.id = id
  },
  // item elements
  setItemElements (state, data) {
    state.itemElements.data = data
  },
  resetItemElements (state) {
    state.itemElements.data = []
  },
  setItemElementsInfo (state, [
    id,
    obj,
  ]) {
    state.itemElements.id = id
    state.itemElements.title = obj.title
    state.itemElements.url = obj.url
    state.itemElements.columns = obj.columns
    state.itemElements.controller = obj.controller
    state.itemElements.itemObject = obj.itemObject
    state.itemElements.primaryId = obj.primaryId
    state.itemElements.foreignId = obj.foreignId
    state.itemElements.connectionKeyName = obj.connectionKeyName
    state.itemElements.dictionaryKeyName = obj.dictionaryKeyName
    state.itemElements.show = true
  },
  // refresh table
  refreshTable (state, status) {
    state.isItemsViewRefreshed = status
  },
  filterDialog (state) {
    state.filter.show = true
  },
}

export default mutations
