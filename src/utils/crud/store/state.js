import api from '@/config/api'

const state = {
  prefix: '',
  path: '',
  paths: {},
  itemsViewType: undefined,
  isItemsViewFlat: false,
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
  createdElement: {
    mode: 'ignore',
    created: false,
    id: null,
  },
  itemElements: {
    show: false,
    id: null,
    columns: [],
    controller: '',
    itemObject: '',
    primaryId: '',
    foreignId: '',
    title: '',
    url: '',
    data: [],
  },
  availableElements: [],
  selectedIds: [],
  // isItemsViewRefreshed
  isItemsViewRefreshed: false,
  item: {},
  itemIdColumn: '',
  // api
  apiUrl: api.url,
  apiPath: api.path,
}

export default state
