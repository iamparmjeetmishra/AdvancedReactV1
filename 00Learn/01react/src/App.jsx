import Button from "./components/Button";
import Count from "./components/Count";
import { useState} from 'react'



export default function App() {
  const [number, setNumber] = useState(0)



  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: 'center',
    }}>
      <h1>Count App</h1>
      {
        number < 4 
          ? <Count number={number} />
          : null
      }

      <Button setNumber={setNumber} />
    </div>
  )
}