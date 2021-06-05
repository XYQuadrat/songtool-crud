import api from '@/config/api'

const state = {
  prefix: '',
  path: '',
  paths: {},
  items: [],
  totalItems: 0,
  currentItemId: null,
  currentItemIndex: null,
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
  apiUrl: api.url,
  apiPath: api.path,
}

export default state
