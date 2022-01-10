export function flattenArrayByPropertyOfMember (array, property) {
  console.log(array)
  const flattenedArray = []
  if (array.length) array.forEach(topArrayMember => {
    topArrayMember[property].forEach(childMember => {
      flattenedArray.push(childMember)
    })
  })
  return flattenedArray
}