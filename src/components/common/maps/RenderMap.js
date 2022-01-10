import React, { useEffect, useState, useRef, useCallback } from 'react'
import ReactMapGL, { Marker, WebMercatorViewport } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'

function getLocationArrayStats (array){
  const locationAggregates = array.reduce((acc, cur)=>{
    acc.lat += cur.lat
    acc.long += cur.long
    if (cur.lat > acc.latMax) acc.latMax = cur.lat
    if (cur.lat < acc.latMin) acc.latMin = cur.lat
    if (cur.long > acc.longMax) acc.longMax = cur.long
    if (cur.long < acc.longMin) acc.longMin = cur.long
    return acc
  }, { lat: 0, long: 0 , latMax: -180, latMin: 180, longMax: -180, longMin: 180 })
  const count = array.length
  return {
    ...locationAggregates,
    lat: locationAggregates.lat / count, 
    long: locationAggregates.long / count , 
    latRng: locationAggregates.latMax - locationAggregates.latMin ,
    longRng: locationAggregates.longMax - locationAggregates.longMin ,
  }
}

function getCoordinates (e) {
  console.log(e.lngLat)
}

function RenderMap ({ 
  data, 
  center = { lat: 0, long: 0 },
  initZoom = 1,
}) {

  let locationStats = {}
  const hasMemories = Boolean(data.memories.length)
  if (hasMemories){
    locationStats = getLocationArrayStats(data.memories)
    if (!center){
      center = { lat: locationStats.lat, long: locationStats.long }
    }
  } 
  const mapContainer = useRef()
  const mapRef = useRef()

  // calculating viewport to fit multiple markers requires a viewport with known pixel size in order to prevent errors within WebMercatorViewport
  useEffect(() => {
    function handleResize() {      
      if (mapContainer.current){
        setViewport({ ...viewport, 
          height: mapContainer.current.offsetHeight, 
          width: mapContainer.current.offsetWidth })
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
    // want this hook to ONLY cause a re-render when the html element resizes, therefore accept non-exhaustive dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[mapContainer])

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
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
  
  const [viewport, setViewport] = useState({
    latitude: center.lat,
    longitude: center.long,
    zoom: initZoom,
    bearing: 0,
    pitch: 50,
  })

  function fitViewPort () {
    const fittedVp = new WebMercatorViewport(viewport)
    const { 
      latitude: fittedLat, 
      longitude: fittedlong, 
      zoom: fittedZoom } = fittedVp.fitBounds(
      [
        [locationStats.longMin, locationStats.latMin],
        [locationStats.longMax, locationStats.latMax]
      ],
      {
        padding: mapContainer.current.offsetWidth * 0.05,
      }
    )
    setViewport({ 
      ...viewport,
      latitude: fittedLat,
      longitude: fittedlong,
      zoom: fittedZoom })
  }
  useEffect(()=>{
    if (hasMemories){
      fitViewPort()
    }
  // Want this hook to ONLY re-render on formData change, therefore accept non-exhaustive dependency
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.memories])

  return (
    <div ref={mapContainer} className="map-container" style={{ height: '100%', width: '100%' }}>
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPS_API_KEY}
        ref={mapRef}
        mapStyle='mapbox://styles/mapbox/outdoors-v11'
        {...viewport}
        onViewportChange={newViewport => setViewport(newViewport)}
        onClick={getCoordinates}
      >
        <Geocoder 
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={process.env.REACT_APP_MAPS_API_KEY}
          position='top-left'
        />
        {hasMemories && data.memories.map(location => (
          <Marker
            key={location._id}
            latitude={location.lat}
            longitude={location.long}
          >
            <span role="img" aria-label="map-marker" className="marker">{'📸'}</span>
          </Marker>
        ))}
        {/* <MapController onClick={handleNewLocation}/> */}
        
      </ReactMapGL>
    </div>
  )
}

export default RenderMap