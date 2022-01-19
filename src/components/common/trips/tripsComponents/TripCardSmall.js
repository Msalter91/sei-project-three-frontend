import { Link } from 'react-router-dom'

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}


function TripCardSmall ({ trip, coloredBorder }) {
  return (
    <div 
      className="show-small-container"
    >
      <Link 
        to={`/trips/${trip._id}`}
        className=" d-flex flex-column placebook-form shadow rounded m-2 bg-light"
      >
        {/* //todo : replace with trip summary image*/}
        <div className="row">
          <div className="pt-3 pb-2 cover mb-1">
            <h5 className="text-center mb-0">{trip.title}</h5>
          </div>
        </div>
        <div className="row text-center">
          <div 
            className="col mb-0"
            style={coloredBorder && { border: `5px solid ${trip.lineColor}` }}
          >
            <div>
              {[
                [trip.countryVisited, 'In:'], 
                [randomDate(new Date(2012, 0, 1), new Date()).toLocaleDateString(), 'On:']
              ].map(field=>(
                <div key={`${trip._id}${field[0]}`} className="row mb-0">
                  <h6 className="w-4em pr-0 mr-0 mb-0">{field[1]}</h6>
                  <p className="col pl-0 ml-0 mb-0">{field[0]}</p>
                </div>  
              ))}
              <div className="row mb-0 mt-0 pt-0 pb-0">
                <h6 >I remember:</h6>
                <p >{trip.notes}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default TripCardSmall