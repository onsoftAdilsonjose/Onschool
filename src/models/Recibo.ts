import { mesesAPagar } from "./Meses"
import { IService } from "./Servico"

   export interface IReciboData{
    classeID:number
    studentID: number
    anoLectivoId: number,
    Meses: mesesAPagar[],
    Services: IService[],
    metodoId: number,
    value: number,
    contaBancaria: number,
    esquecerMulta: boolean,
    total: number,
    subTotal: number
    SaldoRemovido: number,
    SaldoGuardado: number,
    NumeroFactura: string,
    ValorPago: number,
    pagamentoPorSaldo:boolean

   }