export const logoImageLink = 'https://i.imgur.com/ElzRumx.png'

export const profileImageLink = 'https://i.imgur.com/vX6eUuR.png'

export const mapApiAccessToken = process.env.REACT_APP_MAPS_API_KEY

const mapStylesLink = process.env.REACT_APP_MAPS_STYLES_LINK || 'mapbox://styles/mapbox/'
const mapsDefaultStyle = process.env.REACT_APP_MAPS_DEFAULT_STYLE || 'light-v10'
export const mapStyles = {
  default: `${mapStylesLink}${mapsDefaultStyle}`,
  outdoors: `${mapStylesLink}outdoors-v11`,
}


const devUrl = '/api'
const prodUrl = process.env.REACT_APP_PROD_URL
export const baseUrl = process.env.NODE_ENV === 'production' ? prodUrl : devUrl