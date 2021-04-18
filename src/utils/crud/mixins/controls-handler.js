import {
  mapMutations,
} from 'vuex'

export default {
  data () {
    return {
      search: '',
    }
  },
  methods: {
    ...mapMutations('crud', ['initializeFilters']),
    updateColumnFilters () {
      //this.startSearching()
    },
    updateSearch (search) {
      this.search = search
      this.startSearching()
    },
  },
  created () {
    this.initializeFilters(this.tableFields)
  },
}
