import { useState } from "react";
import Stats from "./Stats";
import Textarea from "./Textarea";

export default function Container() {
  const [text, setText] = useState('')

  const stat = {
    words: text.split(/\s/).filter((word) => word !== '').length,
    characters: text.length,
    instaWord: 280 - text.length,
    fbWord: 2200 - text.length
  }

  return (
    <main className='container'>
      <Textarea text={text} setText={setText} />
      <Stats
        stat={stat}
      />
    </main>
  )
}
