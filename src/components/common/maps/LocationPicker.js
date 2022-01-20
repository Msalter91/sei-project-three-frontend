import { useState, useRef, useCallback } from 'react'
import ReactMapGL, { Marker, WebMercatorViewport } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'

import { mapApiAccessToken, mapStyles } from '../../../config.js'

function LocationPicker ({ 
  center = { lat: 0, long: 0 },
  initZoom = 1,
  mapStyle = 'default',
  captureLocation = ()=>{},
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
      captureLocation({
        lat: newViewport.latitude,
        long: newViewport.longitude, 
      })
      setViewport(newViewport)
    },
    [captureLocation]
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

  const fitBounds = (
    bounds, viewport
  ) => new WebMercatorViewport(viewport).fitBounds(bounds)
  const handleGeocoderResult = ({ result })=>{
    let newLocation = {}
    if (result.bbox){
      const { bbox } = result
      const bounds = [[bbox[0], bbox[1]], [bbox[2], bbox[3]]]
      newLocation = fitBounds(bounds, viewport)
    } else {
      newLocation.longitude = result.center[0]
      newLocation.latitude = result.center[1]
      newLocation.zoom = 14
    }
    setViewport({
      ...viewport, 
      latitude: newLocation.latitude,
      longitude: newLocation.longitude,
      zoom: newLocation.zoom,
    })
    captureLocation({ location: result.text, lat: result.center[1], long: result.center[0] })
  }

  return (
    <div className="map-container" style={{ height: '100%', width: '100%' }}>
      <ReactMapGL
        mapboxApiAccessToken={mapApiAccessToken}
        ref={mapRef}
        mapStyle={mapStyles[mapStyle]}
        height="100%"
        width="100%"
        {...viewport}
        onViewportChange={handleViewportChange}
      >
        <Geocoder 
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={mapApiAccessToken}
          position='top-left'
          onResult={handleGeocoderResult}
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