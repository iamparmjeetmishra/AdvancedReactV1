import { PlusIcon, MinusIcon } from '@radix-ui/react-icons'


export default function CountBtn({ setNumber }) {
   
   return (
      <div className="button-container">
         <button onClick={() => setNumber((prev) => prev - 1)} className='count-btn '>
            <MinusIcon className='count-btn-icon' />
         </button>
         <button onClick={() => setNumber((prev) => prev + 1)} className='count-btn count-btn--plus '>
            <PlusIcon className='count-btn-icon' />
         </button>
      </div>
   )
}
