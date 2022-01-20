import { Source, Layer } from 'react-map-gl'
import { mapDefaultPolylineColor } from '../../../../config'

const defaultOptions = { 
  lineColor: mapDefaultPolylineColor,
  lineWidth: 4,
}

function TripPolyLine({ 
  trip,
  options,
}) {
  options = { ...defaultOptions, ...options }

  const tripCoords = trip.memories.map(memory =>([memory.long, memory.lat]))

  const polylineData = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: tripCoords,
    },
  }
  return (
    <Source id={`polylineLayer${trip._id}`} type="geojson" data={polylineData}>
      <Layer
        id={`lineLayer${trip._id}`}
        type="line"
        source="my-data"
        layout={{
          'line-join': 'round',
          'line-cap': 'round',
        }}
        paint={{
          'line-color': options.lineColor, 
          'line-width': options.lineWidth,
        }}
      />
    </Source>
  )
}

export default TripPolyLine