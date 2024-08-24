import Title from './Title'
import Count from './Count'
import ResetBtn from './ResetBtn'
import CountBtn from './CountBtn'

export default function Card() {
   return (
      <div className='card'>
         <Title />
         <Count />
         <ResetBtn />
         <CountBtn />
      </div>
   )
}
