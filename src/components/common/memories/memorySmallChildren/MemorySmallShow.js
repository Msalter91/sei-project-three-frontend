function MemoryShowSmall ({ memory, handleSwitchToEdit }) {
  return (
    <div 
      className="container-fluid placebook-form"
    >
      <div className="row">
        <h3 className="mx-auto text-center">{memory.name}</h3>
      </div>
      <div className="row">
        <div className='col'>
          <figure className="image">
            <img src={memory.image} alt={memory.name} className='memory-edit-image' />
          </figure>
        </div>
        <div className='col'>
          {[
            ['location', 'At:'], 
            ['visitDate', 'On:']
          ].map(field=>(
            <div key={field[0]} className="row">
              <h6 className="col-1 pr-0 mr-0">{field[1]}</h6>
              <p className="col pl-0 ml-0">{memory[field[0]]}</p>
            </div>  
          ))}
          <div className="row">
            <h6 >I remember:</h6>
            <p >{memory.notes}</p>
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