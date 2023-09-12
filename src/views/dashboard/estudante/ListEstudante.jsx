import { memo, Fragment, useEffect, useContext } from 'react'
import {useState} from "react"

//react-bootstrap
import { Row, Col, Image, Container,Button } from 'react-bootstrap'
import { api } from '../../../server/server'

//router
import { Link } from 'react-router-dom'

//components
import Card from '../../../components/bootstrap/card'

import DataTable from "react-data-table-component"

// img
import shap1 from '/src/assets/images/shapes/01.png'
import shap2 from '/src/assets/images/shapes/02.png'
import shap3 from '/src/assets/images/shapes/03.png'
import { GlobalContext, edit, operationHasBenSucceded, remove } from '../../../context/GlobalContext'
import { confirmOperation } from '../../../context/AuthContext'
import { error } from 'jquery'



const userlist = [
   {
      img: `${shap1}`,
      name: 'Anna Sthesia',
      phone: '(760) 756 7568',
      email: 'annasthesia@gmail.com',
      country: 'USA',
      status: 'Active',
      joindate: '2019/12/01',
      color: 'bg-primary'
   },
   {
      img: `${shap2}`,
      name: 'Brock Lee',
      phone: '+62 5689 458 658',
      email: 'brocklee@gmail.com',
      country: 'Indonesia',
      status: 'Active',
      joindate: '2019/12/01',
      color: 'bg-primary'
   },
   {
      img: `${shap3}`,
      name: 'Dan Druff',
      phone: '+55 6523 456 856',
      email: 'dandruff@gmail.com',
      country: 'Brazil',
      status: 'Pending',
      joindate: '2019/12/01',
      color: 'bg-warning'
   }
]


const ListEstudante = memo(() => {
  const {encarregado,setEncarregado}=useContext(GlobalContext)
   const [filterText, setFilterText] = useState("")
   const [show, setShow] =useState(false);

   function handleClose(){
    setShow(false);
   }


   useEffect(()=>{
      async function listAll(){
        await api.get("Admin/listaEncarregado")
         .then((response)=>{
            setEncarregado(response.data.listaEncarregados)
         }).catch((error)=>console.log(error))
      }

      listAll()
   },[])





async function handleDeleteUser(id){
   const ok = await confirmOperation("Eliminar este usuário?")
   
   if(ok){
      operationHasBenSucceded("Usuario eliminada")
   }
}
   

const handleFilterChange = (event) => {
   setFilterText(event.target.value);
 };
 
 const filteredItems = encarregado.filter(
   (item) =>
     item.full_name.toLowerCase().includes(filterText.toLowerCase()) ||
     item.email.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
 );
 
 
 
 const columns = [
   {
     name: "Nome",
     selector: "full_name",
     sortable: true,
   },
   {
      name:"email",
      selector:"email"
   },
   {
      name:"telefone",
      selector:"NumerodoTelefone",

   }
   ,
   {
      name:"telefone alternativo",
      selector:"TelefoneAlternativo",

   },
   {
     name: "Data de nascimento",
    selector:"dataofbirth",
     sortable: true,
   },
   {
    name: "Idade",
   selector:"idade",
    sortable: true,
  },
   {
     name: "Ação",
     cell: (row) => (
       <div className="d-flex"> 

        <Link
           to={`/admin/estudate/perfil/:${row.id}`}
           className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"
           role="button"
         >
           <span className="btn-inner">+</span>
         </Link>       
         <Link
           to={`/admin/disciplina/edit:${row.id}`}
           className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"
           role="button"
         >
           <span className="btn-inner">{edit}</span>
         </Link>

        
         <Button onClick={() =>handleDeleteUser(row.id)} className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"  role="button">
           <span className="btn-inner">{remove}</span>
         </Button>
       </div>
     ),
   },
 ];
 
 const paginationOptions = {
   rowsPerPageText: 'Linhas por página:',
   rangeSeparatorText: 'de',
   selectAllRowsItem: true,
   selectAllRowsItemText: 'Todos',
 };
   return (
      <Fragment>
    
       <Container>
        <Row>
          <Col lg="12">
            <Card>
              <Card.Body>
             
                <div className="custom-table-effect table-responsive border rounded mt-3">
                  <Row>
                      <Col lg="10">
                      <input
                        className="form-control col-3 mt-3 mx-3"
                          type="text"
                          placeholder="Filtrar por nome ou data"
                          value={filterText}
                          onChange={handleFilterChange}
                        />
                      </Col>
                      <Col>
                        <button onClick={()=>setShow(true)} className='mt-3 btn btn-primary '> + Encarregado</button>
                      </Col>
                  </Row>
              
                    <DataTable
                      columns={columns}
                      data={filteredItems}
                      pagination
                      paginationComponentOptions={paginationOptions}
                      striped
                      highlightOnHover
                      pointerOnHover
                      noHeader
                      paginationPerPage={10}
                      paginationRowsPerPageOptions={[10, 20, 30]}
                      paginationServer={false}
                      paginationTotalRows={userlist.length}
                    />
                
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      </Fragment>
   )

}
)

ListEstudante.displayName = "ListEstudante"
export default ListEstudante;