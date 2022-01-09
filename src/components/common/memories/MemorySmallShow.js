function MemoryShowSmall ({ memory, handleSwitchToEdit }) {
  return (
    <div 
      className="container-fluid"
    >
      <h3 className="row">{memory.name}</h3>
      <div className="row">
        <div className='col'>
          <figure className="image">
            <img src={memory.image} alt={memory.name} className='memory-edit-image' />
          </figure>
        </div>
        <div className='col'>
          <div className="row">
            <p className="col-2">At:</p>
            <p className="col">{memory.location}</p>
          </div>
          <div className="row">
            <p className="col-2">On:</p>
            <p className="col">{memory.date}</p>
          </div>
          <div className="row">
            <p >I remember:</p>
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