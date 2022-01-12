export const logoImageLink = 'https://i.imgur.com/ElzRumx.png'

export const profileImageLink = 'https://i.imgur.com/vX6eUuR.png'

export const mapApiAccessToken = process.env.REACT_APP_MAPS_API_KEY

const mapStylesLink = process.env.REACT_APP_MAPS_STYLES_LINK
const mapsDefaultStyle = process.env.REACT_APP_MAPS_DEFAULT_STYLE
export const mapStyles = {
  default: mapsDefaultStyle ? `${mapStylesLink}${mapsDefaultStyle}` : 'mapbox://styles/mapbox/light-v10',
  outdoors: `${mapStylesLink}outdoors-v11`,
}