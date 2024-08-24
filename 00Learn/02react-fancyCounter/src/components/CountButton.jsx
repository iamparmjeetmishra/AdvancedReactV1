import { PlusIcon, MinusIcon } from '@radix-ui/react-icons'


export default function CountButton({ type, setNumber, locked }) {
   console.log('render from btn')
   const handleClick = (e) => {
      setNumber((prev) => {
         if (type === 'minus') {
            const newNum = prev - 1
            if (newNum < 0) {
               return 0
            }
            return newNum
         } else {
            const newNum = prev + 1
            if (newNum > 5) {
               return 5
            }
            return newNum
         }
      })
      e.currentTarget.blur()
   }

   return (
      <button disabled={locked} onClick={handleClick} className='count-btn count-btn--plus '>
         {
            type === 'minus'
               ? <MinusIcon className='count-btn-icon' />
               : <PlusIcon className='count-btn-icon' />
         }
         </button>
   )
}