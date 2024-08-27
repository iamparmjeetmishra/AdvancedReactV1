import { useState } from "react"
import { MSG_MAX_LENGTH } from "../lib/constants"


export default function FeedbackForm() {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    if (newText.length > MSG_MAX_LENGTH) {
      return
    }
    setText(newText)
  }

  console.log(text)

  const charCount = MSG_MAX_LENGTH - text.length

  return (
    <form className="form" onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={handleChange}
        id="feedback-textarea"
        placeholder=""
        spellCheck={false}
        maxLength={MSG_MAX_LENGTH}
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