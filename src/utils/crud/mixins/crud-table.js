import {
  mapState,
  mapMutations,
} from 'vuex'

export default {
  computed: {
    ...mapState('crud', ['nextItem']),
  },
  methods: {
    ...mapMutations('crud', ['setCurrentItem']),
    beforeGetItem (id) {
      const index = this.getItemIndex(id)
      this.setCurrentItem({
        id,
        index,
      })
    },
  },
}
