import { useState } from "react"
import { MSG_MAX_LENGTH } from "../../lib/constants"

type TFeedbackFormProps = {
  handleAddToList: (text: string) => void;
}


export default function FeedbackForm({handleAddToList}: TFeedbackFormProps) {
  const [text, setText] = useState('')

  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    if (newText.length > MSG_MAX_LENGTH) {
      return
    }
    setText(newText)
  }
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('from hs')
    handleAddToList(text)
    setText('')
    console.log(handleAddToList(text))
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