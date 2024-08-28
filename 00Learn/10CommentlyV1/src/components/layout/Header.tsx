import FeedbackForm from "../feedback/FeedbackForm";
import Logo from "../Logo";
import PageHeading from "../PageHeading";
import Pattern from "../Pattern";

type THeaderProps = {
	handleAddToList: (text: string) => void;
}

export default function Header({handleAddToList}:THeaderProps) {
	return <header>
		<Pattern />
		<Logo />
		<PageHeading />
		<FeedbackForm handleAddToList={handleAddToList} />
	</header>;
}
