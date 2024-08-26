import { SecondaryBtns } from "../lib/constants";
import Button from "./Button";


export default function ButtonGroup() {
   return (
      <section className='button-group'>
         {
            SecondaryBtns.map(btn =>
               <Button key={btn} type='secondary'>{btn}</Button>)
         }
      </section>
   )
}
