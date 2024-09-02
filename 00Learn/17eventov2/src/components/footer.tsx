import Link from "next/link";

const routes = [
	{
		name: "Terms & Conditions",
		path: "/terms-conditions",
	},
	{
		name: "Privacy Policy",
		path: "/privacy-policy",
	},
];

export default function Footer() {
	return (
		<footer className="mt-auto flex items-center h-16 px-3 sm:px-9 text-xs text-white/25 border-t border-white/10 justify-between p-">
			<small className="text-xs">&copy; 2025 Parm. All rights reserved.</small>
			<ul className="flex gap-x-3 sm:gap-x-8">
				{routes.map((route) => (
					<li key={route.path}>
						<Link href={route.path}>{route.name}</Link>
					</li>
				))}
			</ul>
		</footer>
	);
}
