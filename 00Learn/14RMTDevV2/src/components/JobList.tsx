import { TJobItem } from "../lib/type";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type TJobListItemProps = {
	jobItems: TJobItem[];
	isLoading: boolean
}

export function JobList({ jobItems, isLoading }: TJobListItemProps) {
	return (
		<ul className="job-list">
			{isLoading && <Spinner />}
			{!isLoading &&
				jobItems.map((jobItem) => (
					<JobListItem key={jobItem.id} jobItem={jobItem} />
				))}
		</ul>
	);
}

export default JobList;
