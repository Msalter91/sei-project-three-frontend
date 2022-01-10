import { useState, useRef, useCallback } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'

const mapboxApiAccessToken = process.env.REACT_APP_MAPS_API_KEY

function LocationPicker ({ 
  center = { lat: 0, long: 0 },
  initZoom = 1,
  getLocationFromMap = ()=>{},
}) {
  const [viewport, setViewport] = useState({
    latitude: center.lat,
    longitude: center.long,
    zoom: initZoom,
    bearing: 0,
    pitch: 50,
  })
  const mapRef = useRef()

  const handleViewportChange = useCallback(
    (newViewport) => {
      getLocationFromMap([
        newViewport.latitude,
        newViewport.longitude
      ])
      setViewport(newViewport)
    },
    [getLocationFromMap]
  )

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 }
      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      })
    },
    [handleViewportChange]
  )

  return (
    <div className="map-container" style={{ height: '100%', width: '100%' }}>
      <ReactMapGL
        mapboxApiAccessToken={mapboxApiAccessToken}
        ref={mapRef}
        mapStyle='mapbox://styles/mapbox/outdoors-v11'
        height="100%"
        width="100%"
        {...viewport}
        onViewportChange={handleViewportChange}
      >
        <Geocoder 
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={mapboxApiAccessToken}
          position='top-left'
        />
        <Marker
          latitude={viewport.latitude}
          longitude={viewport.longitude}
        ><span role="img" aria-label="map-marker" className="marker">{'📸'}</span></Marker>
      </ReactMapGL>
    </div>
  )
}

export default LocationPicker