

export default function ButtonContainer({children}) {
   console.log('render from countbtns')
   return (
      <div className="button-container">
         {children}
      </div>
   )
}


