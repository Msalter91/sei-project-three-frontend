function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}


function TripCardSmall ({ trip }) {
  console.log(trip)
  return (
    <div 
      className="show-small-container d-flex flex-column placebook-form shadow rounded m-3 bg-light"
    >
      {/* <div className='row'>
        <img src={memory.image} alt={memory.name} className='memory-edit-image image mx-auto' />
      </div> */}
      <div className="row">
        <h3 className="mx-auto text-center">{trip.title}</h3>
      </div>
      <div className="row">
        <div className="col mx-auto">
          <div>
            {[
              [trip.countryVisited, 'In:'], 
              [randomDate(new Date(2012, 0, 1), new Date()).toLocaleDateString(), 'On:']
            ].map(field=>(
              <div key={field[0]} className="row">
                <h6 className="w-4em pr-0 mr-0">{field[1]}</h6>
                <p className="col pl-0 ml-0">{field[0]}</p>
              </div>  
            ))}
            <div className="row">
              <h6 >I remember:</h6>
              <p >{trip.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripCardSmall