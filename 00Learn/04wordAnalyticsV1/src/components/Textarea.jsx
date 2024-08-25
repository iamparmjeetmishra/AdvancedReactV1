import { useState } from 'react'
import Warning from './Warning';

export default function Textarea() {
   const [text, setText] = useState('')
   const [warningText, setWarningText] = useState('')

   const handleChange = (e) => {
      setWarningText('')
      let newText = e.target.value
      if (newText.includes('<script>')) {
         setWarningText('script')
         newText = newText.replace('<script>', '')
         
      }
      setText(newText)
      console.log(newText)
   }

   return (
      <div className='textarea'>
         <textarea
            value={text}
            onChange={handleChange}
            placeholder='Enter your text here'
            spellCheck='false'
         />
         {warningText ? <Warning warningText={warningText} /> : null}
      </div>
   )
}
