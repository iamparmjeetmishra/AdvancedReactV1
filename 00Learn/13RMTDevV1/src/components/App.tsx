import { useEffect, useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

function App() {
  const [searchText, setSearchText] = useState('')
  const [jobItems, setJobItems] = useState([])
  

  useEffect(() => {
    if (!searchText) return
    
    const fetchJobs = async () => {
      try {
        const res = await fetch(`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`)
        const data = await res.json()
        setJobItems(data.jobItems)
      } catch (error) {
        console.log('ErrWhileFetching', error)
      }
    }
    fetchJobs()


  }, [searchText])
  console.log(jobItems)

  const headerEffect = {
    setJobItems, searchText, setSearchText
  }

  return <>
    <Background />
    <Header headerEffect={headerEffect}  />
    <Container jobItems={jobItems} />
    <Footer />
  </>;
}

export default App;
