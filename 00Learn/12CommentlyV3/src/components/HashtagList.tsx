import { useFeedbackItemsStore } from "../store/FeedbackItemStore";

export default function HashtagList() {
	
	const companyList = useFeedbackItemsStore((state) => state.getCompanyList())
	const selectCompany = useFeedbackItemsStore((state) => state.selectCompany)
	
	return (
		<ul className="hashtags">
			{companyList.map((company: string) => (
				<li key={company}>
					<button onClick={() => selectCompany(company)}>
						#{company}
					</button>
				</li>
			))}
		</ul>
	);
}
