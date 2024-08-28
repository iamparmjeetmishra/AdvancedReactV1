
export default function Footer() {
   const year = new Date().getFullYear()
   return (
      <footer>
         <small>&copy; {year} All Rights Reserved. </small>
         <p>Version 1.5</p>
      </footer>
   )
}
