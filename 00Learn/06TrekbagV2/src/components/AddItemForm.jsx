import { useState, useRef } from 'react'
import Button from "./Button";

export default function AddItemForm({onAddItem}) {
   const [itemText, setItemText] = useState('')
   const inputRef = useRef()
   
   const submitHandler = (e) => {
      e.preventDefault()

      // basic validation
      if (!itemText) {
         alert('Item cannot be empty')
         inputRef.current.focus()
         return
      }

      // handleAddItem(prev => [...prev, newItem])
      onAddItem(itemText)

      console.log(itemText)
   }

   return (
      <form onSubmit={ submitHandler }>
         <h2>Add an Item</h2>
         <input
            type='text'
            value={itemText}
            onChange={(e) => { setItemText(e.target.value) }}
            autoFocus={true}
         />
         <Button>Add to list</Button>
      </form>
   )
}
