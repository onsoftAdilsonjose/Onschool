import { useEffect, memo, Fragment, useContext, Suspense, useState } from 'react'
import { useLocation, Outlet,useParams} from 'react-router-dom'

//react-shepherd
import { ShepherdTour, ShepherdTourContext } from 'react-shepherd'

// header
import Header from '../../components/partials/headerstyle/header'

//subheader
import SubHeader from '../../components/partials/dashboard/headerstyle/sub-header'


//sidebar
import Sidebar from '../../components/partials/dashboard/sidebarstyle/sidebar'

//footer
import Footer from '../../components/partials/dashboard/footerstyle/footer'

//seetingoffCanvas
import SettingOffCanvas from '../../components/setting/SettingOffCanvas'

import Loader from '../../components/Loader'

// Import selectors & action from setting store
import * as SettingSelector from '../../store/setting/selectors'


// Redux Selector / Action
import { useSelector } from 'react-redux';



const Default = memo((props) => {

  let location = useLocation();
  const pageLayout = useSelector(SettingSelector.page_layout)
  const appName = useSelector(SettingSelector.app_name)
  useEffect(() => {
  })

  const closeTour = () => {
    sessionStorage.setItem('tour', 'true')
  }

  // shepherd

  var subHeader = '';
  var commanclass = '';
  location.pathname

  const {id}= useParams()

  const param = Number(id?.replace(":",""))

  switch (location.pathname) {
    case "/admin/infoGeraisPagamento":
    case "/admin/MatriculaConfirmacaoPreco":
    case "/admin/mensalidadePreco":
    case "/admin/transporte":
    case "/admin/servico":
    case "/admin/insencaoDeMensalidade":
    case '/admin/anoLetivo':
    case '/admin/curso':
    case '/admin/classe':
    case '/admin/disciplina':
    case '/admin/disciplinaClasse':
    case '/admin/turma':
    case "/admin/formarTurma":
    case "/admin/periodo":
    case "/admin/professor":
    case "/admin/tipoDisciplina":
    case "/admin/sala":
    case "/admin/addEstudante":
    case '/admin/informacaoEscola':
    case '/admin/assinaturas':
    case '/admin/Cabecalho':
    case "/admin/pagamentoMensalidade":
    case '/admin/app/user-profile':
    case '/admin/app/user-add':
    case '/admin/app/user-list':
    case "/admin/mensalidade":
    case "/admin/Confirmacao":
    case "/admin/professorProfile":
    case '/admin/form/form-element':
    case '/admin/form/form-wizard':
    case '/admin/form/form-validation':
    case "/admin/lancamentoPorClasseTurmaDisciplinas":
    case '/admin/anoLectivo/edit:'+param:
    case "/admin/curso/edit:"+param:
    case "/admin/classe/edit:"+param:
    case "/admin/disciplina/edit:"+param:
  
     
      subHeader = <SubHeader />
      commanclass = 'iq-banner default'
      break;
    default:
      break
  }



  return (
    <Fragment>
  
       
        <Sidebar app_name={appName} />

        <main className="main-content">
          <div className={`${commanclass} position-relative `}>
            <Header />
            {subHeader}
          </div>

          <div className={` ${pageLayout} content-inner pb-0`}>
            <Suspense>
              <Outlet></Outlet>
            </Suspense>
          </div>
          
          <Footer />
        </main>
        <SettingOffCanvas />
 
    </Fragment>
  )
}
)

Default.displayName = "Default"
export default Default
