import { useState } from 'react'
import MemoryEdit from './memorySmallChildren/MemoryEdit.js'
import MemoryShowSmall from './memorySmallChildren/MemorySmallShow.js'


function MemorySmall ({ memory }){
  const [isShowMode, setIsShowMode] = useState(true)

  const handleSwitchToEdit = () =>{
    setIsShowMode(false)
  }
  const handleSwitchToShow = () =>{
    setIsShowMode(true)
  }
  //todo update memory on submit of changes
  return (
    <>
      { isShowMode ?
        <MemoryShowSmall memory={memory} handleSwitchToEdit={handleSwitchToEdit}/> :
        <MemoryEdit memory={memory} handleSwitchToShow={handleSwitchToShow}/>
      }
    </>
  )
}

export default MemorySmall