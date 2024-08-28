import { useItemStore } from "../store/itemsStore";
import Button from "./Button";


export default function ButtonGroup() {
   
   const markAllComplete = useItemStore((state) => state.markAllComplete)
   const markAllIncomplete = useItemStore((state) => state.markAllIncomplete)
   const resetToInitial = useItemStore((state) => state.resetToInitial)
   const removeItems = useItemStore((state) => state.removeItems)

   const btnActions = {
      markAllComplete,
      markAllIncomplete,
      resetToInitial,
      removeItems
   }

   return (
      <section className='button-group'>
         {/* {
            SecondaryBtns.map(btn =>
               <Button  key={btn} type='secondary'>{btn}</Button>)
         } */}
         <Button onClick={btnActions.markAllComplete} buttonType='secondary'>Mark all as complete</Button>
         <Button onClick={btnActions.markAllIncomplete}  buttonType='secondary'>Mark all as incomplete</Button>
         <Button onClick={btnActions.resetToInitial} buttonType='secondary'>Reset to initial</Button>
         <Button onClick={btnActions.removeItems} buttonType='secondary'>Remove all items</Button>
      </section>
   )
}
