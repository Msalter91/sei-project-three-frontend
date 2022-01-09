import { useState, useEffect } from 'react'

import { memoryEdit, memoryGetById } from '../../../lib/api.js'
import Error from '../Error.js'

const initialState = {
  name: '',
  location: '',
  image: '',
  notes: '',
  lat: 0,
  long: 0,
  visitDate: new Date(),
}
const maxLengthNotes = 200


function MemoryEdit ({ memoryId }) {
  const [formData, setFormData] = useState(initialState)
  const notesRemainingChars = maxLengthNotes - formData.notes.length
  const [formErrors, setFormErrors] = useState(initialState)
  const [isError, setIsError] = useState(false)

  useEffect(()=>{
    (async ()=>{
      try {
        const getTripRes = await memoryGetById(memoryId)
        const newFormData = { ...formData,...getTripRes.data }
        setFormData(newFormData)
      } catch (err){
        setIsError(true)
      }
    })()
    // Do NOT want this hook to re-render on formData change, therefore accept non-exhaustive dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoryId])
  
  const handleChange = e =>{
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async e =>{
    e.preventDefault()
    console.log('submitting:', formData)
    try {
      const res = await memoryEdit(memoryId, formData)
      console.log('Editing return:',res)
    } catch (err) {
      console.log('error response:', err.res)
      setFormErrors(err.response.data.errors)
    }
  }

  return (
    <>
      {isError ? (
        <Error />
      ) : (
        <form 
          className="container-fluid row"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="notes">What did you love?</label>
            <textarea 
              name="notes"
              id="notes"
              className={
                `form-control 
                ${(notesRemainingChars < 0 ||
                  formErrors.notes ) ? 'border-danger' : ''}`}
              value={formData.notes}
              onChange={handleChange} />
            <div className='row'>
              <small 
                className={`form-text ml-auto text-end ${
                  (notesRemainingChars < 0) ? 'text-danger' : 'text-muted'
                }`}
              >{notesRemainingChars} characters remaining</small>
            </div>
            {formErrors.notes && <p className="text-danger">{formErrors.notes}</p>  }
          </div>
        </form>
      )}
    </>
  )
}

export default MemoryEdit