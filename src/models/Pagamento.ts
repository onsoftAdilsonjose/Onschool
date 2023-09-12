import { IMeses, mesesAPagar } from "./Meses";
import { IService } from "./Servico";


export interface IPagamentoData{
        classeID: number,
        studentID: number,
        anolectivoID: number,
        Meses: mesesAPagar[],
        Services:IService[],
        metodoId:number,
        value:number,
        contaBancaria:number,
        valorSaldo:number,
        pagamentoPorSaldo:boolean,
        esquecerMulta:boolean,
        total:number,
        subTotal:number,    
        totalPago:number

}