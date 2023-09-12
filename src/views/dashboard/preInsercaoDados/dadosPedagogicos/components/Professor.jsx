import { memo, Fragment, useState,useContext} from "react";

// React-bootstrap
import { Row, Col, Image, Button, Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

//Components
import Card from "../../../../../components/bootstrap/card";
import { GlobalContext, edit, remove } from "../../../../../context/GlobalContext";

import ProfessorModal from "../modais/ProfessorModal";
import DataTable from "react-data-table-component";



const Professor = memo(() => {
  const [show, setShow] = useState(false);
  const [filterText, setFilterText] = useState("")
  const {professor}=useContext(GlobalContext)

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };


  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  console.log(professor)
  
  const filteredItems = professor.filter(
    (item) =>
      item.full_name.toLowerCase().includes(filterText.toLowerCase()) || 
       item.NumerodoTelefone.toLowerCase().includes(filterText.toLowerCase()) ||
       item.email.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
  );
  
  
  
  const columns = [
    {
      name: "Nome",
      selector:"full_name",
      sortable: true,
    },
    {
      name:"Cargo",
      selector:"usertype"
    },
    {
      name:"Telefone",
      selector:"NumerodoTelefone"
    },
    {
      name:"Telefone alternativo",
      selector:"TelefoneAlternativo"
    },
    
    {
      name:"Email",
      selector:"email"
    }
    ,
  
    {
      name: "Ação",
      cell: (row) => (
        <div className="d-flex">  

        <Link
            to={`/admin/professorProfile/:${row.id}`}
            className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"
            role="button"
          >
            <span className="btn-inner">+</span>
          </Link>    

          <Link
            to={`/admin/professor/edit:${row.id}`}
            className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"
            role="button"
          >
            <span className="btn-inner">{edit}</span>
          </Link>
          <Button onClick={() =>handleDeleteProfessor(row.id)} className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"  role="button">
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
      
      
      <ProfessorModal
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
      />
       <Container>
        <Row>
          <Col lg="12">
            <Card>
              <Card.Body>
                <Button
                  onClick={handleShow}
                  variant="primary"
                  className="btn btn-primary mt-2 me-1 me-1 mb-3"
                >
                  + Professor
                </Button>
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
                      paginationTotalRows={professor.length}
                    />
                
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
});

Professor.displayName = "Professor";
export default Professor;
