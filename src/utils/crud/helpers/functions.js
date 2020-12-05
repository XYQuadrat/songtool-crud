import crud from '@/config/crud'

const fieldModifiers = crud.fieldModifiers || {}

function parseIntIfNumber (str) {
  return !/\D/.test(str) ? parseInt(str) : str
}

function getItemsList (obj, fields, meta, primaryKey, customButtons) {
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
  for (const button of customButtons) {
    rObj.meta.buttons[button.name] = true
    if (button.condition) {
      let showButton = false
      const colVal = obj[button.condition.field]
      const reqValues = button.condition.values
      let { operator } = button.condition
      if (operator === '==') {
        for (const reqVal of reqValues) {
          if (colVal === reqVal) {
            showButton = true
          }
        }
      } else if (operator === '!=') {
        for (const reqVal of reqValues) {
          if (colVal !== reqVal) {
            showButton = true
          }
        }
      } else if (operator === '>') {
        for (const reqVal of reqValues) {
          if (colVal > reqVal) {
            showButton = true
          }
        }
      } else if (operator === '<') {
        for (const reqVal of reqValues) {
          if (colVal < reqVal) {
            showButton = true
          }
        }
      }
      rObj.meta.buttons[button.name] = showButton
    }
  }
  for (const field of fields) {
    const customField = function (info) {
      let tmpField = info.name === ''
        ? obj
        : info.name.split('.')
          .reduce((object, property) => object[property] || '', obj)

      const functions = info.functions || []
      const availableFunctions = fieldModifiers

      for (let i = 0; i < functions.length; i++) {
        const functionName = functions[i]
        tmpField = availableFunctions[functionName](tmpField)
      }
      return tmpField
    }
    rObj[field.name.toLowerCase()] = (field.apiObject === undefined) ? obj[field.name] : customField(field.apiObject)
  }
  for (const field of meta) {
    const customField = function (info) {
      const tmpField = info.name.split('.')
        .reduce((object, property) => object[property] || '', obj)
      return tmpField
    }
    rObj.meta[field.name.toLowerCase()] = (field.apiObject === undefined) ? obj[field.name] : customField(field.apiObject)
  }
  return rObj
}

export {
  fieldModifiers,
  parseIntIfNumber,
  getItemsList,
}
