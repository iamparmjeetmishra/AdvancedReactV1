import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";

export default function SignupPage() {
	return <main>
	<H1 className="text-center">Sign up</H1>
	<AuthForm />
	<p className="text-sm">
		Already have an account? {" "} 
		<Link href='/login' className="font-semibold text-grass-500">Log in</Link>
	</p>
</main>
}
