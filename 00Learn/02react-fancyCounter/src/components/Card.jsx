import Title from './Title'
import Count from './Count'
import ResetBtn from './ResetBtn'
import CountBtn from './CountBtn'
import { useState } from 'react'

export default function Card() {
   const [number, setNumber] = useState(1)

   return (
      <div className='card'>
         <Title />
         <Count number={number}  />
         <ResetBtn setNumber={setNumber} />
         <CountBtn setNumber={setNumber} />
      </div>
   )
}
