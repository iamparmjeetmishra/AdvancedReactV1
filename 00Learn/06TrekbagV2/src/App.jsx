import { useEffect, useState } from 'react'
import BackgroundHeading from "./components/BackgroundHeading";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ItemList from "./components/ItemList";
import Sidebar from "./components/Sidebar";
import { initialItems } from "./lib/constants";

export default function App() {

  // const itemsFromLocalStorage = JSON.parse(localStorage.getItem('items'))

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

  const numberOfItemsPacked = items.filter((item) => item.packed).length

  return (
    <>
      <BackgroundHeading />
      <main>
        <Header numberOfItemsPacked={numberOfItemsPacked} totalNumberOfItems={items.length} />
        <ItemList itemActions={itemActions} items={items} />
        <Sidebar handleAddItem={handleAddItem} btnActions={btnActions} />
      </main>
      <Footer />
    </>
  )
}
