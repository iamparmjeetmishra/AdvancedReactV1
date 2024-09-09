import { logIn, signUp } from "@/actions/actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type TAuthFormProps = {
   type: "login" | "signup"
}

export default function AuthForm({type}: TAuthFormProps) {
   return <form
      action={type === 'login' ? logIn: signUp}
      className="flex flex-col gap-4"
   >
      <div className="space-y-1">
         <Label htmlFor="email">Email</Label>
         <Input id="email" name="email" type="email" />
      </div>
      <div className="space-y-1">
         <Label htmlFor="password">Passowrd</Label>
         <Input id="password" name="password" type="password" />
      </div>
      <Button className="mb-4">
         {type === 'login' ? 'Log In' : "Sign Up"}
      </Button>
   </form>;
}
   