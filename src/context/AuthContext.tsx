import React from "react";
import { createContext, ReactNode, useState,  useEffect} from "react";
import { useNavigate, useLocation, json } from "react-router-dom";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'

import { setCookie, destroyCookie } from "nookies";


import { api, errorMessage, statusCode } from "../server/server";
import { IMeses, mesesAPagar } from "../models/Meses";
import { IService } from "../models/Servico";
import { Estudante, EstudanteDetalhes } from "../models/Estudante";
import { IMetodoPagamento } from "../models/MetodoPagamento";
import { IContaBancaria } from "../models/ContaBancaria";
import { operationHasBenSucceded, operationHasFailed } from "./GlobalContext";
import { IEscola } from "../models/Escola";
import { IReciboData } from "../models/Recibo";
import { IUserListModel } from "../models/User";
import { IEncarregadoModel } from "../models/Encarregado";


interface IAuthContextProps {
  children: ReactNode;
}

interface IUser {
  //status, name, email, permissions
  id?: number;
  email: string;
  password?: string;
  usertype?: string;
  banned_until?: string;
  primeiro_nome?: string;
  ultimo_nome?: string;
  nomePai?: string;
  nomeMae?: string;
  tatus?: string;
  role?: string;
  pessoa_id?: string;
  dataofbirth?: string;
  reg_Numero?: string;
  BoletimdeNascimento?: string;
  avatar?: string;
  pais?: string;
  municipio_id?: number;
  provincia_id?: number;
  num_cedula?: number;
  bairro?: string;
  n_passaport?: string;
  genero_id?: number;
  num_bilhete?: number;
}

interface IRoles {
  id: number;
  name: string;
  slug: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

interface IAuthContextData {
  showBoletim:boolean,
  setShowBoletim:(param:boolean)=>void;
  setServices:(data:IService[])=>void;
  userList:IUserListModel[]
  setUserList:(users:IUserListModel[])=>void;
  addEncarregado:(param:any)=>void;
  matriculaEstudante:(estudante:any, encarregado?:any)=>Promise<void>
  setEstudante:(estudante:Estudante[])=>void;
  reciboData:IReciboData |undefined
  escola:IEscola | undefined;
  setEscola:(param:IEscola)=>void
  desconto:number
  subTotal:number
  atualizarTela:boolean, 
  setAtualizarTela:(param:boolean)=>void;
  calcSaldo:(valor:number)=>void;
  saldo:number
  totalGeral:number
  handleDescontoChangeMonth:(id: number, valor: number)=>void
  handleDescontoChangeService:(itemID: number, novoDesconto: number)=>void
  removeServiceFromCart:(id:number)=>void;
  removeLastMonthFromCart:(id:number)=>void;
  totalPagamento:number
  services:IService[]
  payMant: () => void;
  addMetodoPagamentoEscolhido: (data: IMetodoPagamento,pagarComSaldo:boolean) => void;
  metodoDePagamentoEscolhido: IMetodoPagamento | undefined;
  metodoPagamento: IMetodoPagamento[];
  contaBancaria: IContaBancaria[];
  estudante: Estudante[];
  signIn: (credentials: IUser) => Promise<void>;
  registerUser: (credentials: IUser) => Promise<void>;
  EditUser: (id: number, data: IUser) => Promise<void>;
  deleteUser: (params: number) => Promise<void>;
  logOut: () => void;
  user: IUser | null;
  isAutenticated: boolean;
  roles: IRoles[];
  showStep: string;
  decreaseServiceQuantity:(id:number)=>void
  increaseServiceQuantity:(id:number)=>void
  setShowStep: (param: string) => void;
  addServicesToCart: (id: number) => void;
  addMonthsToCart: (id: number,esquecerMulta:boolean) => void;
  cartItemsServices: IService[];
  cartItemsMonths: mesesAPagar[];
  estudanteDetalhes: EstudanteDetalhes | undefined;
  listEstudanteDetalhes: (
    classeEstudante: number,
    anoLectivoId: number,
    idEstudante: number
  ) => void;
}

export function notifyError(message: string) {
  toast.warn(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}

export function notifySucess(message: string) {
  toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}

export function seesionExpired(){
  
  Swal.fire({
    icon: 'error',
    title: 'Sessão expirada',
    text: 'Inicie a sessão!',

  }).then((response)=>{
    if(response.isConfirmed){

      api
      .post("/api/logout")
      .then((response) => {
        destroyCookie(null, "token.Onschool");
        //setUser(null);
        localStorage.clear();;
        window.location.href ="/"
      })
      .catch((err) => console.log(err));


    }else{
      api.post("/api/logout").then((response) => {
        destroyCookie(null, "token.Onschool");
         localStorage.clear();
        window.location.href ="/"
      })
      .catch((err) => console.log(err));
    }
  })


}


export async function confirmOperation(text: string): Promise<boolean> {
  const result = await Swal.fire({
    title: 'Confirmar?',
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim'
  });
  return result.isConfirmed; // Retorna true se o usuário confirmou, ou false se cancelou
}






export const AuthContext = createContext({} as IAuthContextData);


export function AuthContextProvider({ children }: IAuthContextProps) {
  const [user, setUser] = useState<IUser | null>(JSON.parse(localStorage.getItem("user") || "null"));
  const [showBoletim,setShowBoletim]=useState(false);
  const [estudante, setEstudante] = useState<Estudante[]>([]);
  const [estudanteDetalhes, setEstudanteDetalhes] = useState<EstudanteDetalhes>(
    JSON.parse(localStorage.getItem("estudanteDetalhes") || "null")
  );

  const [userList, setUserList] = useState<IUserListModel[]>([]);

  const [roles, setRoles] = useState<IRoles[]>([
    { id: 1, name: "Admin", slug: "admin" },
    { id: 2, name: "Professor", slug: "professor" },
    { id: 3, name: "Encarregado", slug: "encarregado" },
    { id: 4, name: "Estudante", slug: "estudante" },
    { id: 4, name: "Funcionario", slug: "funcionario" },
  ]);

  const [monthsToPay, setMonthsToPay] = useState<mesesAPagar[]>([]);
  const [PagamentoMensal, setPagamentoMensal] = useState();

  const [esquecerMulta, setEsquecerMulta] = useState(false);
  const [pagamentoPorSaldo, setPagamentoPorSaldo] = useState(false);
  const [cartItemsMonths, setCartItemsMonths] = useState<mesesAPagar[]>([]);

  const [services, setServices] = useState<IService[]>([]);

  const [cartItemsServices, setCartItemsServices] = useState<IService[]>([]);
  const [metodoPagamento, setMetodoPagamento] = useState<IMetodoPagamento[]>([]);
  const [contaBancaria, setContaBancaria] = useState<IContaBancaria[]>([]);
  const [metodoDePagamentoEscolhido, setMetodoDePagamentoEscolhido] =useState<IMetodoPagamento>();
  const [saldo, setSaldo] = useState<number>(0);

  const [reciboData,setReciboData] =useState<IReciboData>()

  const navigate = useNavigate();
  const isAutenticated = !!user;
  const [showStep, setShowStep] = useState("A");

  const [atualizarTela, setAtualizarTela] = useState(false);
  const [escola,setEscola]=useState<IEscola>();



  useEffect(() => {
    if (localStorage.getItem("user")) {
      if (window.location.pathname === "/") {
        navigate("/admin/dashboard");
      }
    }
  }, []);
  //permissoes de usuario e CRUD USUARIO

  useEffect(()=>{
    
       api.get("Admin/listarUsuarios")
       .then((response)=>{
        //console.log(response.data.listarUsuarios)
        setUserList(response.data.listarUsuarios)
       }).catch((error)=>console.log(error))
  
 },[])

  useEffect(() => {
    async function getPermissions() {
      await api
        .get("Admin/Permission")
        .then((response) => {
          //console.log(response.data);
        })
        .catch((err) => {
          //console.log(err + " erro permissoes");
        });
    }

    getPermissions();
  }, []);

  /*---------------- CRUD SERVICOS ---------------------*/

    useEffect(()=>{

      async function list(){
        await api.get("Admin/Servico")
        .then((response)=>{
          setServices(response.data.Servico)
        })
      }

      list();

    },[])



  /*---------------- FIM CRUD SERVICOS -----------------*/


  /*----------Listagem METODO DE PAGAMENTO e CONTA BANCARIA-----------*/
  useEffect(() => {
    async function getMetodoPagamento() {
      await api.get("/MetodePagamento").then((response) => {
        setMetodoPagamento(response.data.MetodePagamento);
      });
    }

    getMetodoPagamento();
  }, []);

  useEffect(() => {
    async function getContaBancaria() {
      api.get("/ContaBancaria").then((response) => {
        setContaBancaria(response.data.ContaBancaria);
      });
    }

    getContaBancaria();
  }, []);

  //Funcao de login
  async function signIn({ email, password }: IUser) {
    await api
      .post("login", { email, password })
      .then((response) => {
        // console.log(response.data)
        const { id, reg_Numero, ultimo_nome, primeiro_nome, email, usertype } =
          response["data"]["Usuario"];
        const access_token = response.data.token;
        const refresh_token = response.data.refresh_token;

        const user = {
          reg_Numero,
          ultimo_nome,
          primeiro_nome,
          email,
          id,
          usertype,
        };

        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);

        setCookie(undefined, "token.Onschool", access_token, {
          maxAge: 60 * 60 * 24,
          path: "/",
        });

        setCookie(undefined, "refresh_token.Onschool", refresh_token, {
          maxAge: 60 * 60 * 24,
          path: "/",
        });
        api.defaults.headers.common["Authorization"] = `Bear ${access_token}`;

        user.usertype === "Admin" ? navigate("/admin/dashboard") : "/";
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Aviso...",
          text: "Erro ao fazer login, senha ou email invalido",
          footer: "alguma coisa deu errado!",
        });
      });
  }

  //Funcao logout

  function logOut() {
    api
      .post("/api/logout")
      .then((response) => {
        destroyCookie(undefined, "token.Onschool");
        setUser(null);
        destroyCookie(null, "token.Onschool");
        localStorage.clear();
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  //Criar usuario
  async function registerUser(data: IUser) {
    try {
      const userExist = userList.find((user) => user.email == data.email);
      const cookies = parseCookies();

      if (!userExist) {
        const response = await api.post("Admin/Register", data);
        if (statusCode == 422) {
          operationHasFailed(errorMessage);
        } else {
          operationHasBenSucceded("Novo usuário adicinado com sucesso!");
        }
      } else {
        operationHasFailed(
          "Já existe um usuário com este email, email deve ser único!"
        );
      }
    } catch (error) {
      if (statusCode == 422) {
        operationHasFailed(errorMessage);
      }
    }
  }

  //Edicao de usuario
  async function EditUser(id: number, data: IUser) {}

  //Funcao Remover usuario
  async function deleteUser(id: number) {}

  /*--------   LOGICA DE PAGAMENTO, CARRINHO DE SERVICO E MESES -------------*/

  function addMonthsToCart(selectedMonths: any, esquecerMulta: boolean) {
    setEsquecerMulta(esquecerMulta);
    const idFinaly = Number(selectedMonths.value); // Recupera o ID do último mês selecionado
    const idStart = estudanteDetalhes.PagarApartir.mesID; // Recupera o ID do primeiro mês a pagar

    const startIndex = monthsToPay.findIndex((i) => i.mesID === idStart);
    const endIndex = monthsToPay.findIndex((i) => i.mesID === idFinaly);

    const mesesToPayNow = monthsToPay.filter((item) => {
      const mesIndex = monthsToPay.findIndex((i) => i.mesID === item.mesID);
      return mesIndex >= startIndex && mesIndex <= endIndex;
      //item.mesID >= idStart && item.mesID <= idFinaly
    });

    mesesToPayNow.forEach((selectedMonth) => {
      const id = selectedMonth.mesID;

      const index = monthsToPay.findIndex((month) => month.mesID === id);

      if (index > -1) {
        const item: mesesAPagar = { ...monthsToPay[index] }; // Clone o objeto para evitar mutações inesperadas
        const indexInCart = cartItemsMonths.findIndex(
          (i) => i.mesID === item.mesID
        );

        if (indexInCart < 0) {
          const correspondingMulta = estudanteDetalhes.mesesNomeComMulta.find(
            (meses) => meses.mesID === item.mesID
          );

          if (correspondingMulta) {
            //Verifica se foi anulada a multa
            if (esquecerMulta) {
              item.multa = 0;
            } else {
              item.multa = correspondingMulta.MultaporMes;
            }
          } else {
            item.multa = 0;
          }

          item.pagamentoMensal = PagamentoMensal;

          if (item.pagamentoMensal !== undefined) {
            item.valorTotal = Number(item.pagamentoMensal + item.multa);
          }

          setCartItemsMonths((prevCartItemsMonths) => [
            ...prevCartItemsMonths,
            item,
          ]);
          localStorage.setItem(
            "monthsCartItem",
            JSON.stringify([...cartItemsMonths, item])
          );
        }
      }
    });
  }

  async function removeLastMonthFromCart(id: number) {
    if (cartItemsMonths.length > 0) {
      const ok = await confirmOperation("Deseja remover este mês");

      if (ok) {
        const updatedCartItemsMonths = [...cartItemsMonths];
        const index = updatedCartItemsMonths.findIndex(
          (index) => index.mesID === id
        );
        updatedCartItemsMonths.splice(index, 1);
        setCartItemsMonths(updatedCartItemsMonths);
      }
    }
  }

  /*------- CARRINHO DE COMPRA SERVICOS ---*/
  function addServicesToCart(selectedServices: any) {
    selectedServices.forEach((selectedService) => {
      const id = selectedService.value;

      const index = cartItemsServices.findIndex((index) => index.id === id);
      if (index < 0) {
        const item: IService = services.find((service) => service.id === id)!;
        item.qtd = 1;
        item.precoAPagar = item.qtd * item.Preco;
        setCartItemsServices((prevCartItemsServices) => [
          ...prevCartItemsServices,
          item,
        ]);
      } else {
        const updatedCartItemsServices = cartItemsServices.map((service) =>
          service.id === id
            ? {
                ...service,
                qtd: service.qtd! + 1,
                precoAPagar: service.precoAPagar! + service.Preco,
              }
            : service
        );
        setCartItemsServices(updatedCartItemsServices);
        localStorage.setItem(
          "cartItemsServices",
          JSON.stringify(cartItemsServices)
        );
      }
    });
  }

  function increaseServiceQuantity(id: number) {
    setCartItemsServices((prevCartItems) =>
      prevCartItems.map((service) =>
        service.id === id
          ? {
              ...service,
              qtd: service.qtd! + 1,
              precoAPagar: (service.qtd! + 1) * service.Preco, // Atualiza o preço baseado na nova quantidade
            }
          : service
      )
    );
  }

  function decreaseServiceQuantity(id: number) {
    setCartItemsServices((prevCartItems) =>
      prevCartItems.map((service) =>
        service.id === id && service.qtd! > 1
          ? {
              ...service,
              qtd: service.qtd! - 1,
              precoAPagar: (service.qtd! - 1) * service.Preco, // Atualiza o preço baseado na nova quantidade
            }
          : service
      )
    );
  }

  async function removeServiceFromCart(id: number) {
    if (cartItemsServices.length > 0) {
      const ok = await confirmOperation("Deseja remover este item");

      if (ok) {
        const updatedCartItemsServices = [...cartItemsServices];
        const index = updatedCartItemsServices.findIndex(
          (index) => index.id === id
        );
        updatedCartItemsServices.splice(index, 1);
        setCartItemsServices(updatedCartItemsServices);
      }
    }
  }

  /*--------FIM CARRINHO DE COMPRA SERVICOS-----------*/

  /*------------------------- DESCONTO CALCULO ------------------------*/

  function handleDescontoChangeMonth(id: number, valor: number) {
    const copy = [...cartItemsMonths];
    const index = copy.findIndex((i) => i.mesID === id);

    if (index > -1) {
      const valorTotal = copy[index].pagamentoMensal! + copy[index].multa!;

      const desconto = (valorTotal * valor) / 100;

      if (valorTotal >= desconto) {
        copy[index].valorTotal = valorTotal - desconto;
        copy[index].desconto! = desconto;
        setCartItemsMonths(copy);
      } else {
        notifyError("Impossivel efectuar este desconto");
      }
    }
  }

  function handleDescontoChangeService(id: number, valor: number) {
    const copy = [...cartItemsServices];
    const index = copy.findIndex((index) => index.id === id);

    if (index > -1) {
      const valorTotal = copy[index].Preco! * copy[index].qtd!;

      const desconto = (valorTotal * valor) / 100;

      if (valorTotal >= desconto) {
        copy[index].precoAPagar = valorTotal - desconto;
        copy[index].desconto! = desconto;
        setCartItemsServices(copy);
      } else {
        notifyError("Impossivel efectuar este desconto!");
      }
    }
  }

  async function addMetodoPagamentoEscolhido(
    data: IMetodoPagamento,
    pagarComSaldo: boolean
  ) {
    setMetodoDePagamentoEscolhido(data);
    setPagamentoPorSaldo(pagarComSaldo);
  }

  function calcSaldo(valor: number) {
    //const totalDesconto:number = cartItemsMonths.reduce((acc,item)=>acc +(item.desconto!),0) + cartItemsServices.reduce((acc,item)=>acc+(item.desconto!),0);
    setSaldo(valor - totalPagamento);
  }

  const totalDesconto: number =
    cartItemsMonths.reduce((acc, item) => acc + item.desconto!, 0) +
    cartItemsServices.reduce((acc, item) => acc + item.desconto!, 0);

  const subTotal: number =
    cartItemsMonths.reduce(
      (acc, item) => acc + (item.pagamentoMensal! + item.multa!),
      0
    ) +
    cartItemsServices.reduce((acc, item) => acc + item.Preco * item.qtd!, 0);

  const totalPagamento: number =
    cartItemsMonths?.reduce((acc, item) => acc + item.valorTotal!, 0) +
    cartItemsServices?.reduce((acc, item) => acc + item.precoAPagar!, 0);

  const desconto: number = (totalDesconto * totalPagamento) / 100;
  const totalGeral: number = totalPagamento - desconto;

  async function payMant() {
    const estudante = estudanteDetalhes?.EstudanteDetalhes;
    if (
      metodoDePagamentoEscolhido === null &&
      cartItemsMonths.length === 0 &&
      cartItemsServices.length === 0
    ) {
      notifyError("Metodo de pagametno necessario");
    } else {
      const data: any = {
        classeID: estudante?.classeID,
        studentID: estudante?.studentID,
        anolectivoID: estudante?.anolectivoID,
        Meses: cartItemsMonths,
        Services: cartItemsServices,
        metodoId: metodoDePagamentoEscolhido?.id,
        value: metodoDePagamentoEscolhido?.value,
        contaBancaria: metodoDePagamentoEscolhido?.contaID,
        valorSaldo: metodoDePagamentoEscolhido?.valorSaldo,
        pagamentoPorSaldo: pagamentoPorSaldo,
        setPagamentoPorSaldo,
        esquecerMulta: esquecerMulta,
        total: totalPagamento,
        subTotal: subTotal,
        totalPago: metodoDePagamentoEscolhido?.Quantiapaga,
      };

      try {
        const response = await api.post("/EstudantePayment", data);
        notifySucess("Sucesso!");
        setCartItemsMonths([]);
        setCartItemsServices([]);
        setMetodoDePagamentoEscolhido(undefined);
        localStorage.removeItem("estudanteDetalhes");
        setMonthsToPay([]);
        setPagamentoMensal(undefined);

        const{message,NumeroFactura,SaldoGuardado,SaldoRemovido,ValorPago} = response.data
        const {classeID,studentID,anoLectivoId,Meses,Services,metodoId,value,
          contaBancaria,pagamentoPorSaldo,esquecerMulta,total,subTotal } =message

          setReciboData({
             classeID,studentID,anoLectivoId,Meses,Services,metodoId,value,
            contaBancaria,pagamentoPorSaldo,esquecerMulta,total,subTotal,
           NumeroFactura,SaldoGuardado,SaldoRemovido,ValorPago
          })

        console.log(response.data.message)

        setSaldo(0);
        setAtualizarTela(true);
      } catch (error) {
        notifyError("erro ao efectuar pagamento");
      }
    }
  }

  /*------------------ CRUD ENCARREGADO ----------------*/

  async function addEncarregado(encarregado:any){
    
    try {
      const response= await api.post("Admin/RegisterEncarregado",encarregado) 
      
      if(response.status ===200 || response.status ===201){
        operationHasBenSucceded(response.data.message)
      }
      
      
    } catch (error) {
        operationHasFailed(errorMessage)
    }
  }


  /*----------- FIM CRUD ENCARREGADO -----------------*/

  /*--------------- CRUD ESTUDANTES -----------------*/

  useEffect(() => {
    async function getEstudante() {
      await api
        .get("/ProcuararEstudante")
        .then((response) => {
          setEstudante(response.data.EstudanteSelecionado);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getEstudante();
  }, []);

  async function listEstudanteDetalhes(
    classeEstudante: number,
    anoLectivoId: number,
    idEstudante: number
  ) {
    try {
      const response = await api.get(
        `/EstudanteDetalhes/Classe/${classeEstudante}/AnoLectivo/${anoLectivoId}/Estudante/${idEstudante}`
      );

      setEstudanteDetalhes(response.data);
      setMonthsToPay(response.data.MescomDivida);
      setPagamentoMensal(response.data.PagamentoMensal);
      localStorage.setItem(
        "estudanteDetalhes",
        JSON.stringify(estudanteDetalhes)
      );
      setCartItemsMonths([]);
      setCartItemsServices([]);
    } catch (error) {
      operationHasFailed("Nenhum estudante encontrado!");
    }
  }

  async function matriculaEstudante(estudante:any, encarregado?:any){
      const data ={estudante, encarregado}
    try {

      const ok = await confirmOperation("Matricular estudante?");

      if(ok){
        const response =await api.post("Admin/RegisterEstudante",data) 
        if(response.status===200){
          operationHasBenSucceded("Estudante matriculado com sucesso!")
         // addEncarregado(encarregado); 
          setShowBoletim(true)
        }
      
      }     

    } catch (error) {
      if(statusCode!==200){
        operationHasFailed(errorMessage)
      }
    }
     
  }

  /*--------------- FIM CRUD ESTUDANTES ------------*/
  

 

  return (
    <AuthContext.Provider
      value={{
        showBoletim,
        setShowBoletim,
        setUserList,
        userList,
        addEncarregado,
        matriculaEstudante,
        setEstudante,
        reciboData,
        escola,
        setEscola,
        desconto,
        subTotal,
        atualizarTela,
        setAtualizarTela,
        calcSaldo,
        saldo,
        totalGeral,
        handleDescontoChangeMonth,
        handleDescontoChangeService,
        removeServiceFromCart,
        removeLastMonthFromCart,
        totalPagamento,
        increaseServiceQuantity,
        decreaseServiceQuantity,
        services,
        payMant,
        addMetodoPagamentoEscolhido,
        metodoDePagamentoEscolhido,
        contaBancaria,
        metodoPagamento,
        estudanteDetalhes,
        estudante,
        listEstudanteDetalhes,
        cartItemsMonths,
        cartItemsServices,
        addMonthsToCart,
        addServicesToCart,
        showStep,
        setShowStep,
        signIn,
        logOut,
        isAutenticated,
        registerUser,
        user,
        EditUser,
        deleteUser,
        roles,
        setServices
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
