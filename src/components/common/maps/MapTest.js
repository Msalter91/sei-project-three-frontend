import RenderMap from './RenderMap'

const trip = {
  memories: [
    { id: '123asd564165', lat: -25.344, lng: 131.036 },
    { id: '123asd564166', lat: -26.344, lng: 130.036 },
    { id: '123asd564167', lat: -24.344, lng: 131.036 },
    { id: '123asd564168', lat: -28.344, lng: 138.036 }
  ],
}

function MapTest ({ tripData = trip }){
  
  return (
    <div style={{ height: 500, width: 500 }}>
      <RenderMap 
        data={tripData} 
      />
    </div>
  )
}

export default MapTest