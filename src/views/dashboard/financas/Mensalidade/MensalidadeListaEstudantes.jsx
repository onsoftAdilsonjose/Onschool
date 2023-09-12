import { memo, Fragment, useContext, useState, useEffect } from 'react'
import { AuthContext, notifyError } from '../../../../context/AuthContext';
import {useNavigate} from "react-router-dom"
import Select from 'react-select';
import {useForm} from "react-hook-form"



import makeAnimated from 'react-select/animated';


// React-bootstrap
import { Form } from 'react-bootstrap'

//Components
import Card from '../../../../components/bootstrap/card'

//Img




function SequentiallyEnabledSelect({ options, onSelect }) {
  const [enabledIndex, setEnabledIndex] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null);

  

  const handleChange = (selectedOption) => {
    setSelectedValue(selectedOption);
    onSelect(selectedOption);

    if (enabledIndex < options?.length - 1) {
      setEnabledIndex(enabledIndex + 1);
    }
  };

  const enabledOptions = options?.slice(0, enabledIndex + 1);

  return (
    <Select
      onChange={handleChange}
      value={selectedValue}
      isSearchable
      isMulti
      isClearable
      options={enabledOptions}
    />
  );
}


const MensalidadeListaEstudantes = memo(() => {
  const {register}=useForm()
  
    const navigate = useNavigate();
    const {estudanteDetalhes,addMonthsToCart,cartItemsMonths,atualizarTela,setAtualizarTela} = useContext(AuthContext)
    const [month,setMonth] = useState()
    const [pagarApartir,setPagarPartir]=useState()
    const [pagamentoMensal,setPagamentoMensal]=useState(0)
    const[saldo,setSaldo]=useState(0)
    const [multa,setMulta]=useState(0)
    const [divida,setDivida]=useState(0)
    const [meses,setMeses]=useState(null)
    const[destalhes,setDetalhes]=useState([])
    const [esuqecerMulta,setEsquecerMulta]=useState(false)

   


    useEffect(()=>{
      setPagarPartir(estudanteDetalhes?.PagarApartir.mesNome)
      setPagamentoMensal(estudanteDetalhes?.PagamentoMensal)
      setDetalhes(estudanteDetalhes?estudanteDetalhes:[])
      setSaldo(estudanteDetalhes?.EstudanteSaldo?.saldo_amount)
      setMulta(estudanteDetalhes?.ValorDaMulta)
      setDivida(estudanteDetalhes?.Divida)
      setMeses( estudanteDetalhes?.MescomDivida?.map((mes) => ({
        value: mes.mesID,
        label: mes.mesNome,
      })))
      
    },[estudanteDetalhes])
  
    

    useEffect(()=>{
      if(atualizarTela){
        setPagarPartir("")
        setDetalhes([])
        setPagamentoMensal(0)
        setSaldo(0)
        setMulta(0)
        setDivida(0)
        setMonth([])
         setMeses([])
        setAtualizarTela(false)
      }
    },[atualizarTela])

 
    const handleAddMonthToCart =()=>{ 
  
      if(month.length===0){
        notifyError("Adicione pelo meno um mês a pagar")
      }else{  
 
         addMonthsToCart(month,esuqecerMulta); 
         // meses([])
        
          
        
        
      }
      
    
    }

  
 
    

    return (
      <Fragment>
        <Card>
          <Card.Header>
              <h4>Pagar mensalidade</h4>
          </Card.Header>
          <Card.Body>
            <div className="row mt-3">

              <Form.Group className="form-group mb-3" lg="3">
                <Form.Label htmlFor='mesInicial'>Pagar apartir de </Form.Label>
                <Form.Control id="mesInicial" disabled value={pagarApartir} />
              </Form.Group>

              <Form.Group className='form-group mb-3'>
                <Form.Label htmlFor='mesesAPagar'>Até</Form.Label>
                {destalhes.length===0? 
                  <Select
                    isLoading
                  />
                :(
                  /* <SequentiallyEnabledSelect options={meses} onSelect={setMonth} /> */ 
                  <Select 
                  {...register('mesesAPagar')}
                  options={meses} 
                  isSearchable 
                  isClearable 
                  onChange={setMonth}
                  value={month}/>
                  
                  )}
                         
              </Form.Group>

            <Form.Group className="mt-5 mb-5 form-group col-md-4 center d-flex" lg="4">
                <Form.Check className="form-check">
                  <Form.Check.Input value={esuqecerMulta} onChange={e=>setEsquecerMulta(e.target.checked)} disabled={estudanteDetalhes?false:true} type="checkbox" id="customEsquecerDivida" />
                  <Form.Check.Label htmlFor="customEsquecerDivida" >
                    Esquecer multa
                  </Form.Check.Label>
                </Form.Check>                
              </Form.Group>

              <Form.Group className="form-group" lg="3">
                <Form.Label>Pagamento mensal</Form.Label>
                <Form.Control disabled value={new Intl.NumberFormat("pt-BR", { style: "currency", currency: "kzs" }).format(Number(pagamentoMensal?pagamentoMensal:0))} />
              </Form.Group>

                <Form.Group className="form-group" lg="3">
                <Form.Label>Divida</Form.Label>
                <Form.Control disabled value={new Intl.NumberFormat("pt-BR", { style: "currency", currency: "kzs" }).format(Number(divida?divida:0))} />
              </Form.Group>

              <Form.Group className="form-group" lg="3">
                <Form.Label>Multa</Form.Label>
                <Form.Control disabled value={new Intl.NumberFormat("pt-BR", { style: "currency", currency: "kzs" }).format(Number(multa?multa:0))} />
              </Form.Group>

            </div>
          </Card.Body>

          <Card.Footer>
            <button 
               disabled={estudanteDetalhes?false:true}
               onClick={handleAddMonthToCart}
               className='btn btn-primary col-md-12' type='button'>
              Adicionar</button>
          </Card.Footer>
        </Card>
      </Fragment>
    );
}
)

MensalidadeListaEstudantes.displayName = "MensalidadeListaEstudantes"
export default MensalidadeListaEstudantes