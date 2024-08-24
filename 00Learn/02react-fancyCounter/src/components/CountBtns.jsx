import CountButton from './CountButton'


export default function CountBtns({ type, setNumber }) {
   
   return (
      <div className="button-container">
         <CountButton setNumber={setNumber} type='minus' />
         <CountButton setNumber={setNumber} type='plus' />
      </div>
   )
}


