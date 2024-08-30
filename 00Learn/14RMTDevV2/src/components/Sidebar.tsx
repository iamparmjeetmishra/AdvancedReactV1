import JobList from "./JobList";
import Pagination from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import Sorting from "./SortingControls";

export default function Sidebar({jobItems}) {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount count={jobItems.length > 0 ? jobItems.length : 0 }  />
        <Sorting />
      </div>
      <JobList jobItems={jobItems}  />
      <Pagination />
    </div>
  );
}
