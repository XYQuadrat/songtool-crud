import crud from '@/config/crud'

const fieldModifiers = crud.fieldModifiers || {}

function parseIntIfNumber (str) {
  return !/\D/.test(str) ? parseInt(str) : str
}

function getItemsList (obj, fields, meta, primaryKey) {
  const rObj = {}
  rObj.meta = {
    id: obj[primaryKey],
    buttons: {},
    item: {},
  }
  for (const field in obj) {
    if (typeof obj[field] !== 'object' || obj[field] === null) {
      rObj.meta.item[field] = obj[field]
    }
  }
  for (const field of fields) {
    rObj[field.name.toLowerCase()] = obj[field.name]
  }
  for (const field of meta) {
    rObj.meta[field.name.toLowerCase()] = obj[field.name]
  }
  return rObj
}

export {
  fieldModifiers,
  parseIntIfNumber,
  getItemsList,
}
