import { memo,useState } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
//React-bootstrap
import { Row, Col, Container } from 'react-bootstrap'

//Router
import { Link } from 'react-router-dom'


//Img
import topHeader from '/src/assets/images/dashboard/top-header.png'
import topHeader1 from '/src/assets/images/dashboard/top-header1.png'
import topHeader2 from '/src/assets/images/dashboard/top-header2.png'
import topHeader3 from '/src/assets/images/dashboard/top-header3.png'
import topHeader4 from '/src/assets/images/dashboard/top-header4.png'
import topHeader5 from '/src/assets/images/dashboard/top-header5.png'



const SubHeader = memo((props) => {
  
    return (
        <div className="iq-navbar-header" style={{ height: "215px" }}>
           
            {/* {{!-- rounded-bottom if not using animation --}} */}
            <div className="iq-header-img">
                <img src={topHeader} alt="header" className="theme-color-default-img img-fluid w-100 h-100 animated-scaleX" loading="lazy" />
                <img src={topHeader1} alt="header" className=" theme-color-purple-img img-fluid w-100 h-100 animated-scaleX" loading="lazy" />
                <img src={topHeader2} alt="header" className="theme-color-blue-img img-fluid w-100 h-100 animated-scaleX" loading="lazy" />
                <img src={topHeader3} alt="header" className="theme-color-green-img img-fluid w-100 h-100 animated-scaleX" loading="lazy" />
                <img src={topHeader4} alt="header" className="theme-color-yellow-img img-fluid w-100 h-100 animated-scaleX" loading="lazy" />
                <img src={topHeader5} alt="header" className="theme-color-pink-img img-fluid w-100 h-100 animated-scaleX" loading="lazy" />
            </div>
        </div>
    )
})

SubHeader.displayName = "SubHeader"
export default SubHeader
