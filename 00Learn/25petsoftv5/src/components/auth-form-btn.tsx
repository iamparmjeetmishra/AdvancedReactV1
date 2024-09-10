'use client'
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type TAuthFormBtnProps = {
   type: "login" | "signup"
}

export default function AuthFormBtn({ type }: TAuthFormBtnProps) {
   const {pending } = useFormStatus()
	return <Button disabled={pending} className="">
   {type === 'login' ? 'Log In' : "Sign Up"}
</Button>
}
