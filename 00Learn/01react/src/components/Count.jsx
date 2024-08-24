import { useEffect } from "react"

export default function Count({ number }) {
   console.log('from count')
   useEffect(() => {
      document.title = `You clicked ${number}`
       
      return () => {
         document.title = 'React app'
      }
   }, [number])
   return (
      <div>{number}</div>
   )
}