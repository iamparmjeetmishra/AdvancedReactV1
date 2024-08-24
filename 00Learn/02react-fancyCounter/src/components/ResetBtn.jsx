import { ResetIcon } from "@radix-ui/react-icons";

export default function ResetBtn({setNumber}) {
   return <button onClick={() => setNumber(0)} className='reset-btn'>
      <ResetIcon className="reset-btn-icon" />
   </button>
}
