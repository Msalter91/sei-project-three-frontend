import { Wrapper, Status } from '@googlemaps/react-wrapper'
import React from 'react'

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

function RenderMap ({ ...options }) {
  const mapContainerRef = React.useRef(null)
  const [map, setMap] = React.useState(null)

  React.useEffect(()=>{
    if (mapContainerRef.current && !map) {
      setMap(new window.google.maps.Map(mapContainerRef.current, {}))
    }
  },[mapContainerRef, map])

  if (map) {
    map.setOptions(options)
  }

  return (
    <div ref={mapContainerRef} 
      style= { { width: '100%', height: '100%' }}>
    </div>
  )
}

function Map ({ 
  tripData = trip, 
  zoom = 4 , 
  // width = '100%', 
  // height = '100%',
}) {
  const render = (status = Status) => {
    return <h1>{status}</h1>
  }

  const tripCenter = findCenterOfLocationArray(tripData.memories)
  
  return (
    <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} render={render}>
      <RenderMap center={tripCenter} zoom={zoom} />
    </Wrapper>
  )
}

export default Map