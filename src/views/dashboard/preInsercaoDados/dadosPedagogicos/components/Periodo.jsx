import { memo, Fragment, useState,useContext} from "react";

// React-bootstrap
import { Row, Col, Image, Button, Table, Container } from "react-bootstrap";

//Components
import Card from "../../../../../components/bootstrap/card";
import { GlobalContext, edit, remove } from "../../../../../context/GlobalContext";
import PeriodoModal from "../modais/periodo/PeriodoModal";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { confirmOperation } from "../../../../../context/AuthContext";


const Periodo = memo(() => {
  const [show, setShow] = useState(false);
  const {periodo,deletePeriodo}=useContext(GlobalContext)
  const [filterText, setFilterText] = useState("")

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };


async function handleDeletePeriodo(id){

  const ok = await confirmOperation("Deseja eliminar esta informação?")
  if(ok){
    deletePeriodo(id)
  }
}
 

const handleFilterChange = (event) => {
  setFilterText(event.target.value);
};

const filteredItems = periodo.filter(
  (item) =>
    item.nomePeriodo.toLowerCase().includes(filterText.toLowerCase())
    
);



const columns = [
  {
    name: "Nome",
    selector: "nomePeriodo",
    sortable: true,
  },
  {
    name: "Data de criação",
    selector: "created_at",
    sortable: true,
  },
  {
    name: "Ação",
    cell: (row) => (
      <div className="d-flex">        
        <Link
          to={`/admin/periodo/edit:${row.id}`}
          className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"
          role="button"
        >
          <span className="btn-inner">{edit}</span>
        </Link>
        <Button onClick={() =>handleDeletePeriodo(row.id)} className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"  role="button">
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
      
      <PeriodoModal
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
                  + Periodo
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
                      paginationTotalRows={periodo.length}
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

Periodo.displayName = "Periodo";
export default Periodo;
