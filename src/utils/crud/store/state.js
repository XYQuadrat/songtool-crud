import api from '@/config/api'

const state = {
  prefix: '',
  path: '',
  paths: {},
  tableReady: false,
  detailsLoading: false,
  items: [],
  totalItems: 0,
  loading: true,
  currentItemId: null,
  currentItemIndex: null,
  moveItemRun: false,
  moveItemDirection: null,
  details: {
    show: false,
    id: null,
    action: null,
    formValid: false,
    item: {},
  },
  filter: {
    show: false,
  },
  columnFilters: [],
  isItemsViewRefreshed: false,
  item: {},
  itemIdColumn: '',
  apiUrl: api.url,
  apiPath: api.path,
}

export default state
