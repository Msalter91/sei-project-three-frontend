import axios from 'axios'
// import { getToken } from './auth'

export const baseUrl = '/api'

// function headers() {
//   return {
//     headers: { Authorization: `Bearer ${getToken()}` },
//   }
// }

// export function getAllTrips() {
//   return axios.get(`${baseUrl}/trips`)
// }

export function registerUser(formData) {
  return axios.post(`${baseUrl}/register`, formData)
}

// export function loginUser(formData) {
//   return axios.post(`${baseUrl}/login`, formData)
// }


// export function getUser(userId) {
//   return axios.get(`${baseUrl}/profile/${userId}`)
// }
