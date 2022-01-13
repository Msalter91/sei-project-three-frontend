import axios from 'axios'
import { getToken } from './auth'
import { baseUrl } from '../config'

function authHeader () {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

export function registerUser(formData) {
  return axios.post(`${baseUrl}/register`, formData)
}

export function loginUser(formData) {
  return axios.post(`${baseUrl}/login`, formData)
}

export function getUser(userId) {
  return axios.get(`${baseUrl}/profile/${userId}`)
}

export function editUser(formData, userId) {
  return axios.put(`${baseUrl}/profile/${userId}`, formData)
}

// Trips
export function getAllTrips(){
  return axios.get(`${baseUrl}/trips/`)
}

export function tripPostNewTrip(formData){
  return axios.post(`${baseUrl}/trips/`, formData, authHeader())
}

export function tripEdit(tripId, formData){
  return axios.put(`${baseUrl}/trips/${tripId}`, formData, authHeader())
}

export function tripGetById(tripId){
  return axios.get(`${baseUrl}/trips/${tripId}`)
}

export function tripDelete(tripId){
  return axios.delete(`${baseUrl}/trips/${tripId}`, authHeader())
}

// Memories
export function memoryGetById(memoryId){
  return axios.get(`${baseUrl}/memories/${memoryId}`)
}

export function memoryEdit(memoryId, formData){
  return axios.put(`${baseUrl}/memories/${memoryId}`, formData, authHeader())
}

export function memoryCreate(formData){
  return axios.post(`${baseUrl}/memories/`, formData, authHeader())
}

export function memoryDelete(memoryId){
  return axios.delete(`${baseUrl}/memories/${memoryId}`, authHeader())
}

// countries 
export function getAllCountries(){
  return axios.get(`${baseUrl}/countries/`)
}

export function countryGetById(countryId) {
  return axios.get(`${baseUrl}/countries/${countryId}`)
}