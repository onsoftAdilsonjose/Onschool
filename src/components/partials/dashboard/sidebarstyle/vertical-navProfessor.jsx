import { useState, useContext, memo, Fragment } from 'react'

//Router
import { Link, useLocation } from 'react-router-dom'

//React-bootstrap
import { Accordion, useAccordionButton, AccordionContext, Nav, Tooltip, OverlayTrigger } from 'react-bootstrap'

//Componets
// import Modalpopup from '../../../../views/modules/auth/components/modal-popup'


function CustomToggle({ children, eventKey, onClick }) {

    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(eventKey, (active) => onClick({ state: !active, eventKey: eventKey }));

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <Link to="#" aria-expanded={isCurrentEventKey ? 'true' : 'false'} className="nav-link" role="button" onClick={(e) => {
            decoratedOnClick(isCurrentEventKey)
        }}>
            {children}
        </Link>
    );
}

const VerticalNavProfessor = memo(() => {
    const [activeMenu, setActiveMenu] = useState(false)
    const [active, setActive] = useState('')

    //location
    let location = useLocation();


    return (
        <Fragment>
            <Accordion as="ul" className="navbar-nav iq-main-menu" id="sidebar-menu">
                <li className="nav-item static-item">
                    <Link className="nav-link static-item disabled text-start" to="#" tabIndex="-1">
                        <span className="default-icon">Home</span>
                        <span className="mini-icon" data-bs-toggle="tooltip" title="Home" data-bs-placement="right">-</span>
                    </Link>
                </li>
                <li className={`${location.pathname === '/admin/dashboard' ? 'active' : ''} nav-item `}>
                    <Link className={`${location.pathname === '/admin/dashboard' ? 'active' : ''} nav-link `} aria-current="page" to="/admin/dashboard">
                        <OverlayTrigger placement="right" overlay={<Tooltip>Professor</Tooltip>}>
                            <i className="icon">
                                <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z" fill="currentColor"></path>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z" fill="currentColor"></path>
                                </svg>
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Dashboard</span>
                    </Link>
                </li>
             
              
                <li><hr className="hr-horizontal" /></li>
                <Nav.Item as="li" className="static-item">
                    <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
                        <span className="default-icon">Pré-inserção de dados</span>
                        <span className="mini-icon">-</span>
                    </Link>
                </Nav.Item>

                <Accordion.Item as="li" eventKey="horizontal-menu" bsPrefix={`nav-item ${active === 'menustyle' ? 'active' : ''} `} onClick={() => setActive('menustyle')} >
                    <CustomToggle eventKey="horizontal-menu" onClick={(activeKey) => setActiveMenu(activeKey)}>
                        <OverlayTrigger placement="right" overlay={<Tooltip>Informações gerais</Tooltip>}>
                            <i className="icon">
                                <svg width="20" className="icon-20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M13.6663 6.99992C13.6663 10.6826 10.6817 13.6666 6.99967 13.6666C3.31767 13.6666 0.333008 10.6826 0.333008 6.99992C0.333008 3.31859 3.31767 0.333252 6.99967 0.333252C10.6817 0.333252 13.6663 3.31859 13.6663 6.99992Z" fill="currentColor" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.01351 6.20239C3.57284 6.20239 3.21484 6.56039 3.21484 6.99973C3.21484 7.43973 3.57284 7.79839 4.01351 7.79839C4.45418 7.79839 4.81218 7.43973 4.81218 6.99973C4.81218 6.56039 4.45418 6.20239 4.01351 6.20239ZM6.99958 6.20239C6.55891 6.20239 6.20091 6.56039 6.20091 6.99973C6.20091 7.43973 6.55891 7.79839 6.99958 7.79839C7.44024 7.79839 7.79824 7.43973 7.79824 6.99973C7.79824 6.56039 7.44024 6.20239 6.99958 6.20239ZM9.18718 6.99973C9.18718 6.56039 9.54518 6.20239 9.98584 6.20239C10.4265 6.20239 10.7845 6.56039 10.7845 6.99973C10.7845 7.43973 10.4265 7.79839 9.98584 7.79839C9.54518 7.79839 9.18718 7.43973 9.18718 6.99973Z" fill="currentColor" />
                                </svg>
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Informações gerais</span>
                        <i className="right-icon">
                            <svg className="icon-18" xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="horizontal-menu" >
                        <ul className="sub-nav">
                            {/**Assinaturas */}
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/admin/assinaturas' ? 'active' : ''} nav-link`} to="/admin/assinaturas">
                                    <i className="icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Assinaturas</Tooltip>}>
                                        <i className="sidenav-mini-icon" > Assinaturas </i>
                                    </OverlayTrigger>
                                    <span className="item-name"> Assinaturas</span>
                                </Link>
                            </Nav.Item>

                            {/**Cabecalhos */}
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/admin/Cabecalho' ? 'active' : ''} nav-link`} to="/admin/Cabecalho">
                                    <i className="icon svg-icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Cabeçalhos</Tooltip>}>
                                        <i className="sidenav-mini-icon"> Cabeçalhos </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Cabeçalhos</span>
                                </Link>
                            </Nav.Item>
                             {/** Fim Cabecalhos */}

                               {/** Info. escola*/}
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/admin/informacaoEscola' ? 'active' : ''} nav-link`} to="informacaoEscola">
                                    <i className="icon svg-icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Informação da escola</Tooltip>}>
                                        <i className="sidenav-mini-icon"> Informação da escola </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Informação da escola</span>
                                </Link>
                            </Nav.Item>
                          
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>

                {/**Dados pedagogicos */}

                <Accordion.Item as="li" eventKey="dadospedagogicos" bsPrefix={`nav-item ${active === 'dadospedagogicos' ? 'active' : ''} `} onClick={() => setActive('dadospedagogicos')} >
                    <CustomToggle eventKey="dadospedagogicos" onClick={(activeKey) => setActiveMenu(activeKey)}>
                        <OverlayTrigger placement="right" overlay={<Tooltip>Dados pedagogicos</Tooltip>}>
                            <i className="icon">
                                <svg width="20" className="icon-20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M13.6663 6.99992C13.6663 10.6826 10.6817 13.6666 6.99967 13.6666C3.31767 13.6666 0.333008 10.6826 0.333008 6.99992C0.333008 3.31859 3.31767 0.333252 6.99967 0.333252C10.6817 0.333252 13.6663 3.31859 13.6663 6.99992Z" fill="currentColor" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.01351 6.20239C3.57284 6.20239 3.21484 6.56039 3.21484 6.99973C3.21484 7.43973 3.57284 7.79839 4.01351 7.79839C4.45418 7.79839 4.81218 7.43973 4.81218 6.99973C4.81218 6.56039 4.45418 6.20239 4.01351 6.20239ZM6.99958 6.20239C6.55891 6.20239 6.20091 6.56039 6.20091 6.99973C6.20091 7.43973 6.55891 7.79839 6.99958 7.79839C7.44024 7.79839 7.79824 7.43973 7.79824 6.99973C7.79824 6.56039 7.44024 6.20239 6.99958 6.20239ZM9.18718 6.99973C9.18718 6.56039 9.54518 6.20239 9.98584 6.20239C10.4265 6.20239 10.7845 6.56039 10.7845 6.99973C10.7845 7.43973 10.4265 7.79839 9.98584 7.79839C9.54518 7.79839 9.18718 7.43973 9.18718 6.99973Z" fill="currentColor" />
                                </svg>
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Dados pedagogicos</span>
                        <i className="right-icon">
                            <svg className="icon-18" xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="dadospedagogicos" >
                        <ul className="sub-nav">
                            {/**Ano lectivo */}
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/admin/anoLetivo' ? 'active' : ''} nav-link`} to="/admin/anoLetivo">
                                    <i className="icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Ano lectivo</Tooltip>}>
                                        <i className="sidenav-mini-icon" > Ano lectivo </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Ano lectivo</span>
                                </Link>
                            </Nav.Item>

                               {/**Curso*/}
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/admin/curso' ? 'active' : ''} nav-link`} to="/admin/curso">
                                    <i className="icon svg-icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Cursos</Tooltip>}>
                                        <i className="sidenav-mini-icon"> Cursos </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Cursos</span>
                                </Link>
                            </Nav.Item>

                            {/**Classes */}
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/admin/classe' ? 'active' : ''} nav-link`} to="/admin/classe">
                                    <i className="icon svg-icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Classes</Tooltip>}>
                                        <i className="sidenav-mini-icon">Classes</i>
                                    </OverlayTrigger>
                                    <span className="item-name">Classes</span>
                                </Link>
                            </Nav.Item>
                             {/** Classes */}

                             {/**Disciplinas */}
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/admin/disciplina' ? 'active' : ''} nav-link`} to="/admin/disciplina">
                                    <i className="icon svg-icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Disciplinas</Tooltip>}>
                                        <i className="sidenav-mini-icon">Disciplinas</i>
                                    </OverlayTrigger>
                                    <span className="item-name">Disciplinas</span>
                                </Link>
                            </Nav.Item>

                            {/**Disciplinas para classes */}
                            {/**Disciplinas */}
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/admin/disciplinaClasse' ? 'active' : ''} nav-link`} to="/admin/disciplinaClasse">
                                    <i className="icon svg-icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Disciplinas para classes</Tooltip>}>
                                        <i className="sidenav-mini-icon">DC</i>
                                    </OverlayTrigger>
                                    <span className="item-name">Disciplinas para classes</span>
                                </Link>
                            </Nav.Item>

                             {/**turma */}
                             <Nav.Item as="li">
                                <Link className={`${location.pathname === '/admin/turma' ? 'active' : ''} nav-link`} to="/admin/turma">
                                    <i className="icon svg-icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Turma</Tooltip>}>
                                        <i className="sidenav-mini-icon">T</i>
                                    </OverlayTrigger>
                                    <span className="item-name">Turma</span>
                                </Link>
                            </Nav.Item>

                            {/**Formar turma */}
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/admin/formarTurma' ? 'active' : ''} nav-link`} to="/admin/formarTurma">
                                    <i className="icon svg-icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Formar turma</Tooltip>}>
                                        <i className="sidenav-mini-icon">FT</i>
                                    </OverlayTrigger>
                                    <span className="item-name">Formar turma</span>
                                </Link>
                            </Nav.Item>

                             {/**Horario */}
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/admin/horario' ? 'active' : ''} nav-link`} to="/admin/horario">
                                    <i className="icon svg-icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Horário</Tooltip>}>
                                        <i className="sidenav-mini-icon">H</i>
                                    </OverlayTrigger>
                                    <span className="item-name">Horário</span>
                                </Link>
                            </Nav.Item>

                              {/**Período */}
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/admin/periodo' ? 'active' : ''} nav-link`} to="/admin/periodo">
                                    <i className="icon svg-icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Período</Tooltip>}>
                                        <i className="sidenav-mini-icon">Período</i>
                                    </OverlayTrigger>
                                    <span className="item-name">Período</span>
                                </Link>
                            </Nav.Item>

                               {/**Professor */}
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/admin/professor' ? 'active' : ''} nav-link`} to="/admin/professor">
                                    <i className="icon svg-icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Professor</Tooltip>}>
                                        <i className="sidenav-mini-icon">Professor</i>
                                    </OverlayTrigger>
                                    <span className="item-name">Professor</span>
                                </Link>
                            </Nav.Item>

                          
                            {/**Tipo de disciplina */}
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/admin/tipoDisciplina' ? 'active' : ''} nav-link`} to="/admin/tipoDisciplina">
                                    <i className="icon svg-icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Tipo de disciplina</Tooltip>}>
                                        <i className="sidenav-mini-icon">Tipo de disciplina</i>
                                    </OverlayTrigger>
                                    <span className="item-name">Tipo de disciplina</span>
                                </Link>
                            </Nav.Item>

                            {/**Sala*/}
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/admin/sala' ? 'active' : ''} nav-link`} to="/admin/sala">
                                    <i className="icon svg-icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Sala</Tooltip>}>
                                        <i className="sidenav-mini-icon">Sala</i>
                                    </OverlayTrigger>
                                    <span className="item-name">Sala</span>
                                </Link>
                            </Nav.Item>
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>


                {/**Dados financeiros */}


                <Accordion.Item as="li" eventKey="dadosfinanceiros" bsPrefix={`nav-item ${active === 'dadosfinanceiros' ? 'active' : ''} `} onClick={() => setActive('dadosfinanceiros')} >
                    <CustomToggle eventKey="dadosfinanceiros" onClick={(activeKey) => setActiveMenu(activeKey)}>
                        <OverlayTrigger placement="right" overlay={<Tooltip>Dados financeiros</Tooltip>}>
                            <i className="icon">
                                <svg width="20" className="icon-20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M13.6663 6.99992C13.6663 10.6826 10.6817 13.6666 6.99967 13.6666C3.31767 13.6666 0.333008 10.6826 0.333008 6.99992C0.333008 3.31859 3.31767 0.333252 6.99967 0.333252C10.6817 0.333252 13.6663 3.31859 13.6663 6.99992Z" fill="currentColor" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.01351 6.20239C3.57284 6.20239 3.21484 6.56039 3.21484 6.99973C3.21484 7.43973 3.57284 7.79839 4.01351 7.79839C4.45418 7.79839 4.81218 7.43973 4.81218 6.99973C4.81218 6.56039 4.45418 6.20239 4.01351 6.20239ZM6.99958 6.20239C6.55891 6.20239 6.20091 6.56039 6.20091 6.99973C6.20091 7.43973 6.55891 7.79839 6.99958 7.79839C7.44024 7.79839 7.79824 7.43973 7.79824 6.99973C7.79824 6.56039 7.44024 6.20239 6.99958 6.20239ZM9.18718 6.99973C9.18718 6.56039 9.54518 6.20239 9.98584 6.20239C10.4265 6.20239 10.7845 6.56039 10.7845 6.99973C10.7845 7.43973 10.4265 7.79839 9.98584 7.79839C9.54518 7.79839 9.18718 7.43973 9.18718 6.99973Z" fill="currentColor" />
                                </svg>
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Dados financeiros</span>
                        <i className="right-icon">
                            <svg className="icon-18" xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="dadosfinanceiros" >
                        <ul className="sub-nav">
                        
                            {/**INF. GERAIS DE PAGAMENTO*/}
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/admin/infoGeraisPagamento' ? 'active' : ''} nav-link`} to="/admin/infoGeraisPagamento">
                                    <i className="icon svg-icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>INF. Gerais de Pagamento</Tooltip>}>
                                        <i className="sidenav-mini-icon">INF. Gerais de Pagamento</i>
                                    </OverlayTrigger>
                                    <span className="item-name">INF. Gerais de Pag</span>
                                </Link>
                            </Nav.Item>
                            

                             {/**Matricula e confirmacao */}
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/admin/MatriculaConfirmacaoPreco' ? 'active' : ''} nav-link`} to="/admin/MatriculaConfirmacaoPreco">
                                    <i className="icon svg-icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Matricula e Confirmacao</Tooltip>}>
                                        <i className="sidenav-mini-icon">Matricula e Confirmacao</i>
                                    </OverlayTrigger>
                                    <span className="item-name">Matri. e Confirm.</span>
                                </Link>
                            </Nav.Item>

                            {/**Mensalidade */}
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/admin/mensalidadePreco' ? 'active' : ''} nav-link`} to="/admin/mensalidadePreco">
                                    <i className="icon svg-icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Mensalidade</Tooltip>}>
                                        <i className="sidenav-mini-icon">Mensalidade</i>
                                    </OverlayTrigger>
                                    <span className="item-name">Mensalidade</span>
                                </Link>
                            </Nav.Item>

                             {/**transporte*/}
                             <Nav.Item as="li">
                                <Link className={`${location.pathname === '/admin/transporte' ? 'active' : ''} nav-link`} to="/admin/transporte">
                                    <i className="icon svg-icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Transporte</Tooltip>}>
                                        <i className="sidenav-mini-icon">T</i>
                                    </OverlayTrigger>
                                    <span className="item-name">Transporte</span>
                                </Link>
                            </Nav.Item>


                            {/**Serviços*/}
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/admin/servico' ? 'active' : ''} nav-link`} to="/admin/servico">
                                    <i className="icon svg-icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Serviços</Tooltip>}>
                                        <i className="sidenav-mini-icon">T</i>
                                    </OverlayTrigger>
                                    <span className="item-name">Serviços</span>
                                </Link>
                            </Nav.Item>

                                 {/**Insencao de mensalidade*/}
                                 <Nav.Item as="li">
                                <Link className={`${location.pathname === '/admin/insencaoDeMensalidade' ? 'active' : ''} nav-link`} to="/admin/insencaoDeMensalidade">
                                    <i className="icon svg-icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Insencao de mensalidade</Tooltip>}>
                                        <i className="sidenav-mini-icon">T</i>
                                    </OverlayTrigger>
                                    <span className="item-name">Insencao de mens.</span>
                                </Link>
                            </Nav.Item>
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>
                {/**FIM PRE-INSERCAO DE DADOS */}

                <Accordion.Item as="li" eventKey="sidebar-user" bsPrefix={`nav-item ${active === 'user' ? 'active' : ''} `} onClick={() => setActive('user')} >
                    <CustomToggle eventKey="sidebar-user" onClick={(activeKey) => setActiveMenu(activeKey)}>
                        <OverlayTrigger placement="right" overlay={<Tooltip>Users</Tooltip>}>
                            <i className="icon">
                                <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.9488 14.54C8.49884 14.54 5.58789 15.1038 5.58789 17.2795C5.58789 19.4562 8.51765 20.0001 11.9488 20.0001C15.3988 20.0001 18.3098 19.4364 18.3098 17.2606C18.3098 15.084 15.38 14.54 11.9488 14.54Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M11.949 12.467C14.2851 12.467 16.1583 10.5831 16.1583 8.23351C16.1583 5.88306 14.2851 4 11.949 4C9.61293 4 7.73975 5.88306 7.73975 8.23351C7.73975 10.5831 9.61293 12.467 11.949 12.467Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M21.0881 9.21923C21.6925 6.84176 19.9205 4.70654 17.664 4.70654C17.4187 4.70654 17.1841 4.73356 16.9549 4.77949C16.9244 4.78669 16.8904 4.802 16.8725 4.82902C16.8519 4.86324 16.8671 4.90917 16.8895 4.93889C17.5673 5.89528 17.9568 7.0597 17.9568 8.30967C17.9568 9.50741 17.5996 10.6241 16.9728 11.5508C16.9083 11.6462 16.9656 11.775 17.0793 11.7948C17.2369 11.8227 17.3981 11.8371 17.5629 11.8416C19.2059 11.8849 20.6807 10.8213 21.0881 9.21923Z" fill="currentColor"></path>
                                    <path d="M22.8094 14.817C22.5086 14.1722 21.7824 13.73 20.6783 13.513C20.1572 13.3851 18.747 13.205 17.4352 13.2293C17.4155 13.232 17.4048 13.2455 17.403 13.2545C17.4003 13.2671 17.4057 13.2887 17.4316 13.3022C18.0378 13.6039 20.3811 14.916 20.0865 17.6834C20.074 17.8032 20.1698 17.9068 20.2888 17.8888C20.8655 17.8059 22.3492 17.4853 22.8094 16.4866C23.0637 15.9589 23.0637 15.3456 22.8094 14.817Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M7.04459 4.77973C6.81626 4.7329 6.58077 4.70679 6.33543 4.70679C4.07901 4.70679 2.30701 6.84201 2.9123 9.21947C3.31882 10.8216 4.79355 11.8851 6.43661 11.8419C6.60136 11.8374 6.76343 11.8221 6.92013 11.7951C7.03384 11.7753 7.09115 11.6465 7.02668 11.551C6.3999 10.6234 6.04263 9.50765 6.04263 8.30991C6.04263 7.05904 6.43303 5.89462 7.11085 4.93913C7.13234 4.90941 7.14845 4.86348 7.12696 4.82926C7.10906 4.80135 7.07593 4.78694 7.04459 4.77973Z" fill="currentColor"></path>
                                    <path d="M3.32156 13.5127C2.21752 13.7297 1.49225 14.1719 1.19139 14.8167C0.936203 15.3453 0.936203 15.9586 1.19139 16.4872C1.65163 17.4851 3.13531 17.8066 3.71195 17.8885C3.83104 17.9065 3.92595 17.8038 3.91342 17.6832C3.61883 14.9167 5.9621 13.6046 6.56918 13.3029C6.59425 13.2885 6.59962 13.2677 6.59694 13.2542C6.59515 13.2452 6.5853 13.2317 6.5656 13.2299C5.25294 13.2047 3.84358 13.3848 3.32156 13.5127Z" fill="currentColor"></path>
                                </svg>
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Usuários</span>
                        <i className="right-icon">
                            <svg className="icon-18" xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="sidebar-user">
                        <ul className="sub-nav">
                            {/** 
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/admin/app/user-profile' ? 'active' : ''} nav-link`} to="/admin/app/user-profile">
                                    <i className="icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>User Profile</Tooltip>}>
                                        <i className="sidenav-mini-icon"> U  </i>
                                    </OverlayTrigger>
                                    <span className="item-name">User Profile</span>
                                </Link>
                            </Nav.Item>
                            */}
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/admin/app/user-add' ? 'active' : ''} nav-link`} to="/admin/app/user-add">
                                    <i className="icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Add User</Tooltip>}>
                                        <i className="sidenav-mini-icon"> A  </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Adicionar usuario</span>
                                </Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/admin/app/user-list' ? 'active' : ''} nav-link`} to="/admin/app/user-list">
                                    <i className="icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Listar usuários</Tooltip>}>
                                        <i className="sidenav-mini-icon"> U  </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Listar usuários</span>
                                </Link>
                            </Nav.Item>
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>

                {/**Secretaria */}
                <li><hr className="hr-horizontal" /></li>
                <Nav.Item as="li" className="static-item">
                    <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
                        <span className="default-icon">Secretária</span>
                        <span className="mini-icon">-</span>
                    </Link>
                </Nav.Item>
                <Accordion.Item as="li" eventKey="sidebar-special" bsPrefix={`nav-item ${active === 'special' ? 'active' : ''} `} onClick={() => setActive('special')} >
                    <CustomToggle eventKey="sidebar-special" onClick={(activeKey) => setActiveMenu(activeKey)}>
                        <OverlayTrigger placement="right" overlay={<Tooltip>Inscrição de alunos</Tooltip>}>
                            <i className="icon">
                                <svg width="20" className="icon-20" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M6.85044 12.5583C5.32841 11.6182 3.91355 10.5097 2.63172 9.25306C1.7268 8.35584 1.0357 7.26031 0.611238 6.05018C-0.147183 3.69015 0.735667 0.992986 3.20054 0.192264C4.50154 -0.216313 5.9165 0.034503 7.00449 0.866556C8.09289 0.0354335 9.50738 -0.215301 10.8085 0.192264C13.2733 0.992986 14.1621 3.69015 13.4037 6.05018C12.9827 7.25917 12.2957 8.3546 11.395 9.25306C10.1121 10.5083 8.69734 11.6167 7.17632 12.5583L7.01042 12.6667L6.85044 12.5583Z" fill="currentColor" />
                                    <path d="M7.00694 12.6666L6.85033 12.5583C5.32643 11.6183 3.90959 10.5098 2.62569 9.25304C1.71648 8.35707 1.02126 7.26144 0.593354 6.05016C-0.159142 3.69013 0.723708 0.992966 3.18858 0.192245C4.48958 -0.216332 5.9232 0.0346753 7.00694 0.873695V12.6666Z" fill="currentColor" />
                                    <path d="M11.153 4.66615C11.0191 4.65753 10.8943 4.5906 10.8081 4.48104C10.7218 4.37149 10.6815 4.22893 10.6966 4.08677C10.7111 3.61854 10.4447 3.19234 10.0338 3.02651C9.7733 2.95539 9.61553 2.67324 9.6807 2.39499C9.74255 2.12121 9.99891 1.95098 10.2566 2.0126C10.2891 2.018 10.3204 2.02979 10.3489 2.04737C11.1727 2.36439 11.7061 3.2176 11.6637 4.1505C11.6623 4.2919 11.6072 4.42665 11.5109 4.52387C11.4146 4.62109 11.2854 4.67244 11.153 4.66615Z" fill="currentColor" />
                                </svg>
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Inscrição de alunos</span>
                        <i className="right-icon">
                            <svg className="icon-18 submit" xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="sidebar-special" >
                        <ul className="sub-nav">
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/admin/addEstudante' ? 'active' : ''} nav-link`} to="/admin/addEstudante">
                                    <i className="icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Registar aluno</Tooltip>}>
                                        <i className="sidenav-mini-icon"> Registar aluno </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Registar aluno</span>

                                </Link>
                            </Nav.Item>

                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/admin/matricula' ? 'active' : ''} nav-link`} to="/admin/matricula">
                                    <i className="icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Matricula</Tooltip>}>
                                        <i className="sidenav-mini-icon"> M </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Matrícula</span>
                                </Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/admin/Confirmacao' ? 'active' : ''} nav-link`} to="/admin/Confirmacao">
                                    <i className="icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Confirmação</Tooltip>}>
                                        <i className="sidenav-mini-icon"> C </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Confirmação</span>
                                </Link>
                            </Nav.Item>
                          
                           
                    
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>
                <Accordion.Item as="li" eventKey="sidebar-auth" bsPrefix={`nav-item ${active === 'auth' ? 'active' : ''} `} onClick={() => setActive('user')} >
                    <CustomToggle eventKey="sidebar-auth" onClick={(activeKey) => setActiveMenu(activeKey)}>
                        <OverlayTrigger placement="right" overlay={<Tooltip>área administrativa</Tooltip>}>
                            <i className="icon">
                                <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M12.0865 22C11.9627 22 11.8388 21.9716 11.7271 21.9137L8.12599 20.0496C7.10415 19.5201 6.30481 18.9259 5.68063 18.2336C4.31449 16.7195 3.5544 14.776 3.54232 12.7599L3.50004 6.12426C3.495 5.35842 3.98931 4.67103 4.72826 4.41215L11.3405 2.10679C11.7331 1.96656 12.1711 1.9646 12.5707 2.09992L19.2081 4.32684C19.9511 4.57493 20.4535 5.25742 20.4575 6.02228L20.4998 12.6628C20.5129 14.676 19.779 16.6274 18.434 18.1581C17.8168 18.8602 17.0245 19.4632 16.0128 20.0025L12.4439 21.9088C12.3331 21.9686 12.2103 21.999 12.0865 22Z" fill="currentColor"></path>
                                    <path d="M11.3194 14.3209C11.1261 14.3219 10.9328 14.2523 10.7838 14.1091L8.86695 12.2656C8.57097 11.9793 8.56795 11.5145 8.86091 11.2262C9.15387 10.9369 9.63207 10.934 9.92906 11.2193L11.3083 12.5451L14.6758 9.22479C14.9698 8.93552 15.448 8.93258 15.744 9.21793C16.041 9.50426 16.044 9.97004 15.751 10.2574L11.8519 14.1022C11.7049 14.2474 11.5127 14.3199 11.3194 14.3209Z" fill="currentColor"></path>
                                </svg>
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Area administrativa</span>
                        <i className="right-icon">
                            <svg className="icon-18" xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="sidebar-auth">
                        <ul className="sub-nav">
                            
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/auth/sign-in' ? 'active' : ''} nav-link`} to="/auth/sign-in">
                                    <i className="icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Login</Tooltip>}>
                                        <i className="sidenav-mini-icon"> L  </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Gestão de documentos</span>
                                </Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/auth/sign-up' ? 'active' : ''} nav-link`} to="/auth/sign-up">
                                    <i className="icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Register</Tooltip>}>
                                        <i className="sidenav-mini-icon"> R  </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Recurso humanos</span>
                                </Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/auth/confirm-mail' ? 'active' : ''} nav-link`} to="/auth/confirm-mail">
                                    <i className="icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Confirm Mail</Tooltip>}>
                                        <i className="sidenav-mini-icon"> CM  </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Permissões</span>
                                </Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/auth/lock-screen' ? 'active' : ''} nav-link`} to="/auth/lock-screen">
                                    <i className="icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Lock Screen</Tooltip>}>
                                        <i className="sidenav-mini-icon"> LS  </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Lock Screen</span>
                                </Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/auth/recoverpw' ? 'active' : ''} nav-link`} to="/auth/recoverpw">
                                    <i className="icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Recover password</Tooltip>}>
                                        <i className="sidenav-mini-icon"> RP  </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Recover password</span>
                                </Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/auth/two-factor' ? 'active' : ''} nav-link`} to="/auth/two-factor">
                                    <i className="icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Two Factor</Tooltip>}>
                                        <i className="sidenav-mini-icon"> TF  </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Two Factor</span>
                                </Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/auth/account-deactivate' ? 'active' : ''} nav-link`} to="/auth/account-deactivate">
                                    <i className="icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Account Deactive</Tooltip>}>
                                        <i className="sidenav-mini-icon"> AD  </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Account Deactive</span>
                                </Link>
                            </Nav.Item>
                        </ul>
                    </Accordion.Collapse>
                 </Accordion.Item>
                <Accordion.Item as="li" eventKey="areaPedagogica" bsPrefix={`nav-item ${active === 'areaPedagogica' ? 'active' : ''} `} onClick={() => setActive('areaPedagogica')} >
                    <CustomToggle eventKey="areaPedagogica" onClick={(activeKey) => setActiveMenu(activeKey)}>
                        <OverlayTrigger placement="right" overlay={<Tooltip>Área pedagógica</Tooltip>}>
                            <i className="icon">
                                <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.9488 14.54C8.49884 14.54 5.58789 15.1038 5.58789 17.2795C5.58789 19.4562 8.51765 20.0001 11.9488 20.0001C15.3988 20.0001 18.3098 19.4364 18.3098 17.2606C18.3098 15.084 15.38 14.54 11.9488 14.54Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M11.949 12.467C14.2851 12.467 16.1583 10.5831 16.1583 8.23351C16.1583 5.88306 14.2851 4 11.949 4C9.61293 4 7.73975 5.88306 7.73975 8.23351C7.73975 10.5831 9.61293 12.467 11.949 12.467Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M21.0881 9.21923C21.6925 6.84176 19.9205 4.70654 17.664 4.70654C17.4187 4.70654 17.1841 4.73356 16.9549 4.77949C16.9244 4.78669 16.8904 4.802 16.8725 4.82902C16.8519 4.86324 16.8671 4.90917 16.8895 4.93889C17.5673 5.89528 17.9568 7.0597 17.9568 8.30967C17.9568 9.50741 17.5996 10.6241 16.9728 11.5508C16.9083 11.6462 16.9656 11.775 17.0793 11.7948C17.2369 11.8227 17.3981 11.8371 17.5629 11.8416C19.2059 11.8849 20.6807 10.8213 21.0881 9.21923Z" fill="currentColor"></path>
                                    <path d="M22.8094 14.817C22.5086 14.1722 21.7824 13.73 20.6783 13.513C20.1572 13.3851 18.747 13.205 17.4352 13.2293C17.4155 13.232 17.4048 13.2455 17.403 13.2545C17.4003 13.2671 17.4057 13.2887 17.4316 13.3022C18.0378 13.6039 20.3811 14.916 20.0865 17.6834C20.074 17.8032 20.1698 17.9068 20.2888 17.8888C20.8655 17.8059 22.3492 17.4853 22.8094 16.4866C23.0637 15.9589 23.0637 15.3456 22.8094 14.817Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M7.04459 4.77973C6.81626 4.7329 6.58077 4.70679 6.33543 4.70679C4.07901 4.70679 2.30701 6.84201 2.9123 9.21947C3.31882 10.8216 4.79355 11.8851 6.43661 11.8419C6.60136 11.8374 6.76343 11.8221 6.92013 11.7951C7.03384 11.7753 7.09115 11.6465 7.02668 11.551C6.3999 10.6234 6.04263 9.50765 6.04263 8.30991C6.04263 7.05904 6.43303 5.89462 7.11085 4.93913C7.13234 4.90941 7.14845 4.86348 7.12696 4.82926C7.10906 4.80135 7.07593 4.78694 7.04459 4.77973Z" fill="currentColor"></path>
                                    <path d="M3.32156 13.5127C2.21752 13.7297 1.49225 14.1719 1.19139 14.8167C0.936203 15.3453 0.936203 15.9586 1.19139 16.4872C1.65163 17.4851 3.13531 17.8066 3.71195 17.8885C3.83104 17.9065 3.92595 17.8038 3.91342 17.6832C3.61883 14.9167 5.9621 13.6046 6.56918 13.3029C6.59425 13.2885 6.59962 13.2677 6.59694 13.2542C6.59515 13.2452 6.5853 13.2317 6.5656 13.2299C5.25294 13.2047 3.84358 13.3848 3.32156 13.5127Z" fill="currentColor"></path>
                                </svg>
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Área pedagógica</span>
                        <i className="right-icon">
                            <svg className="icon-18" xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="areaPedagogica">
                        <ul className="sub-nav">
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === 'admin//app/user-profile' ? 'active' : ''} nav-link`} to="admin/app/user-profile">
                                    <i className="icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>User Profile</Tooltip>}>
                                        <i className="sidenav-mini-icon"> U  </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Notas</span>
                                </Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/app/user-add' ? 'active' : ''} nav-link`} to="/app/user-add">
                                    <i className="icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Add User</Tooltip>}>
                                        <i className="sidenav-mini-icon"> A  </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Pautas</span>
                                </Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/app/user-list' ? 'active' : ''} nav-link`} to="/app/user-list">
                                    <i className="icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>User List</Tooltip>}>
                                        <i className="sidenav-mini-icon"> U  </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Estado do aluno</span>
                                </Link>
                            </Nav.Item>

                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/app/user-list' ? 'active' : ''} nav-link`} to="/app/user-list">
                                    <i className="icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>User List</Tooltip>}>
                                        <i className="sidenav-mini-icon"> U  </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Documentos do aluno</span>
                                </Link>
                            </Nav.Item>

                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/app/user-list' ? 'active' : ''} nav-link`} to="/app/user-list">
                                    <i className="icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Horários</Tooltip>}>
                                        <i className="sidenav-mini-icon"> U  </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Horários</span>
                                </Link>
                            </Nav.Item>
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>

             

               
           
                <li><hr className="hr-horizontal" /></li>
                <li className="nav-item static-item">
                    <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
                        <span className="default-icon">Finanças</span>
                        <span className="mini-icon">-</span>
                    </Link>
                </li>
                <Accordion.Item as="li" eventKey="sidebar-ui" bsPrefix="nav-item">
                    <CustomToggle eventKey="sidebar-ui" onClick={(activeKey) => setActiveMenu(activeKey)}>
                        <OverlayTrigger placement="right" overlay={<Tooltip>Área financeira</Tooltip>}>
                            <i className="icon">
                                <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M13.7505 9.70303V7.68318C13.354 7.68318 13.0251 7.36377 13.0251 6.97859V4.57356C13.0251 4.2532 12.764 4.00049 12.4352 4.00049H5.7911C3.70213 4.00049 2 5.653 2 7.68318V10.1155C2 10.3043 2.07737 10.4828 2.21277 10.6143C2.34816 10.7449 2.53191 10.8201 2.72534 10.8201C3.46035 10.8201 4.02128 11.3274 4.02128 11.9944C4.02128 12.6905 3.45068 13.2448 2.73501 13.2533C2.33849 13.2533 2 13.5257 2 13.9203V16.3262C2 18.3555 3.70213 19.9995 5.78143 19.9995H12.4352C12.764 19.9995 13.0251 19.745 13.0251 19.4265V17.3963C13.0251 17.0027 13.354 16.6917 13.7505 16.6917V14.8701C13.354 14.8701 13.0251 14.5497 13.0251 14.1655V10.4076C13.0251 10.0224 13.354 9.70303 13.7505 9.70303Z" fill="currentColor"></path>
                                    <path d="M19.9787 11.9948C19.9787 12.69 20.559 13.2443 21.265 13.2537C21.6615 13.2537 22 13.5262 22 13.9113V16.3258C22 18.3559 20.3075 20 18.2186 20H15.0658C14.7466 20 14.4758 19.7454 14.4758 19.426V17.3967C14.4758 17.0022 14.1567 16.6921 13.7505 16.6921V14.8705C14.1567 14.8705 14.4758 14.5502 14.4758 14.1659V10.4081C14.4758 10.022 14.1567 9.70348 13.7505 9.70348V7.6827C14.1567 7.6827 14.4758 7.36328 14.4758 6.9781V4.57401C14.4758 4.25366 14.7466 4 15.0658 4H18.2186C20.3075 4 22 5.64406 22 7.6733V10.0407C22 10.2286 21.9226 10.4081 21.7872 10.5387C21.6518 10.6702 21.4681 10.7453 21.2747 10.7453C20.559 10.7453 19.9787 11.31 19.9787 11.9948Z" fill="currentColor"></path>
                                </svg>
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Área financeira</span>
                        <i className="right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="sidebar-ui">
                        <ul className="sub-nav">
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/ui-elements/avatars' ? 'active' : ''} nav-link`} to="/ui-elements/avatars">
                                    <i className="icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Matrículas</Tooltip>}>
                                        <i className="sidenav-mini-icon"> Matrículas </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Matrículas</span>
                                </Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/ui-elements/alerts' ? 'active' : ''} nav-link`} to="/ui-elements/alerts">
                                    <i className="icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Confirmação de marícula</Tooltip>}>
                                        <i className="sidenav-mini-icon"> Marícula </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Confirmação</span>
                                </Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/ui-elements/badges' ? 'active' : ''} nav-link`} to="/ui-elements/badges">
                                    <i className="icon">
                                        <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Pagamento de mensalidades</Tooltip>}>
                                        <i className="sidenav-mini-icon"> Pagamento de mensalidades </i>
                                    </OverlayTrigger>
                                    <span className="item-name">Mensalidades</span>
                                </Link>
                            </Nav.Item>
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>
           
                <Accordion.Item as="li" eventKey="sidebar-form" bsPrefix={`nav-item ${active === 'form' ? 'active' : ''} `} onClick={() => setActive('form')} >
                    <CustomToggle eventKey="sidebar-form" active={activeMenu === 'sidebar-form' ? true : false} onClick={(activeKey) => setActiveMenu(activeKey)}>
                        <OverlayTrigger placement="right" overlay={<Tooltip>Form</Tooltip>}>
                            <i className="icon">
                                <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M16.191 2H7.81C4.77 2 3 3.78 3 6.83V17.16C3 20.26 4.77 22 7.81 22H16.191C19.28 22 21 20.26 21 17.16V6.83C21 3.78 19.28 2 16.191 2Z" fill="currentColor"></path>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.07996 6.6499V6.6599C7.64896 6.6599 7.29996 7.0099 7.29996 7.4399C7.29996 7.8699 7.64896 8.2199 8.07996 8.2199H11.069C11.5 8.2199 11.85 7.8699 11.85 7.4289C11.85 6.9999 11.5 6.6499 11.069 6.6499H8.07996ZM15.92 12.7399H8.07996C7.64896 12.7399 7.29996 12.3899 7.29996 11.9599C7.29996 11.5299 7.64896 11.1789 8.07996 11.1789H15.92C16.35 11.1789 16.7 11.5299 16.7 11.9599C16.7 12.3899 16.35 12.7399 15.92 12.7399ZM15.92 17.3099H8.07996C7.77996 17.3499 7.48996 17.1999 7.32996 16.9499C7.16996 16.6899 7.16996 16.3599 7.32996 16.1099C7.48996 15.8499 7.77996 15.7099 8.07996 15.7399H15.92C16.319 15.7799 16.62 16.1199 16.62 16.5299C16.62 16.9289 16.319 17.2699 15.92 17.3099Z" fill="currentColor"></path>
                                </svg>
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Estatística</span>
                      
                    </CustomToggle>
                
                </Accordion.Item>
         
                <Accordion.Item as="li" eventKey="sidebar-icons" bsPrefix={`nav-item mb-5 ${active === 'icons' ? 'active' : ''} `} onClick={() => setActive('icons')} >
                    <CustomToggle eventKey="sidebar-icons" onClick={(activeKey) => setActiveMenu(activeKey)}>
                        <OverlayTrigger placement="right" overlay={<Tooltip>Icons</Tooltip>}>
                            <i className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 10.5378C8 9.43327 8.89543 8.53784 10 8.53784H11.3333C12.4379 8.53784 13.3333 9.43327 13.3333 10.5378V19.8285C13.3333 20.9331 14.2288 21.8285 15.3333 21.8285H16C16 21.8285 12.7624 23.323 10.6667 22.9361C10.1372 22.8384 9.52234 22.5913 9.01654 22.3553C8.37357 22.0553 8 21.3927 8 20.6832V10.5378Z" fill="currentColor" />
                                    <rect opacity="0.4" x="8" y="1" width="5" height="5" rx="2.5" fill="currentColor" />
                                </svg>
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Configurações</span>
                     
                    </CustomToggle>
             
                </Accordion.Item>
            </Accordion>
        </Fragment>
    )
})

VerticalNavProfessor.displayName = "VerticalNavProfessor"
export default VerticalNavProfessor
