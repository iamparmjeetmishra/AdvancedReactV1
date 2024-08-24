import Title from './Title'
import Count from './Count'
import ResetBtn from './ResetBtn'
import { useState } from 'react'
import CountBtns from './CountBtns'

export default function Card() {
   const [number, setNumber] = useState(0)

   return (
      <div className='card'>
         <Title />
         <Count number={number}  />
         <ResetBtn setNumber={setNumber} />
         <CountBtns setNumber={setNumber} />
      </div>
   )
}
