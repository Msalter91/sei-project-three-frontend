import React from 'react'

function RenderMap () {
  const mapContainerRef = React.useRef(null)
  const [map, setMap] = React.useState(null)
  React.useEffect(()=>{
    if (mapContainerRef.current && !map) {
      setMap(new window.google.maps.Map(mapContainerRef.current, {}))
    }

  },[mapContainerRef, map])
  return (
    <>
      <h1>in the render</h1>
      <div ref={mapContainerRef} 
        style= { { width: 500, height: 500 }}>
      </div>
    </>
  )
}

export default RenderMap