import React from 'react'

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

export default RenderMap