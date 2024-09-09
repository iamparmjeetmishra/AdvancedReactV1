import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function AuthForm() {
   return <form className="flex flex-col gap-4">
      <div className="space-y-1">
         <Label htmlFor="email">Email</Label>
         <Input id="email" type="email" />
      </div>
      <div className="space-y-1">
         <Label htmlFor="password">Passowrd</Label>
         <Input id="password" type="password" />
      </div>
      <Button className="mb-4">Log in</Button>
   </form>;
}
