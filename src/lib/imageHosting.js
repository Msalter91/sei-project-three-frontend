import axios from 'axios'

const hostUrl = process.env.REACT_APP_CLOUDINARY_URL
const imagePresets = {
  memory: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET_MEMORY,
  profile: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET_PROFILE,
}

function cloudinaryUpload (presetName, url, image, presets = imagePresets) {
  const uploadPreset = presets[presetName]
  if (!uploadPreset) throw new Error('No Cloudinary Preset')

  const data = new FormData()
  data.append('file', image)
  data.append('upload_preset', uploadPreset)
  
  const hostedUrl = axios.post(url, data).then(res=> res.data.url)

  return hostedUrl
}

export function uploadImageMemory (image) {
  return cloudinaryUpload('memory', hostUrl, image)
}

export function uploadImageProfile (image) {
  return cloudinaryUpload('profile', hostUrl, image)
}