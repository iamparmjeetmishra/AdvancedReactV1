'use client'
import { createCheckoutSession } from "@/actions/actions";
import H1 from "@/components/h1";
import { Button } from "@/components/ui/button";

export default function PaymentPage() {
   return <main className="flex flex-col gap-3 items-center">
      <H1>PetSoft access requires payment</H1>
      <p></p>
      <Button
         onClick={async() => {
            await createCheckoutSession()
         }}
      >Buy lifetime access for $299</Button>
   </main>
}
