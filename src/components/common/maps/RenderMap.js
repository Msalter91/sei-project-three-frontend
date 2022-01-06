import React, { useRef, useState, useEffect } from 'react'
import mapbox from '!mapbox-gl' // eslint-disable-line

mapbox.accessToken = process.env.REACT_APP_MAPS_API_KEY

function getLocationArrayStats (array){
  const locationAggregates = array.reduce((acc, cur)=>{
    acc.lat += cur.lat
    acc.lng += cur.lng
    if (cur.lat > acc.latMax) acc.latMax = cur.lat
    if (cur.lat < acc.latMin) acc.latMin = cur.lat
    if (cur.lng > acc.lngMax) acc.lngMax = cur.lng
    if (cur.lng > acc.lngMax) acc.lngMax = cur.lng
    return acc
  }, { lat: 0, lng: 0 , latMax: -180, latMin: 180, lngMax: -180, lngMin: 180 })
  const count = array.length
  return { 
    lat: locationAggregates.lat / count, 
    lng: locationAggregates.lng / count , 
    latRng: locationAggregates.latMax - locationAggregates.latMin ,
    lngRng: locationAggregates.lngMax - locationAggregates.lngMin ,
  }
}

function RenderMap ({ 
  data, 
  center, 
  initZoom,
}) {
  const locationStats = getLocationArrayStats(data.memories)
  if (!center){
    center = { lat: locationStats.lat, lng: locationStats.lng }
  }
  if (!initZoom) {
    const latZoom = 2
    initZoom = 3
  }

  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(center.lng)
  const [lat, setLat] = useState(center.lat)
  const [zoom, setZoom] = useState(initZoom)

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapbox.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    })
  })

  useEffect(() => {
    if (!map.current) return // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })
  })

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <div className="sidebar">
Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className='map-container'
        style={{ position: 'absolute', left: 0, top: 0,height: '100%', width: '100%' }
        }/>
    </div>
  )
}

export default RenderMap