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
import { edit, operationHasBenSucceded, remove } from '../../../context/GlobalContext'
import { AuthContext, confirmOperation } from '../../../context/AuthContext'
import { error } from 'jquery'





const UserList = memo(() => {
  const {userlist,setUserList} =useContext(AuthContext)
   const [filterText, setFilterText] = useState("")
   
const[user,setUser] = useState([])

   useEffect(()=>{
      async function listUser(){
       await  api.get("Admin/listarUsuarios")
         .then((response)=>{
          setUserList(response.data.listarUsuarios)         
         
         }).catch((error)=>console.log(error))
      }

      listUser()
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

 /**
  * id: number,
        TelefoneAlternativo: string,
        NumerodoTelefone: null,
        dataofbirth: string,
        banned_until: string,
        email: string,
        usertype:string,
        full_name: string,
        idade: number
  * 
  * 
  * 
  */
 
 const filteredItems = userlist?.filter(
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
    name:"Idade",
    selector:" idade",
   },
   {
    name:"Data de nascimento",
    selector:"dataofbirth"
   },
   {
      name:"telefone",
      selector:"NumerodoTelefone",

   },
   {
     name: "Tipo",
     selector:"usertype"
    
   },
   {
     name: "Ação",
     cell: (row) => (
       <div className="d-flex">        
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
 
 console.log(userlist)
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
                      <Col lg="4">
                      <input
                        className="form-control col-3 mt-3 mx-3"
                          type="text"
                          placeholder="Filtrar por nome ou data"
                          value={filterText}
                          onChange={handleFilterChange}
                        />
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
                      paginationTotalRows={userlist?.length}
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

UserList.displayName = "UserList"
export default UserList;