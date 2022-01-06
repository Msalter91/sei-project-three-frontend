import React, { useRef, useState, useEffect } from 'react'
import mapbox from '!mapbox-gl' // eslint-disable-line

mapbox.accessToken = process.env.REACT_APP_MAPS_API_KEY

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
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(center.lng)
  const [lat, setLat] = useState(center.lat)
  const [zoom, setZoom] = useState(3)

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapbox.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    })
  })

  return (
    <div ref={mapContainer} className='map-container' style={{ height: '100%', width: '100%' }} />
  )
}

export default RenderMap