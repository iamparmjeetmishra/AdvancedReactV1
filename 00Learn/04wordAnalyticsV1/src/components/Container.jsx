import { useState } from "react";
import Stats from "./Stats";
import Textarea from "./Textarea";

export default function Container() {
  const [text, setText] = useState('')

  const wordsArr = text.split(' ')
  const words = wordsArr.length

  const numberOfCharacters = text.length
  const instaWord = 280 - text.length
  const fbWord = 2200 - text.length

  const stat = {
    words: words,
    characters: numberOfCharacters,
    instaWord: instaWord,
    fbWord: fbWord
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
