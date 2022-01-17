import { environment } from '../config'

export function flattenArrayByPropertyOfMember (array, property) {
  const flattenedArray = []
  if (array.length) array.forEach(topArrayMember => {
    topArrayMember[property].forEach(childMember => {
      flattenedArray.push(childMember)
    })
  })
  return flattenedArray
}

export function logInDevelopment (_log) {
  console.log(environment)
  if (environment === 'development') {
    console.log(_log)
  }
}

export function removeSingleIndexFromArray(array, index) {
  const newArray = [...array]
  newArray.splice(index, 1)
  return newArray
}