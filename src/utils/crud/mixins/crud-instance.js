import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions,
} from 'vuex'

export default {
  props: [
    'itemsViewConfig',
    'tableFields',
    'customButtons',
    'editButton',
    'meta',
    'primaryKey',
    'createMode',
    'editMode',
    'mainFilter',
    'fieldFilters',
    'refreshButton',
  ],
  data () {
    return {
      selected: [],
    }
  },
  computed: {
    ...mapState('app', ['page']),
    ...mapState('crud', [
      'prefix',
      'path',
      'currentItemIndex',
      'currentItemId',
    ]),
    ...mapGetters('crud', ['itemsList']),
    selectedIds () {
      return this.selected.map(item => item.meta.id)
    },
    items () {
      return this.itemsList(
        this.tableFields,
        this.meta,
        this.primaryKey,
        this.customButtons,
      )
    },
  },
  methods: {
    ...mapMutations('crud', [
      'setCurrentItem',
      'resetItems',
      'resetItem',
      'editItemDialog',
      'createItemDialog',
      'filterDialog',
    ]),
    ...mapActions('crud', [
      'getItem',
      'updateItem',
      'storeItem',
      'deleteItem',
      'getItemDetails',
      'runItemsViewRefreshing',
    ]),
    ...mapActions(['openAlertBox']),
    refreshItemsView () {
      this.runItemsViewRefreshing()
    },
    edit (id) {
      this.beforeGetItem(id)
      this.getItem([id]).then(() => {
        this.editItemDialog(id)
      })
    },
    create () {
      this.resetItem()
      this.createItemDialog()
    },
    filter () {
      this.filterDialog()
    },
    destroy (id) {
      if (confirm(this.$t('global.alerts.confirm'))) {
        this.deleteItem([
          id,
          this.$t('global.alerts.deleted'),
          this.$t('global.alerts.deleteError'),
        ])
      }
    },
    custom (name, item) {
      const index = this.getItemIndex(item.meta.id)
      this.$parent.custom(name, item, index)
    },
  },
}
