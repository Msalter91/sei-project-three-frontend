import { useState } from 'react'
import MemoryEdit from './MemoryEdit'
import MemoryShowSmall from './MemorySmallShow'


function MemorySmall (memory){
  const [isShowMode, setIsShowMode] = useState(true)
  return (
    <>
      { isShowMode ?
        <MemoryShowSmall memory={memory}/> :
        <MemoryEdit memory={memory} />
      }
    </>
  )
}

export default MemorySmall