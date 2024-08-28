import { createContext, useEffect, useState } from "react"
import { initialItems } from "../lib/constants"

export const ItemsContext = createContext()

export default function ItemsContextProvider({children}) {
   const [items, setItems] = useState(() => {
      return JSON.parse(localStorage.getItem('items')) || initialItems
   })

   const handleAddItem = (newItemText) => {
      const newItem = {
         id: Date.now(),
         name: newItemText,
         packed: false
      }

      const newItems = [...items, newItem]
      setItems(newItems)
   }

   const removeSingleItem = (id) => {
      const newItem = items.filter((item) => item.id !== id)
      console.log(newItem)
      setItems(newItem)
   }

   const checkedItem = (id) => {
      const newItem = items.map((item) => item.id === id ? { ...item, packed: !item.packed } : item)
      console.log(newItem)
      setItems(newItem)
   }

   const removeItem = () => {
      setItems([])
   }

   const resetToInitial = () => {
      setItems(initialItems)
   }

   const markAllComplete = () => {
      const newItems = items.map((item) => {
         return { ...item, packed: true };
      });
      console.log(newItems)
      setItems(newItems)
   }

   const markAllIncomplete = () => {
      const newItems = items.map((item) => {
         return { ...item, packed: false }
      });
      console.log(newItems)
      setItems(newItems)
   }

   useEffect(() => {
      localStorage.setItem('items', JSON.stringify(items))
   }, [items])

   const itemActions = {
      checkedItem,
      removeSingleItem
   }

   const btnActions = {
      removeItem,
      resetToInitial,
      markAllComplete,
      markAllIncomplete,
   }
   return (
      <ItemsContext.Provider
         value={{
            items,
            handleAddItem,
            removeSingleItem,
            removeItem,
            markAllComplete,
            markAllIncomplete,
            itemActions,
            btnActions,
         }}
      >
         {children}
      </ItemsContext.Provider>
   )
}
