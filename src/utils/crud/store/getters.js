import { getItemsList } from '@/utils/crud/helpers/functions'

const getters = {
  path: state => (operation) => {
    let path
    if (state.paths[operation] !== undefined) {
      path = state.paths[operation]
    } else {
      path = (state.prefix != null ? `${state.prefix}/` : '') + state.path
    }
    return path
  },
  itemsList: state => (fields, meta, primaryKey) => {
    const result = state.items.map(
      obj => getItemsList(
        obj,
        fields,
        meta,
        primaryKey
      )
    )
    return result
  },
  // extended details
  item: state => state.item,
}

export default getters
