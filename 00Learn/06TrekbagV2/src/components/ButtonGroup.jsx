import Button from "./Button";


export default function ButtonGroup({btnActions}) {
   return (
      <section className='button-group'>
         {/* {
            SecondaryBtns.map(btn =>
               <Button  key={btn} type='secondary'>{btn}</Button>)
         } */}
         <Button onClick={btnActions.markAllComplete} buttonType='secondary'>Mark all as complete</Button>
         <Button onClick={btnActions.markAllIncomplete}  buttonType='secondary'>Mark all as incomplete</Button>
         <Button onClick={btnActions.resetToInitial} buttonType='secondary'>Reset to initial</Button>
         <Button onClick={btnActions.removeItem} buttonType='secondary'>Remove all items</Button>
      </section>
   )
}
