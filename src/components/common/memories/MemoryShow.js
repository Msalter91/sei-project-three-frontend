import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'

function MemoryShow () {
  const { memoryId } = useParams()

  const [memory, setMemory] = React.useState(null)

  React.useEffect(() => {
    const getMemory = async () => {
      try {
        const memoryData = await axios.get(`/api/memories/${memoryId}`)
        setMemory(memoryData.data)
      } catch (err) {
        console.log(err)
      }
    }
    getMemory()
  }, [memoryId] )
  console.log(memory)

  return (
    <div className='container-fluid h-100' style={{ border: '1px solid red' }}>
      {memory &&
    <div className='container-fluid memory-wrapper'>
      <div className='row'>
        <div className='col memory-image-holder'>
          <h2>{memory.name}</h2>
          <img src={memory.image} />
        </div>
      </div>
      <div className='row memory-info-holder'>
        <div className='col-sm-4' style={{ border: '1px solid blue' }}>
          <p>part of Trip</p>
        </div>
        <div className='col-sm-8' style={{ border: '1px solid blue' }}>
          <p>Added on {memory.created_at}</p>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-12'>
          <p>{memory.location}</p>
          <p>{memory.notes}</p>
        </div>

      </div>
    </div>
      }   
    </div>
  )
}

export default MemoryShow
