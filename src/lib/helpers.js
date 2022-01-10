export function flattenArrayByPropertyOfMember (array, property) {
  const flattenedArray = []
  if (array.length) array.forEach(topArrayMember => {
    topArrayMember[property].forEach(childMember => {
      flattenedArray.push(childMember)
    })
  })
  return flattenedArray
}