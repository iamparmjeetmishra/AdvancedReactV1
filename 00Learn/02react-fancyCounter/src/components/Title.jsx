
export default function Title({locked}) {
   return <h1 className='title'>
      {
         locked ? 'Limit! Buy Pro for > 5' : 'Fancy Counter'
   }
   </h1>
}