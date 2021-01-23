import ListItemActions from '../components/ListItemActions.vue'
import ListItemField from '../components/ListItemField.vue'

export default {
  components: {
    ListItemActions,
    ListItemField,
  },
  methods: {
    setColumnTextModes () {
      const columnTextModes = {}
      for (const field of this.tableFields) {
        let textMode = 'cropped'
        if (field.textMode) {
          textMode = field.textMode
        }
        columnTextModes[field.name.toLowerCase()] = textMode
      }
      return columnTextModes
    },
    textMode (key) {
      const field = this.tableFields.find((field) => field.name === key) || {}
      let textMode = field.textMode || 'cropped'
      return textMode
    },
  },
}
