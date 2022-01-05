import { Wrapper, Status } from '@googlemaps/react-wrapper'
import RenderMap from './RenderMap'

const trip = {
  memories: [
    { location: { lat: -25.344, lng: 131.036 } },
    { location: { lat: -26.344, lng: 130.036 } },
    { location: { lat: -24.344, lng: 131.036 } },
    { location: { lat: -25.344, lng: 132.036 } }
  ],
}

const render = () => {
  return <h1>{Status}</h1>
}
function MapTest () {
  return (
    <Wrapper apiKey='' render={render}>
      <RenderMap />
    </Wrapper>
  )
}

export default MapTest