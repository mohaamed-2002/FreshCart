import { Outlet } from 'react-router-dom'
import Navbar from './../../Components/Navbar/Navbar';
import Footer from './../../Components/Footer/Footer';


export default function TamplateName() {
  return (
    <div>


      <Navbar />
      <div className="container min-h-[60vh]">
        <Outlet/>
      </div>
      <Footer />

    </div>
  )
}
