import React, { useEffect, useState } from 'react'
import ReactMapGL, { Marker, WebMercatorViewport } from 'react-map-gl'

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

function RenderMap ({ 
  data, 
  center = { lat: 0, long: 0 },
  initZoom = 1,
  maph = 500,
  mapw = 500,
}) {
  let locationStats = {}
  const hasMemories = Boolean(data.memories.length)
  if (hasMemories){
    locationStats = getLocationArrayStats(data.memories)
    if (!center){
      center = { lat: locationStats.lat, long: locationStats.long }
    }
  } 

  const [viewport, setViewport] = useState({
    latitude: center.lat,
    longitude: center.long,
    zoom: initZoom,
    bearing: 0,
    pitch: 50,
    height: maph,
    width: mapw,
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
        padding: mapw * 0.15,
      }
    )
    setViewport({ 
      ...viewport,
      latitude: fittedLat,
      longitude: fittedlong,
      zoom: fittedZoom })
  }
  useEffect(()=>{
    console.log('zooming')
    if (hasMemories){
      fitViewPort()
    }
  }, [data.memories])

  return (
    <div className="map-container" style={{ height: '100%', width: '100%' }}>
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPS_API_KEY}
        // height="100%"
        // width="100%"
        mapStyle='mapbox://styles/mapbox/outdoors-v11'
        {...viewport}
        onViewportChange={newViewport => setViewport(newViewport)}
      >
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