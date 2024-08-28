
type THashtagListProps = {
  companyList: string[]
}

export default function HashtagList({companyList}:THashtagListProps) {

  return (
    <ul className="hashtags">
      {
        companyList.map((company: string) => (
          <li key={company} ><button>#{company }</button></li>
        ))
      }
        
    </ul>
  )
}