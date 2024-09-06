import { useFormStatus } from "react-dom";

export default function Button() {
   const { pending } = useFormStatus()
	return (
		<button disabled={pending} className="bg-cyan-500 text-white font-semibold py-2 px-6">
			{/* {pending ? 'Adding...' : 'Add Todo'}
          */}
         Add Todo
		</button>
	);
}
