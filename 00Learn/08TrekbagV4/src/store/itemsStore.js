import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { initialItems } from '../lib/constants'

export const useItemStore = create(
   persist((set) => ({
      items: initialItems,
      addItem: (newItemText) => {
         const newItem = {
            id: Date.now(),
            name: newItemText,
            packed: false
         }
         set(state => ({ items: [...state.items, newItem] }))
      },
      removeItems: () => {
         set(() => ({ items: [] }))
      },
      removeSingleItem: (id) => {
         set((state) => {
            const newItem = state.items.filter((item) => item.id !== id)
            return { items: newItem }
         })
      },
      checkedItem: (id) => {
         set(state => {
            const newItems = state.items.map((item) => {
               if (item.id === id) {
                  return { ...item, packed: !item.packed };
               }
            })
            return item
         })
         return { items: newItems }
      },
      resetToInitial: () => {
         set(() => ({ items: initialItems }))
      },
      markAllComplete: () => {
         set(state => {
            const newItems = state.items.map((item) => {
               return { ...item, packed: true };
            });
            return { items: newItems }
         })
      },
      markAllIncomplete: () => {
         set(state => {
            const newItems = state.items.map((item) => {
               return { ...item, packed: false }
            });
            return { items: newItems }
         })
      },
      removeSingleItem: (id) => {
         set(state => {
            const newItem = state.items.filter((item) => item.id !== id)
            return { items: newItem }
         })
      },
   }), {
      name: 'items'
   }))