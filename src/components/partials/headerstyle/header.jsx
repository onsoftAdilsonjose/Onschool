import { useState, useEffect, memo, useContext } from 'react'

//react-bootstrap
import { Navbar, Container, Nav, Dropdown, Image, Button, Collapse } from 'react-bootstrap'

//router
import { Link, useLocation } from 'react-router-dom'

//component
import CustomToggle from "../../dropdowns"
import Card from "../../bootstrap/card"

//img
import img1 from "/src/assets/images/shapes/01.png"
import img2 from "/src/assets/images/shapes/02.png"
import img3 from "/src/assets/images/shapes/03.png"
import img4 from "/src/assets/images/shapes/04.png"

import Avatar1 from "/src/assets/images/avatars/01.png"
import Avatar_1 from "/src/assets/images/avatars/avtar_1.png"
import Avatar_2 from "/src/assets/images/avatars/avtar_2.png"
import Avatar_3 from "/src/assets/images/avatars/avtar_3.png"
import Avatar_4 from "/src/assets/images/avatars/avtar_4.png"
import Avatar_5 from "/src/assets/images/avatars/avtar_5.png"
// logo
import Logo from '../components/logo'

// Redux Selector / Action
import { useSelector } from 'react-redux';


// Import selectors & action from setting store
import * as SettingSelector from '../../../store/setting/selectors'
import {AuthContext} from "./../../../context/AuthContext"
// import RadioBtn from '../../../setting/elements/radio-btn'

const Headerpro = memo((props) => {
    const themeFontSize = useSelector(SettingSelector.theme_font_size)
    useEffect(() => {

        document.getElementsByTagName('html')[0].classList.add(themeFontSize)


        //offcanvase code
        const result = window.matchMedia("(max-width: 1200px)");
        window.addEventListener('resize',
            () => {
                if (result.matches === true) {
                    if (show1 === true) {
                        document.documentElement.style.setProperty('overflow', 'hidden');
                    }
                    else {
                        document.documentElement.style.removeProperty('overflow')
                    }

                }
                else {
                    document.documentElement.style.removeProperty('overflow')
                }

            }
        )
        if (window.innerWidth <= '1200') {
            if (show1 === true) {
                document.documentElement.style.setProperty('overflow', 'hidden');
            }
            else {
                document.documentElement.style.removeProperty('overflow')
            }

        }
        else {
            document.documentElement.style.removeProperty('overflow')
        }

    })

    const {user,logOut}=useContext(AuthContext)

    const [show, setShow] = useState(true)

    const [show1, setShow1] = useState(false);




    //fullscreen
    const fullscreen = () => {
        if (!document.fullscreenElement &&
            !document.mozFullScreenElement &&
            !document.webkitFullscreenElement &&
            !document.msFullscreenElement) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen()
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen()
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen()
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen()
            }
        }
    }





    const minisidebar = () => {
        document.getElementsByTagName('ASIDE')[0].classList.toggle('sidebar-mini')
    }

    let location = useLocation();

    return (
        <Navbar expand="xl" className="nav iq-navbar">
            <Container fluid className="navbar-inner">
                <Link to="/" className="navbar-brand">
                    <Logo color={true} />
                    <h4 className="logo-title d-none d-sm-block">{props.app_name}</h4>
                </Link>
                <div className="sidebar-toggle" data-toggle="sidebar" data-active="true" onClick={minisidebar}>
                    <i className="icon d-flex">
                        <svg width="20px" viewBox="0 0 24 24" className="icon-20" >
                            <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                        </svg>
                    </i>
                </div>
                <div className="d-flex align-items-center justify-content-between product-offcanvas">
                    
                   
                </div>
                <div className="d-flex align-items-center">
                    <Button id="navbar-toggle" bsPrefix="navbar-toggler" type="button" aria-expanded={show1} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" onClick={() => setShow1(!show1)} >
                        <span className="navbar-toggler-icon">
                            <span className="mt-1 navbar-toggler-bar bar1"></span>
                            <span className="navbar-toggler-bar bar2"></span>
                            <span className="navbar-toggler-bar bar3"></span>
                        </span>
                    </Button>
                </div>
                <div className={` navbar-collapse ${show1 === true ? 'collapse show' : 'collapse'}`} id="navbarSupportedContent">
                    <ul className="mb-2 navbar-nav ms-auto align-items-center navbar-list mb-lg-0">
                      
                      {/**NOTIFICACOES */}
                        <Dropdown as="li" className="nav-item">
                            <Dropdown.Toggle as={CustomToggle} variant="nav-link ">
                                <div className=" btn-sm rounded-pill">
                                    <svg className="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.7695 11.6453C19.039 10.7923 18.7071 10.0531 18.7071 8.79716V8.37013C18.7071 6.73354 18.3304 5.67907 17.5115 4.62459C16.2493 2.98699 14.1244 2 12.0442 2H11.9558C9.91935 2 7.86106 2.94167 6.577 4.5128C5.71333 5.58842 5.29293 6.68822 5.29293 8.37013V8.79716C5.29293 10.0531 4.98284 10.7923 4.23049 11.6453C3.67691 12.2738 3.5 13.0815 3.5 13.9557C3.5 14.8309 3.78723 15.6598 4.36367 16.3336C5.11602 17.1413 6.17846 17.6569 7.26375 17.7466C8.83505 17.9258 10.4063 17.9933 12.0005 17.9933C13.5937 17.9933 15.165 17.8805 16.7372 17.7466C17.8215 17.6569 18.884 17.1413 19.6363 16.3336C20.2118 15.6598 20.5 14.8309 20.5 13.9557C20.5 13.0815 20.3231 12.2738 19.7695 11.6453Z" fill="currentColor"></path>
                                        <path opacity="0.4" d="M14.0088 19.2283C13.5088 19.1215 10.4627 19.1215 9.96275 19.2283C9.53539 19.327 9.07324 19.5566 9.07324 20.0602C9.09809 20.5406 9.37935 20.9646 9.76895 21.2335L9.76795 21.2345C10.2718 21.6273 10.8632 21.877 11.4824 21.9667C11.8123 22.012 12.1482 22.01 12.4901 21.9667C13.1083 21.877 13.6997 21.6273 14.2036 21.2345L14.2026 21.2335C14.5922 20.9646 14.8734 20.5406 14.8983 20.0602C14.8983 19.5566 14.4361 19.327 14.0088 19.2283Z" fill="currentColor"></path>
                                    </svg>
                                    <span className="bg-danger dots"></span>
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu variant="end p-0 sub-drop">
                                <Card className="m-0 shadow-none ">
                                    <Card.Header className="py-3 d-flex justify-content-between bg-primary">
                                        <div className="header-title">
                                            <h5 className="mb-0 text-white">Todas as notificações</h5>
                                        </div>
                                    </Card.Header>
                                    <Card.Body className="p-0 max-17 scroll-thin">
                                        <div className="iq-sub-card">
                                            <div className="d-flex align-items-center">
                                                <Image className="p-1 avatar-40 rounded-pill bg-soft-primary" src={img1} alt="" loading="lazy" />
                                                <div className="ms-3 w-100">
                                                    <h6 className="mb-0 ">Emma Watson Bni</h6>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-0">95 MB</p>
                                                        <small className="float-end font-size-12">Just Now</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="iq-sub-card">
                                            <div className="d-flex align-items-center">
                                                <Image className="p-1 avatar-40 rounded-pill bg-soft-primary" src={img2} alt="" loading="lazy" />
                                                <div className="ms-3 w-100">
                                                    <h6 className="mb-0 ">New customer is join</h6>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-0">Cyst Bni</p>
                                                        <small className="float-end font-size-12">5 days ago</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="iq-sub-card">
                                            <div className="d-flex align-items-center">
                                                <Image className="p-1 avatar-40 rounded-pill bg-soft-primary" src={img3} alt="" loading="lazy" />
                                                <div className="ms-3 w-100">
                                                    <h6 className="mb-0 ">Two customer is left</h6>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-0">Cyst Bni</p>
                                                        <small className="float-end font-size-12">2 days ago</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="iq-sub-card">
                                            <div className="d-flex align-items-center">
                                                <Image className="p-1 avatar-40 rounded-pill bg-soft-primary" src={img4} alt="" loading="lazy" />
                                                <div className="w-100 ms-3">
                                                    <h6 className="mb-0 ">New Mail from Fenny</h6>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-0">Cyst Bni</p>
                                                        <small className="float-end font-size-12">3 days ago</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </Card.Body>
                                </Card>
                            </Dropdown.Menu>
                        </Dropdown>



                      {/**ZOOM DA TELA */}
                        <Nav.Item className=" iq-full-screen d-none d-xl-block" onClick={() => setShow(!show)}>
                            <Nav.Link id="btnFullscreen" onClick={fullscreen} className='pe-3'>
                                <span className="btn-inner">
                                    <svg className="normal-screen icon-24" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.5528 5.99656L13.8595 10.8961" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M14.8016 5.97618L18.5524 5.99629L18.5176 9.96906" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M5.8574 18.896L10.5507 13.9964" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M9.60852 18.9164L5.85775 18.8963L5.89258 14.9235" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                    <svg className="full-normal-screen icon-32 d-none" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.7542 10.1932L18.1867 5.79319" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M17.2976 10.212L13.7547 10.1934L13.7871 6.62518" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M10.4224 13.5726L5.82149 18.1398" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M6.74391 13.5535L10.4209 13.5723L10.3867 17.2755" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </span>
                            </Nav.Link>
                        </Nav.Item>

                        {/** USUARIO INFORMATION */}
                        <Dropdown as="li" className="nav-item iq-tour ps-3 ps-lg-0">
                            <Dropdown.Toggle as={CustomToggle} variant="py-0  d-flex align-items-center nav-link"  >
                                <img src={Avatar1} alt="User-Profile" className="theme-color-img img-fluid avatar avatar-50 avatar-rounded" loading="lazy" />
                                <img src={Avatar_1} alt="User-Profile" className="theme-color-purple-img img-fluid avatar avatar-50 avatar-rounded" loading="lazy" />
                                <img src={Avatar_2} alt="User-Profile" className="theme-color-blue-img img-fluid avatar avatar-50 avatar-rounded" loading="lazy" />
                                <img src={Avatar_3} alt="User-Profile" className="theme-color-green-img img-fluid avatar avatar-50 avatar-rounded" loading="lazy" />
                                <img src={Avatar_4} alt="User-Profile" className="theme-color-yellow-img img-fluid avatar avatar-50 avatar-rounded" loading="lazy" />
                                <img src={Avatar_5} alt="User-Profile" className="theme-color-pink-img img-fluid avatar avatar-50 avatar-rounded" loading="lazy" />
                                <div className="caption ms-3 d-none d-md-block ">
                                    <h6 className="mb-0 caption-title">{user.primeiro_nome+" "+user.ultimo_nome}</h6>
                                    <p className="mb-0 caption-sub-title">{user.usertype}</p>
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu variant="end">
                                <Dropdown.Item hidden to="/dashboard/app/user-profile">Profile</Dropdown.Item>
                                <Dropdown.Item hidden to="/dashboard/app/user-privacy-setting">Privacy Setting</Dropdown.Item>
                                <hr className="dropdown-divider" />
                                <Dropdown.Item onClick={()=>logOut()}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </ul>
                </div>
            </Container>
        </Navbar>
    )
})

Headerpro.displayName = "Headerpro"
export default Headerpro
