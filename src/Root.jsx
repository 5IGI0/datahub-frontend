import MainNavbar from './components/Navbar'
import Footer from './components/Footer'

function Root({children}) {
  return (
    <>
      <MainNavbar/>
      <div className="container mt-3 flex-grow-1">
        {children}
      </div>
      <Footer/>
    </>
  )
}

export default Root
