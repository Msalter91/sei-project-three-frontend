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
function findCenterOfLocationArray (array){
  const locationSum = array.reduce((acc, cur)=>{
    acc.lat += cur.location.lat
    acc.lng += cur.location.lng
    return acc
  }, { lat: 0, lng: 0 })
  const count = array.length
  return { lat: locationSum.lat / count, lng: locationSum.lng / count }
}

function MapTest ({ tripData = trip, zoom = 4 , width = 500, height = 500 }) {
  const render = (status = Status) => {
    return <h1>{status}</h1>
  }

  const tripCenter = findCenterOfLocationArray(tripData.memories)
  
  return (
    <div style={{ width: width, height: height }}>
      <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} render={render}>
        <RenderMap center={tripCenter} zoom={zoom} />
      </Wrapper>
    </div>
  )
}

export default MapTest