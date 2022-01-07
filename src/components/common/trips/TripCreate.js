
const maxLengthTitle = 50
const maxLengthNotes = 300
const initialState = {
  title: '',
  notes: '',
  countryVisited: '',
  dateStarted: '',
  dateFinished: '',
  memories: [],
}

function TripCreate () {
  return (
    <section className="section container-fluid row">
      <div className="col-7" 
        style={{ background: 'antiquewhite' }}
      >left</div>
      <div className="col"
        style={{ background: 'khaki' }}
      >right</div>
    </section>
  )
}

export default TripCreate