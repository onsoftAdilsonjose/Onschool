import { memo, lazy } from 'react'


//router
import { Routes, Route } from 'react-router-dom'

//layoutpages
import Default from '../layouts/dashboard/default'

import Simple from '../layouts/dashboard/simple'

import AccountDeactive from '../views/dashboard/auth/account-deactivate'

import TwoFactor from '../views/dashboard/auth/two-factor'


// auth
const ConfirmMail = lazy(() => import('../views/dashboard/auth/confirm-mail'))

const LockScreen = lazy(() => import('../views/dashboard/auth/lock-screen'))

const Recoverpw = lazy(() => import('../views/dashboard/auth/recoverpw'))

const SignIn = lazy(() => import('../views/dashboard/auth/sign-in'))

const SignUp = lazy(() => import('../views/dashboard/auth/sign-up'))


const TeacherProfile = lazy(() => import('../views/dashboard/app/TeacherProfile'))

const UserProfile = lazy(() => import('../views/dashboard/app/user-profile'))

const UserAdd = lazy(() => import('../views/dashboard/app/user-add'))

const UserList = lazy(() => import('../views/dashboard/app/user-list'))

const ProfessorParaClasseDisciplina = lazy(()=>import("./../views/dashboard/preInsercaoDados/dadosPedagogicos/components/ProfessorParaClasseDisciplina "))


import InformacaoEscola from '../views/dashboard/preInsercaoDados/informacoesGerais/InformacaoEscola'

import Assianatura from '../views/dashboard/preInsercaoDados/informacoesGerais/Assinatura'

import AddEstudante from '../views/dashboard/estudante/AddEstudante'

import Matricula from '../views/dashboard/matricula/Matricula'

import ListEstudante from '../views/dashboard/estudante/ListEstudante'

const EstudanteProfile = lazy(()=>import("./../views/dashboard/estudante/EstudanteProfile"))

import Confirmacao from '../views/dashboard/matricula/Confirmacao'

import AnoLectivo from '../views/dashboard/preInsercaoDados/dadosPedagogicos/components/AnoLectivo'

import Curso from '../views/dashboard/preInsercaoDados/dadosPedagogicos/components/Curso'

import Classe from '../views/dashboard/preInsercaoDados/dadosPedagogicos/components/Classe'

import Disciplina from '../views/dashboard/preInsercaoDados/dadosPedagogicos/components/Disciplina'

import Turma from '../views/dashboard/preInsercaoDados/dadosPedagogicos/components/Turma'

import FormarTurma from '../views/dashboard/preInsercaoDados/dadosPedagogicos/components/FormarTurma'

import DisciplinaParaClasse from '../views/dashboard/preInsercaoDados/dadosPedagogicos/components/DisciplinaParaClasse'

import Periodo from '../views/dashboard/preInsercaoDados/dadosPedagogicos/components/Periodo'

import Professor from '../views/dashboard/preInsercaoDados/dadosPedagogicos/components/Professor'

import TipoDisciplina from '../views/dashboard/preInsercaoDados/dadosPedagogicos/components/TipoDisciplina'

import Sala from '../views/dashboard/preInsercaoDados/dadosPedagogicos/components/Sala'

import InformacoesGeraisDePagamento from '../views/dashboard/preInsercaoDados/dadosFinanceiros/components/InformacoesGeraisDePagamento'

import MatriculaConfirmacaoPreco from '../views/dashboard/preInsercaoDados/dadosFinanceiros/components/MatriculaConfirmacaoPreco'

import MensalidadePreco from '../views/dashboard/preInsercaoDados/dadosFinanceiros/components/MensalidaPreco'

import Transporte from '../views/dashboard/preInsercaoDados/dadosFinanceiros/components/Transporte'

import Servicos from '../views/dashboard/preInsercaoDados/dadosFinanceiros/components/Servicos'

import InsecaoDeMensalidade from '../views/dashboard/preInsercaoDados/dadosFinanceiros/components/InsencaoDeMensalidade'

import MensalidadeListaEstudantes from '../views/dashboard/financas/Mensalidade/MensalidadeListaEstudantes'

import NotaPorDisciplinasCursoTurmaClasse from '../views/dashboard/notas/NotaPorDisciplinasCursoTurmaClasse'

import Notas from '../views/dashboard/notas/Notas'

const Pauta = lazy(()=>import("../views/dashboard/notas/Pauta"))

const Encarregado = lazy(()=>import('./../views/dashboard/encarregado/ListEncarregado'))

const Pagamento = lazy(() => import( '../views/dashboard/financas/pagamento/Pagamento')) 

const Funcionario = lazy(()=>import("./../views/dashboard/funcionario/Funcionario"))

const HistoricoDePagamento =lazy(()=>import("../views/dashboard/financas/pagamento/historicoDePagamento"))

import { PrivateRoute } from './PrivateRoutes'

import AnoLetivoModalEdit from '../views/dashboard/preInsercaoDados/dadosPedagogicos/modais/anoLetivoModalEdit'

import CursoModalEdit from '../views/dashboard/preInsercaoDados/dadosPedagogicos/modais/curso/CursoModalEdit'

import ClasseModalEdit from '../views/dashboard/preInsercaoDados/dadosPedagogicos/modais/classe/ClasseModalEdit'

import DisciplinaModalEdit from '../views/dashboard/preInsercaoDados/dadosPedagogicos/modais/disciplina/DisciplinaModalEdit'

import PeriodoModalEdit from '../views/dashboard/preInsercaoDados/dadosPedagogicos/modais/periodo/PeriodoModalEdit'

import TipoDisciplinaModalEdit from '../views/dashboard/preInsercaoDados/dadosPedagogicos/modais/tipoDiscipplina/TipoDisciplinaModalEdit'

import SalaModalEdit from '../views/dashboard/preInsercaoDados/dadosPedagogicos/modais/sala/SalaModalEdit'

import TurmaModalEdit from '../views/dashboard/preInsercaoDados/dadosPedagogicos/modais/turma/TurmaModalEdit'







//admin
const Admin = lazy(() => import('../views/dashboard/admin/admin'))

const Analytics = lazy(() => import('../views/dashboard/analytics'))

const Cabecalho = lazy(()=>import( '../views/dashboard/preInsercaoDados/informacoesGerais/Cabecalho'))




const IndexRouters = memo(() => {
    return (
        <Routes>
      
                 {/* auth */}

            <Route path="/" element={<Simple />}>
                <Route path="/" element={<SignIn />} /> 
                <Route path="/auth/confirm-mail" element={<ConfirmMail />} />
                <Route path="/auth/lock-screen" element={<LockScreen />} />
                <Route path="/auth/recoverpw" element={<Recoverpw />} />
                
                <Route path="/auth/sign-up" element={<SignUp />} />
                <Route path="/auth/account-deactivate" element={<AccountDeactive/>} />
                <Route path="/auth/two-factor" element={<TwoFactor />} />
            </Route>
            
            <Route path="/admin" element={<PrivateRoute children={<Default />}/>}>

                <Route exact path="/admin/dashboard" element={<Analytics />} />

                 {/* user */}
                 <Route path="/admin/app/user-profile" element={<UserProfile />} />
                    <Route path="/admin/app/user-add" element={<UserAdd />} />
                <Route path="/admin/app/user-list" element={<UserList />} />
                <Route path="/admin/app/user-privacy-setting" element={<userProfileEdit />} />
                <Route path='/admin/app/user-encarregado' element={<Encarregado/>}/>

                <Route path='/admin/informacaoEscola' element={<InformacaoEscola/>}/>
                <Route path='/admin/Cabecalho' element={<Cabecalho/>}/>
                <Route path='/admin/assinaturas' element ={<Assianatura/>}/>




                <Route path='/admin/addEstudante' element={<AddEstudante/>}/>
                <Route path='/admin/matricula' element={<Matricula/>}/>
                <Route path='/admin/estudante/list' element={<ListEstudante/>}/>
                <Route path='/admin/Confirmacao' element={<Confirmacao/>}/>
                <Route path="/admin/estudate/perfil/:id" element={<EstudanteProfile />} />

                <Route path='/admin/anoLetivo' element={<AnoLectivo/>}/>
                <Route path='/admin/anoLectivo/edit:id' element={<AnoLetivoModalEdit/>}/>


                <Route path='/admin/curso' element={<Curso/>}/>
                <Route path='/admin/curso/edit:id' element={<CursoModalEdit/>}/>



                <Route path='/admin/classe' element={<Classe/>} />
                <Route path='/admin/classe/edit:id' element={<ClasseModalEdit/>} />


                
                <Route path='/admin/disciplina' element={<Disciplina/>}/>
                <Route path='/admin/disciplina/edit:id' element={<DisciplinaModalEdit/>}/>


                <Route path='/admin/turma' element={<Turma/>}/>
                <Route path='/admin/turma/edit:id' element={<TurmaModalEdit/>}/>
                
                <Route path='/admin/formarTurma' element={<FormarTurma/>} />


                <Route path='/admin/disciplinaClasse' element={<DisciplinaParaClasse/>}/>
             

                <Route path='/admin/professorClasse' element={<ProfessorParaClasseDisciplina/>}/>

                <Route path='/admin/periodo' element={<Periodo/>} />
                <Route path='/admin/periodo/edit:id' element={<PeriodoModalEdit/>} />

                <Route  path='/admin/professor/list' element={<Professor/>}/>

                <Route path='/admin/tipoDisciplina' element={<TipoDisciplina/>}/>
                <Route path='/admin/tipoDisciplina/edit:id' element={<TipoDisciplinaModalEdit/>}/>


                <Route  path='/admin/sala' element={<Sala/>}/>
                <Route path='/admin/sala/edit:id' element={<SalaModalEdit/>}/>


                <Route path='/admin/infoGeraisPagamento' element={<InformacoesGeraisDePagamento/>}/>

                <Route path='/admin/MatriculaConfirmacaoPreco' element={<MatriculaConfirmacaoPreco/>}/>

                <Route path='/admin/mensalidadePreco' element={<MensalidadePreco/>}/>
              
                <Route path='/admin/transporte' element={<Transporte/>}/>
              
                <Route path='/admin/servico' element={<Servicos/>}/>
              
                <Route path='/admin/insencaoDeMensalidade' element={<InsecaoDeMensalidade/>}/>

                {/**Financas */}

                <Route path='/admin/mensalidade' element={<MensalidadeListaEstudantes/>}/>
                <Route path='/admin/pagamento' element={<Pagamento/>}/>
                <Route path='/admin/pagamento/historico' element={<HistoricoDePagamento/>} />


                {/*admin*/}
                <Route path="/admin/admin" element={<Admin />} />

                {/**Lancamento de notas */}

                {/**Lancamento por classe, turma, disciplinas  */}
                <Route path='/admin/lancamentoPorClasseTurmaDisciplinas' element={<NotaPorDisciplinasCursoTurmaClasse/>}/>

            {/**Notas */}
            <Route  path='/admin/notas' element={<Notas/>}/>
            <Route path='/admin/pautas' element={<Pauta/>}/>

            {/*--------------------- FUNCIONARIO ---------------- */}

            <Route path='/admin/funcionario' element={<Funcionario />}/>

                {/**Visoes */}

                <Route path='/admin/professorProfile/:id' element={<TeacherProfile/>} />
                
            </Route>
        </Routes>
    )
}
)

IndexRouters.displayName = "IndexRouters"
export default IndexRouters
