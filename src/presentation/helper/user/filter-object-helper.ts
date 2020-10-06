export const filterObj = (obj, ...allowedFields): Object => {
  const newObject = {}
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObject[el] = obj[el]
  })
  return newObject
}
