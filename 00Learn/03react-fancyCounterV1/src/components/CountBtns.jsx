import CountButton from './CountButton'


export default function CountBtns({ setNumber, locked }) {
   console.log('render from countbtns')
   return (
      <div className="button-container">
         <CountButton setNumber={setNumber} type='minus' locked={locked} />
         <CountButton setNumber={setNumber} type='plus' locked={locked} />
      </div>
   )
}


