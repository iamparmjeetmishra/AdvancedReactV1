import Title from './Title'
import Count from './Count'
import ResetBtn from './ResetBtn'
import { useEffect, useState } from 'react'
import CountBtns from './CountBtns'

export default function Card() {
   const [number, setNumber] = useState(0)

   const locked = number === 5 ? true : false
   console.log('render from card')

   // keyboard
   useEffect(() => {

      const handleKeydown = (e) => {
         if (e.code === 'Space') {
            setNumber(number + 1)
         }
      }

      window.addEventListener('keydown', handleKeydown)
      // cleanup
      return () => { 
         window.removeEventListener('keydown', handleKeydown)
      }
   }, [number])

   return (
      <div className={`card ${locked ? 'card--limit' : ''}`}>
         <Title locked={locked} />
         <Count number={number} />
         <ResetBtn setNumber={setNumber} />
         <CountBtns setNumber={setNumber} locked={locked} />
      </div>
   )
}
