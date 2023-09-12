import { memo, Fragment, useState,useContext} from "react";

// React-bootstrap
import { Row, Col, Image, Button, Table, Container } from "react-bootstrap";
import DataTable from "react-data-table-component";

//Components
import Card from "../../../../../components/bootstrap/card";
import { GlobalContext,edit, remove,add  } from "../../../../../context/GlobalContext";
import ClasseModal from "../modais/classe/ClasseModal";
import { Link } from "react-router-dom";
import { confirmOperation } from "../../../../../context/AuthContext";



const Classe = memo(() => {
  const [show, setShow] = useState(false);
  const {classes, deleteClasse}=useContext(GlobalContext)
  const [filterText, setFilterText] = useState("")


  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };


async function handleDeleteClasse(id){
    const ok = await confirmOperation("Deseja remover esta classe?")
    if(ok){
      deleteClasse(Number(id))
    }
   
  
} 


const handleFilterChange = (event) => {
  setFilterText(event.target.value);
};

const filteredItems = classes.filter(
  (item) =>
    item.classe_name.toLowerCase().includes(filterText.toLowerCase())
);

const formatClassComExam = (value) => {
  return value === 1 ? "Sim" : "Não";
};


const columns = [
  {
    name: "Nome",
    selector: "classe_name",
    sortable: true,
  },
  {
    name: "Classe de exame",
    selector: "ClassComExam",
    sortable: true,
    cell: (row) => formatClassComExam(row.ClassComExam),
  },
  {
    name: "Ação",
    cell: (row) => (
      <div className="d-flex">        
        <Link
          to={`/admin/classe/edit:${row.id}`}
          className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"
          role="button"
        >
          <span className="btn-inner">{edit}</span>
        </Link>
        <Button onClick={()=>handleDeleteClasse(row.id)} className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"  role="button">
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
      
      <ClasseModal
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
                  + Classe
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
                      paginationTotalRows={classes.length}
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

Classe.displayName = "Classe";
export default Classe;
