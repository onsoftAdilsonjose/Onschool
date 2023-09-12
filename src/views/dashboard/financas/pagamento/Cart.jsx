import React, { Fragment, useContext, useState, useEffect } from "react";
import { Card, Col, Form, Row, Button,Table } from "react-bootstrap";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import Recibo from "./Recibo";
import { AuthContext, notifyError } from "../../../../context/AuthContext";
import { add, edit, remove } from "../../../../context/GlobalContext";
import FormPagamento from "./FormPagamento";

const Cart = () => {
  const {
    cartItemsMonths,
    cartItemsServices,
    increaseServiceQuantity,
    decreaseServiceQuantity,
    removeServiceFromCart,
    removeLastMonthFromCart,
    handleDescontoChangeService,
    handleDescontoChangeMonth
  } = useContext(AuthContext);

const [descontoMes,setDescontoMes]=useState()
const [descontoServico,setDescontoServico]=useState()






const [descontoMesMap, setDescontoMesMap] = useState({});
const [descontoServicoMap, setDescontoServicoMap] = useState({});

const handleDescontoMes = (id, value) => {
  setDescontoMesMap((prevDescontoMesMap) => ({
    ...prevDescontoMesMap,
    [id]: value
  }));
};

const handleDescontoServico = (id, value) => {
  setDescontoServicoMap((prevDescontoServicoMap) => ({
    ...prevDescontoServicoMap,
    [id]: value
  }));
};


 
 





  const isDisable =
    cartItemsMonths.length === 0 || cartItemsMonths.length === 0 ? true : false;

  const verifyIndexMonth = (id) => {
    return cartItemsMonths.findIndex((index) => index.mesID === id);
  };

  return (
    <Fragment className="hide-on-print">
      <div className="hide-on-print">
        <Card>
          <div className="cartDiv custom-table-effect table-responsive border rounded mt-3 mb-3">
            <Table className="mb-0" id="datatable" data-toggle="data-table">
              <thead>
                <tr className="bg-white">
                  <th scope="col">Descrição</th>
                  <th scope="col" className="text-center">
                    Qtd
                  </th>
                  <th scope="col">Preço</th>
                  <th scope="col">Multa</th>
                  <th scope="col">
                    Desconto
                  </th>
                  <th scope="col">Total</th>
                  <th scope="col">Acção</th>
                </tr>
              </thead>
              <tbody>
                {cartItemsMonths
                  ? cartItemsMonths?.map((meses,index) => (
                      <tr key={meses.mesID}>
                        <td>{meses?.mesNome}</td>
                        <td className="d-flex gap-2">
                          <button
                            disabled
                            className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"
                            role="button"
                          >
                            <span className="btn-inner">+</span>
                          </button>
                          <span>{1}</span>
                          <button
                            disabled
                            className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"
                            role="button"
                          >
                            <span className="btn-inner">-</span>
                          </button>
                        </td>
                        <td>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "kzs",
                          }).format(Number(meses?.pagamentoMensal))}
                        </td>
                        <td>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "kzs",
                          }).format(Number(meses?.multa))}
                        </td>

                       
                        <td>
                          <div className="d-flex justify-content-evenly">
                            <input
                              placeholder="%"
                              value={descontoMesMap[meses.mesID] || ''}
                              onChange={(e) => handleDescontoMes(meses.mesID, e.target.value)}
                              className="form-control btn-icon btn-md"
                              type="text"
                            />
                            <button
                              onClick={() => handleDescontoChangeMonth(meses.mesID, Number(descontoMesMap[meses.mesID] || 0))}
                              className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"
                              role="button"
                            >
                              <span className="btn-inner">{edit}</span>
                            </button>
                          </div>
                        </td>


                        <td>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "kzs",
                          }).format(Number(meses?.valorTotal))}
                        </td>
                        <td>
                          <button
                            onClick={() => removeLastMonthFromCart(meses.mesID)}
                            disabled={
                              verifyIndexMonth(meses.mesID) <
                              cartItemsMonths.length - 1
                                ? true
                                : false
                            }
                            className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"
                            role="button"
                          >
                            <span className="btn-inner">{remove}</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  : ""}

                {cartItemsServices
                  ? cartItemsServices.map((servicos,index) => (
                      <tr key={servicos?.id}>
                        <td>{servicos?.ServicoNome}</td>
                        <td className="d-flex gap-2">
                          <button
                            onClick={() =>
                              increaseServiceQuantity(Number(servicos.id))
                            }
                            className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"
                            role="button"
                          >
                            <span className="btn-inner">+</span>
                          </button>
                          {servicos.qtd}
                          <button
                            onClick={() =>
                              decreaseServiceQuantity(Number(servicos.id))
                            }
                            className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"
                            role="button"
                          >
                            <span className="btn-inner">-</span>
                          </button>
                        </td>

                        <td>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "kzs",
                          }).format(Number(servicos?.Preco))}
                        </td>
                        <td>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "kzs",
                          }).format(Number(0))}
                        </td>




                        <td>
            <div className="d-flex justify-content-evenly">
              <input
                placeholder="%"
                value={descontoServicoMap[servicos.id] || ''}
                onChange={(e) => handleDescontoServico(servicos.id, e.target.value)}
                className="form-control btn-icon btn-md"
                type="text"
              />
              <button
                onClick={() => handleDescontoChangeService(servicos.id, Number(descontoServicoMap[servicos.id] || 0))}
                className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"
                role="button"
              >
                <span className="btn-inner">{edit}</span>
              </button>
            </div>
          </td>

                        <td>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "kzs",
                          }).format(Number(servicos?.precoAPagar))}
                        </td>
                        <td>
                          <button
                            onClick={() => removeServiceFromCart(servicos?.id)}
                            className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"
                            role="button"
                          >
                            <span className="btn-inner">{remove}</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </Table>
          </div>
          {/**FIM DO CARRINHO */}
          <FormPagamento />
        </Card>
      </div>
    </Fragment>
  );
};

export default Cart;
