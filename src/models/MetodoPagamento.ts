
export interface IMetodoPagamento{
    id:number
    Tipodepagamento?: string
    contaID?:number
    Quantiapaga?:number
    value?:number
    pagarComSaldo?:boolean;
    valorSaldo?:number
    
}