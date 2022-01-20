import { useState } from 'react'
import MemoryEdit from './memorySmallChildren/MemoryEdit.js'
import MemorySmallShow from './memorySmallChildren/MemorySmallShow'


function MemorySmall ({ memory, updateClientsideMemory }){
  const [isShowMode, setIsShowMode] = useState(true)

  const handleSwitchToEdit = () =>{
    setIsShowMode(false)
  }
  const handleSwitchToShow = () =>{
    setIsShowMode(true)
  }
  //todo use a context instead of passing functions for updating client trip.memories
  return (
    <>
      { isShowMode ?
        <MemorySmallShow 
          memory={memory} 
          handleSwitchToEdit={handleSwitchToEdit}
        /> :
        <MemoryEdit 
          memory={memory} 
          handleSwitchToShow={handleSwitchToShow}  
          updateClientsideMemory={updateClientsideMemory}
        />
      }
    </>
  )
}

export default MemorySmall