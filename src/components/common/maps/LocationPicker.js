import { useState, useRef, useCallback } from 'react'
import ReactMapGL, { Marker, WebMercatorViewport } from 'react-map-gl'
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
  const fitBounds = (
    bounds, viewport
  ) => new WebMercatorViewport(viewport).fitBounds(bounds)
  const handleGeocoderResult = ({ result })=>{
    console.log(result)
    const { bbox } = result
    const bounds = [[bbox[0], bbox[1]], [bbox[2], bbox[3]]]
    const fittedBounds = fitBounds(bounds, viewport)
    console.log(viewport)
    console.log(fittedBounds)
    // handleGeocoderViewportChange
    setViewport({
      ...viewport, 
      latitude: fittedBounds.latitude,
      longitude: fittedBounds.longitude,
      zoom: fittedBounds.zoom,
    })
  }

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