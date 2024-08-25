import { useState } from "react";
import Stats from "./Stats";
import Textarea from "./Textarea";
import { FB_MAX_CHARS, INSTA_MAX_CHARS } from "../lib/constants";

export default function Container() {
  const [text, setText] = useState('')

  const stat = {
    words: text.split(/\s/).filter((word) => word !== '').length,
    characters: text.length,
    instaWord: INSTA_MAX_CHARS - text.length,
    fbWord: FB_MAX_CHARS - text.length
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
