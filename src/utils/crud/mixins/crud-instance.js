import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions,
} from 'vuex'

export default {
  props: [
    'tableFields',
    'editButton',
    'meta',
    'primaryKey',
    'createMode',
    'editMode',
    'fieldFilters',
    'refreshButton',
  ],
  computed: {
    ...mapState('app', ['page']),
    ...mapState('crud', [
      'prefix',
      'path',
      'currentItemIndex',
      'currentItemId',
    ]),
    ...mapGetters('crud', ['itemsList']),
    items () {
      return this.itemsList(
        this.tableFields,
        this.meta,
        this.primaryKey,
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
  },
}
