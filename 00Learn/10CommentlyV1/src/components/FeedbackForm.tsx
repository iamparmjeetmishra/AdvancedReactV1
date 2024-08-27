import { useState } from "react"

const MSG_MAX_LENGTH = 150

export default function FeedbackForm() {
  const [text, setText] = useState('')

  const handleClick = (e) => {
    e.preventDefault()
    console.log(e.target.value)
  }
  console.log(text)
  const charCount = MSG_MAX_LENGTH - text.length

  return (
    <form className="form" onSubmit={handleClick}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        id="feedback-textarea"
        placeholder=""
        spellCheck={false}
        maxLength={150}
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company
      </label>
      <div>
        <p className="u-italic">{ charCount}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  )
}