


export interface IMeses{
    id?:number
    mesNome:string;
    preco?:number
    totalApagar?:number
    multa?:number
    qtd?:1
    desconto?:Number
    state?:string;
    created_at?:string;
    updated_at:string;

}


export interface mesesAPagar{
    mesID:number
    mesNome:string
    pagamentoMensal?:number
    mesAnolectivoID:number 
    MontanteTotal?:number
    Quantiapaga?:number
    valorTotal?:number;
    multa?:number;   
    desconto?:number
    qtd:1

}