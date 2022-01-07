
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
    <section className="section">
      <form
        className="container-fluid row"
        // onSubmit={handleSubmit}
      >
        <div className="col-7" 
          style={{ background: 'antiquewhite' }}>
            
        </div>
        <div className="col"
          style={{ background: 'khaki' }}
        >right</div>
      </form>
    </section>
  )
}

export default TripCreate