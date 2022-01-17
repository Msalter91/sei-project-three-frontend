import { buttonStyle } from '../../../../lib/bootstrap-css-config.js'
import { isOwner } from '../../../../lib/auth.js'

function MemorySmallShow ({ memory, handleSwitchToEdit }) {
  const showEdit = !!handleSwitchToEdit && isOwner(memory.addedBy)

  return (
    <div 
      className="show-small-container d-flex flex-column placebook-form shadow rounded m-3 bg-light"
    >
      <div className='row'>
        <img src={memory.image} alt={memory.name} className='memory-edit-image image mx-auto' />
      </div>
      <div className="row">
        <h3 className="mx-auto text-center">{memory.name}</h3>
      </div>
      <div className="row">
        <div className="col mx-auto">
          <div>
            {[
              [memory.location, 'At:'], 
              [memory.visitDate, 'On:']
            ].map(field=>(
              <div key={field[0]} className="row">
                <h6 className="w-4em pr-0 mr-0">{field[1]}</h6>
                <p className="col pl-0 ml-0">{field[0]}</p>
              </div>  
            ))}
            <div className="row">
              <h6 >I remember:</h6>
              <p >{memory.notes}</p>
            </div>
          </div>
        </div>
      </div>
      {showEdit && (
        <div className="memory-show-small-buttons row mt-auto">
          <button className={`btn ${buttonStyle.default}`} onClick={handleSwitchToEdit}>Edit</button>
        </div>
      )}
    </div>
  )
}

export default MemorySmallShow