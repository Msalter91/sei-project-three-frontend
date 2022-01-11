function MemoryShowSmall ({ memory, handleSwitchToEdit }) {
  return (
    <div 
      className="show-small-container placebook-form"
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
      <div className="memory-show-small-buttons row">
        <button className="btn btn-warning" onClick={handleSwitchToEdit}>Edit</button>
      </div>
    </div>
  )
}

export default MemoryShowSmall