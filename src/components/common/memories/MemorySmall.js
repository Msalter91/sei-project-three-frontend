import { useState } from 'react'
import MemoryEdit from './memorySmallChildren/MemoryEdit.js'
import MemoryShowSmall from './memorySmallChildren/MemoryShowSmall.js'


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
        <MemoryShowSmall 
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