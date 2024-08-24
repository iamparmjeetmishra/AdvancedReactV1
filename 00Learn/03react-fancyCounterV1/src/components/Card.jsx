import Title from './Title'
import Count from './Count'
import ResetBtn from './ResetBtn'
import { useEffect, useState } from 'react'
import ButtonContainer from './ButtonContainer'
import CountButton from './CountButton'

export default function Card() {
   const [number, setNumber] = useState(0)

   const locked = number === 5 ? true : false
   console.log('render from card')

   // keyboard
   useEffect(() => {

      const handleKeydown = (e) => {
         if (e.code === 'Space') {
            const newNum = number + 1
            if (newNum > 5) {
               setNumber(5)
               return
            }
            return setNumber(newNum)
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
         <ButtonContainer>
            <CountButton setNumber={setNumber} type='minus' locked={locked} />
            <CountButton setNumber={setNumber} type='plus' locked={locked} />
         </ButtonContainer>
      </div>
   )
}
