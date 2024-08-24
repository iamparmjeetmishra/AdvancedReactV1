import Button from "./components/Button";
import Count from "./components/Count";

export default function App() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: 'center',
    }}>
      <h1>Count App</h1>
      <Count />
      <Button></Button>
    </div>
  )
}
