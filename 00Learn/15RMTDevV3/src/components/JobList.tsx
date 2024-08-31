import { useActiveIdContext, useJobItemsContext } from "../lib/hooks";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";


export function JobList() {
	const { activeId: id } = useActiveIdContext();
	const { jobItemsSortedAndSliced, isLoading} = useJobItemsContext()
	return (
		<ul className="job-list">
			{isLoading && <Spinner />}
			{!isLoading &&
				jobItemsSortedAndSliced?.map((jobItem) => (
					<JobListItem
						key={jobItem.id}
						jobItem={jobItem}
						isActive={id === jobItem.id}
					/>
				))}
		</ul>
	);
}

export default JobList;
