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