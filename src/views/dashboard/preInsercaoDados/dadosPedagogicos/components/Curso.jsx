import React, { memo, Fragment, useState, useContext,useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

// React-bootstrap
import { Row, Col, Button, Container } from "react-bootstrap";
import { api } from "../../../../../server/server";

//Components
import Card from "../../../../../components/bootstrap/card";
import CursoModal from "./../modais/curso/CursoModal";
import { GlobalContext, add, edit, remove } from "../../../../../context/GlobalContext";
import { confirmOperation } from "../../../../../context/AuthContext";

const Curso = memo(() => {
  const [show, setShow] = useState(false);
  const { curso,deleteCurso,setCurso } = useContext(GlobalContext);
  const [filterText, setFilterText] = useState("")

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };




  

 async function handleDeleteCurso(id){
      const ok = confirmOperation('Deseja eliminar este curso?')

      if(ok){
        deleteCurso(id)
      }
  }

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredItems = curso.filter(
    (item) =>
      item.nomeCurso.toLowerCase().includes(filterText.toLowerCase()) ||
      item.created_at.toLowerCase().includes(filterText.toLowerCase())
  );

  

  const columns = [
    {
      name: "Nome",
      selector: "nomeCurso",
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
            to={`/admin/curso/edit:${row.id}`}
            className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"
            role="button"
          >
            <span className="btn-inner">{edit}</span>
          </Link>
          <Button onClick={() => handleDeleteCurso(row.id)} className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"  role="button">
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
      <CursoModal handleClose={handleClose} handleShow={handleShow} show={show} />
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
                  + Curso
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
                      paginationTotalRows={curso.length}
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

Curso.displayName = "Curso";
export default Curso;
