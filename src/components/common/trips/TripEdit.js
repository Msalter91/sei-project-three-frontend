import { useState, useEffect } from 'react'
import { tripGetById, tripEdit, tripDelete } from '../../../lib/api'
import { useParams } from 'react-router-dom'

import { makeCountryObject } from '../../../lib/countryData.js'
import Select from 'react-select'

import RenderMap from '../maps/RenderMap'
import Error from '../Error'
import MemoryCreate from '../memories/MemoryCreate'
import MemorySmall from '../memories/MemorySmall'
import { useHistory } from 'react-router-dom'
import { buttonStyle } from '../../../lib/bootstrap-css-config'
import IconBin from '../../Assets/IconBin'
import { removeSingleIndexFromArray } from '../../../lib/helpers'
import MemorySmallAddMemoryButton from './tripsComponents/TripEditAddMemoryButton'

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

function TripEdit () {
  const [formData, setFormData] = useState(initialState)
  const [countryValue, setCountryValue] = useState({
    value: '',
    label: '' })
  const notesRemainingChars = maxLengthNotes - formData.notes.length
  const [formErrors, setFormErrors] = useState(initialState)
  const { tripId } = useParams()
  const [isError, setIsError] = useState(false)
  const history = useHistory()
  const [
    isDisplayingCreateMemory, 
    setIsDisplayingCreateMemory
  ] = useState(false)
  const lineColor = 'rgba(131,238,255,0.8)'

  // populate initial data
  const refreshFormDataFromApi = async ()=>{
    try {
      const getTripRes = await tripGetById(tripId)
      const newFormData = { ...formData,...getTripRes.data }
      setFormData(newFormData)
      setIsDisplayingCreateMemory(!(newFormData.memories.length))
      setCountryValue({
        value: newFormData.countryVisited,
        label: newFormData.countryVisited })
    } catch (err){
      setIsError(true)
    }
  }

  const countryOptions = makeCountryObject()

  useEffect(()=>{
    (async ()=>{
      await refreshFormDataFromApi()
    })()
    // Do NOT want this hook to re-render on formData change, therefore accept non-exhaustive dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId])
  
  const handleChange = e =>{
    const value = e.target.value
    // if user is editing limited field and exceeds length, do not accept new characters.
    // improves UX and ensures form can always be submitted so that updating memories does not get blocked by over-length text fields
    // TODO: release lock on notes length to make writing easier, but cut off over-length writing on submit?
    if (
      (e.target.name === 'title' &&
      e.target.value.length > maxLengthTitle) ||
      (e.target.name === 'notes' &&
      e.target.value.length > maxLengthNotes)
    ) {
      return
    }
    setFormData({ ...formData, [e.target.name]: value })
  }

  const handleChangeCountry = value => {
    setFormData({ ...formData, countryVisited: value.value })
    setCountryValue(value)
  }

  const handleSubmit = async e =>{
    e.preventDefault()
    try {
      await tripEdit(tripId, formData)
    } catch (err) {
      setFormErrors(err.response.data.errors)
    }
  }
  const handleDeleteTripButton = async () =>{
    try {
      await tripDelete(tripId)
      //todo: toast - `Deleted Trip : ${formData.title}`
      history.push('/trips')
    } catch (err) {
      setIsError(true)
    }
  }

  const addNewMemoryToTrip = async (newMemoryId) =>{
    try {
      const newFormData = { 
        ...formData, 
        memories: [...formData.memories, newMemoryId], 
      }
      await tripEdit(tripId, newFormData)
      refreshFormDataFromApi()
    } catch (err){
      setIsError(true)
    }
  }
  const toggleCreateMemoryForm = () =>{
    setIsDisplayingCreateMemory(!isDisplayingCreateMemory)
  }
  const updateClientsideMemory = (index) => {
    // build function to allow memory components to update trip data without re-fetching.
    return function (newMemoryData) {
      if (newMemoryData._id){
        formData.memories[index] = newMemoryData
        setFormData({ ...formData })
      } else {
        setFormData({ 
          ...formData, 
          memories: removeSingleIndexFromArray(formData.memories, index),
        })
      }
    }
  }
  
  return (
    <section className="section">
      {isError ? (
        <Error />
      ) : (
        <>
          <div className="container fluid">
            <div className="bg-white shadow rounded overflow-hidden">
              <div className="px-4 pt-1 pb-4 cover">
                <div className="d-flex-body mb-0 text-white">
                  <h3 className="title-trip-create text-uppercase text-center pb-0 pt-4">create a trip with memories!</h3>
                </div>
              </div>
            </div>

            <div className="d-flex fluid row w-auto">
              <div className="col-5 fluid shadow rounded m-3 bg-light">
                <form
                  onSubmit={handleSubmit}
                  className="col placebook-form fluid"
                >
                  <div className="form-group">
                    <label htmlFor="title">Give your trip a name</label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className={`form-control ${formErrors.countryVisited ? 'border-danger' : ''}`}
                      value={formData.title}
                      onChange={handleChange} />
                    {formErrors.title && <p className="text-danger">{formErrors.title}</p>}
                  </div>
                  <div className="form-group">

                    <label htmlFor="countryVisited">Where did you start?</label>
                    <Select options={countryOptions} value={countryValue} onChange={handleChangeCountry}  />
                    {formErrors.countryVisited && <p className="text-danger">{formErrors.countryVisited}</p>}

                  </div>
                  <div className="form-group">
                    <label htmlFor="notes">Tell the world about your trip!</label>
                    <textarea
                      name="notes"
                      id="notes"
                      className={`form-control 
                ${(notesRemainingChars < 0 ||
                          formErrors.notes) ? 'border-danger' : ''}`}
                      value={formData.notes}
                      onChange={handleChange} />
                    <div className='row'>
                      <small
                        className={`form-text ml-auto text-end ${(notesRemainingChars < 0) ? 'text-danger' : 'text-muted'}`}
                      >{notesRemainingChars} characters remaining</small>
                    </div>
                    {formErrors.notes && <p className="text-danger">{formErrors.notes}</p>}
                  </div>
                  <div className='edit-trip-map-container'>
                    <RenderMap arrayOfTrips={[{ ...formData, lineColor: lineColor }]} />
                  </div>
                  <div className='row mt-1' style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <button
                      type="submit"
                      className={`btn ${buttonStyle.default} btn-sm col`}
                    >Save your trip</button>
                    <button
                      type="button"
                      className={`btn ${buttonStyle.danger} btn-sm col w-fit`}
                      onClick={handleDeleteTripButton}
                    >
                      <IconBin />
                    </button>
                  </div>
                </form>
              </div>
              {/* * * MEMORIES SECTION * * */}
              <div className="col-md">
                <div className="col-12 fluid">
                  <div
                    className='d-flex flex-column'>
                  </div>
                  <div className='trip-memories-container row mx-auto'>
                    {Boolean(formData.memories.length) &&
                      formData.memories.map(
                        (memory, index) => (
                          <MemorySmall
                            key={memory._id}
                            memory={memory}
                            updateClientsideMemory={updateClientsideMemory(index)} />
                        )
                      )}
                    {!isDisplayingCreateMemory ? 
                      <MemorySmallAddMemoryButton 
                        className={'col'}
                        onClick={toggleCreateMemoryForm} /> :
                      <MemoryCreate
                        tripId={tripId}
                        addNewMemoryToTrip={addNewMemoryToTrip}
                        toggleCreateMemoryForm={toggleCreateMemoryForm} />
                    }
                  </div>
                </div>

              </div>
            </div>
          </div><div className="row py-4 px-4">
            <div className="col-md-11 mx-auto row">
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default TripEdit