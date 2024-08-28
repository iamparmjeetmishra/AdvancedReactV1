
type THashtagListProps = {
  companyList: string[];
  handleSelectCompany: (comapany: string) => void;
}

export default function HashtagList({companyList, handleSelectCompany}:THashtagListProps) {

  return (
    <ul className="hashtags">
      {
        companyList.map((company: string) => (
          <li key={company}><button onClick={() => handleSelectCompany(company) }>#{company }</button></li>
        ))
      }
        
    </ul>
  )
}