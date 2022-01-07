import RenderMap from '../maps/RenderMap'

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
          <div className="form-group">
            <label htmlFor="tripTitle"></label>
            <input 
              type="text" 
              id="tripTitle"
              className="form-control"></input>
          </div>
          <div className="form-group">
            <label htmlFor="tripCountry">Where did you start?</label>
            <input 
              type="text" 
              id="tripCountry"
              className="form-control"></input>
          </div>
          <div className="form-group">
            <label htmlFor="tripNotes">Tell the world about your trip!</label>
            <textarea 
              id="tripNotes"
              className="form-control"></textarea>
          </div>
          <div>
            <RenderMap />
          </div>
        </div>
        <div className="col"
          style={{ background: 'khaki' }}>
          {/* TODO: create memory component */}
          {/* TODO: add new create memory component */}
        </div>
      </form>
    </section>
  )
}

export default TripCreate