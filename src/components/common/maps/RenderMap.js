import React, { useState } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'

function findCenterOfLocationArray (array){
  const locationSum = array.reduce((acc, cur)=>{
    acc.lat += cur.lat
    acc.lng += cur.lng
    return acc
  }, { lat: 0, lng: 0 })
  const count = array.length
  return { lat: locationSum.lat / count, lng: locationSum.lng / count }
}

function RenderMap ({ 
  data, 
  center = findCenterOfLocationArray(data.memories), 
}) {
  const [viewport, setViewport] = useState({
    latitude: center.lat,
    longitude: center.lng,
    zoom: 3,
  })

  return (
    <div className="map-container" style={{ height: '100%', width: '100%' }}>
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPS_API_KEY}
        height="100%"
        width="100%"
        mapStyle='mapbox://styles/mapbox/outdoors-v11'
        {...viewport}
        onViewportChange={newViewport => setViewport(newViewport)}
      >
        {data.memories.map(location => (
          <Marker
            key={location.id}
            latitude={location.lat}
            longitude={location.lng}
          >
            <span role="img" aria-label="map-marker" className="marker">{'A'}</span>
          </Marker>
        ))}
        {/* <MapController onClick={handleNewLocation}/> */}
      </ReactMapGL>
    </div>
  )
}

export default RenderMap