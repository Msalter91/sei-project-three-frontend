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

function MapTest ({ tripData = trip, zoom = 4 , width = 500, height = 500 }) {
  const render = (status = Status) => {
    return <h1>{status}</h1>
  }
  
  return (
    <div style={{ width: width, height: height }}>
      <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} render={render}>
        <RenderMap center={tripData.memories[0].location} zoom={zoom} />
      </Wrapper>
    </div>
  )
}

export default MapTest