import { useState } from "react";
import Button from "./components/button";

// const url: string = "https://google.com";

export default function App() {

  const [count, setCount] =useState(0)

	return (
		<div className="h-screen flex flex-col items-center justify-center gap-3">
			<h2 className="text-2xl font-semibold">H2</h2>
			{/* <Button bgColor='bg-red-500' /> */}
      {/* <Button style={{
        bgColor: "red",
        fontSize: 24
      }} /> */}
      <Button style={{
        backgroundColor: "red",
        fontSize: 24,
        padding: ".5rem 0.8rem",
        color: 'white',
        borderRadius: '5px'
      }} >Btn</Button>
		</div>
	);
}
