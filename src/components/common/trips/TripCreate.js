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
            <label htmlFor="title"></label>
            <input 
              type="text"
              name="title"
              id="title"
              className="form-control"></input>
          </div>
          <div className="form-group">
            <label htmlFor="countryVisited">Where did you start?</label>
            <input 
              type="text" 
              name="countryVisited"
              id="countryVisited"
              className="form-control"></input>
          </div>
          <div className="form-group">
            <label htmlFor="notes">Tell the world about your trip!</label>
            <textarea 
              name="notes"
              id="notes"
              className="form-control"></textarea>
          </div>
          <div>
            <RenderMap />
          </div>
        </div>
        <div className="col d-flex flex-column"
          style={{ background: 'khaki' }}>
          {/* TODO: create memory component */}
          {/* TODO: add new create memory component */}
        </div>
        <div className='row'>
          <button 
            type="submit"
            className="btn btn-success ml-auto"
          >Save your trip</button>
        </div>
      </form>
    </section>
  )
}

export default TripCreate