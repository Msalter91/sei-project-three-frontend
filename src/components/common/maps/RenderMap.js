import React from 'react'

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
  
  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      {center.lat}
      {center.lng}
    </div>
  )
}

export default RenderMap