
export default function Footer() {
  const date = new Date()
  const year = date.getFullYear()
  
  console.log('footer')
  return (
    <footer className='footer'>
      <small>&copy; Copyright by Parm. All rights reserved.  </small>
      <small>{ year }</small>
    </footer>
  )
}
