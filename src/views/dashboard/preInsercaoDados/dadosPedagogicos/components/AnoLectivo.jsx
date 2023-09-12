import { memo, Fragment, useState,useContext} from "react";

// React-bootstrap
import { Row, Col,Button,Container} from "react-bootstrap";
import DataTable from "react-data-table-component"

//Components
import Card from "../../../../../components/bootstrap/card";

import { GlobalContext, edit, remove } from "../../../../../context/GlobalContext";
import AnoLetivoModal from "../modais/anoLetivoModal";

import { Link } from "react-router-dom";
import { confirmOperation } from "../../../../../context/AuthContext";

const AnoLectivo = memo(() => {
  const {anoLectivo,deleteAnoLectivo}=useContext(GlobalContext)

  const [filterText, setFilterText] = useState("");
  const [show, setShow] = useState(false);


  //Mostra modal
  function handleShow(){
    setShow(true);
    
  };


 //Fecha a modal
  const handleClose = () => {
    setShow(false);
  };

  //Edicao do ano lectivo

  async function handleDeleteAnoLectivo(id){
    const ok = await confirmOperation("Deseja eliminar este ano lectivo?")
      if(ok){
        deleteAnoLectivo(id)
      }
   
}


  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredItems = anoLectivo.filter((item) =>item?.ano_lectivo.toLowerCase().includes(filterText.toLowerCase()));

  const paginationOptions = {
    rowsPerPageText: 'Linhas por página:',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };



  const columns = [
    {
      name: "Nome",
      selector: "ano_lectivo",
      sortable: true,
    },
    {
      name: "Data de inicio",
      selector: "inicio",
      sortable: true,
    },
    {
      name: "Data do termino",
      selector: "fim",
      sortable: true,
    },
    {
      name: "Ação",
      cell: (row) => (
        <div className="d-flex">
         
          <Link
            to={`/admin/anoLectivo/edit:${row.id}`}
            className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"
            role="button"
          >
            <span className="btn-inner">{edit}</span>
          </Link>
          <Button
            className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"
            to="#"
            role="button"
            onClick={() => handleDeleteAnoLectivo(row.id)}
          >
            <span className="btn-inner">{remove}</span>
          </Button>
        </div>
      ),
      sortable: false,
    },
  ];


 
  return (
    <Fragment>
      
      <AnoLetivoModal
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
                  + Ano lectivo
                </Button>

                <div className="d-flex mb-3">
                      <input
                        className="form-control col-3 mt-3 mx-3"
                          type="text"
                          placeholder="Filtrar por nome ou data"
                          value={filterText}
                          onChange={handleFilterChange}
                        />
                </div>
                <div className="custom-table-effect table-responsive border rounded mt-3">

                <DataTable
                    columns={columns}
                    data={filteredItems} // Use filtered data for rendering
                    pagination
                    paginationComponentOptions={paginationOptions}
                    striped
                    highlightOnHover
                    pointerOnHover
                    noHeader
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[10, 20, 30]}
                    paginationServer={false}
                    paginationTotalRows={anoLectivo.length}
               
                    subHeaderAlign="left"
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

AnoLectivo.displayName = "AnoLectivo";
export default AnoLectivo;
