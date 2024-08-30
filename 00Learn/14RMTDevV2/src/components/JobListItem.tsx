import { TJobItem } from "../lib/type";
import BookmarkIcon from "./BookmarkIcon";



type TJobListprops = {
  jobItem: TJobItem
}

export default function JobListItem({jobItem}:  TJobListprops) {
  return (
    <li className="job-item">
      <a href={`#${jobItem.id}`} className="job-item__link">
        <div className="job-item__badge">{jobItem.badgeLetters }</div>

        <div className="job-item__middle">
          <h3 className="third-heading">{ jobItem.title }</h3>
          <p className="job-item__company">{ jobItem.company }</p>
        </div>

        <div className="job-item__right">
          <BookmarkIcon />
          <time className="job-item__time">{ jobItem.daysAgo}d</time>
        </div>
      </a>
    </li>
  );
}
