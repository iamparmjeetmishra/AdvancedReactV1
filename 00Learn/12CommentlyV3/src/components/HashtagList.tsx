import { useFeedbackItemsContext } from "../lib/hooks";

export default function HashtagList() {
	const { companyList, handleSelectCompany } =
		useFeedbackItemsContext();
	return (
		<ul className="hashtags">
			{companyList.map((company: string) => (
				<li key={company}>
					<button onClick={() => handleSelectCompany(company)}>
						#{company}
					</button>
				</li>
			))}
		</ul>
	);
}
