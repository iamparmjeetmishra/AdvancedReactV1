
type THashtagListProps = {
  children: React.ReactNode
}

export default function HashtagList({children}:THashtagListProps) {

  return (
    <ul className="hashtags">
      {children}
    </ul>
  )
}