import { buttonStyle } from '../../../../lib/bootstrap-css-config'
import IconPlusSquare from '../../../Assets/IconPlusSquare'

function MemorySmallAddMemoryButton ({ onClick, className, ...options }) {
  return (
    <button 
      onClick={onClick}
      className={className += ` btn ${buttonStyle.default} btn-sm border-0`}
      {...options}
    >
      <IconPlusSquare />
      <p 
        className='text-center my-0'
      >Add a Memory</p>
    </button>
  )
}

export default MemorySmallAddMemoryButton