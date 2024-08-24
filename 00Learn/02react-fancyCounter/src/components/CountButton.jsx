import { PlusIcon, MinusIcon } from '@radix-ui/react-icons'


export default function CountButton({ type, setNumber }) {
   const handleClick = () => {
      setNumber((prev) => {
         if (type === 'minus') {
            const newNum = prev - 1
            if (newNum < 0) {
               return 0
            }
            return newNum
         } else {
            return prev + 1
         }
      })
   }

   return (
      <button onClick={handleClick} className='count-btn count-btn--plus '>
         {
            type === 'minus'
               ? <MinusIcon className='count-btn-icon' />
               : <PlusIcon className='count-btn-icon' />
         }
         </button>
   )
}