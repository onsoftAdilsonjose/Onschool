


export interface IService{
    id?:number;
    ServicoNome:string;
    Preco:number;
    precoAPagar?:number
    qtd?:number
    desconto?:number
    QuantidadeExiste:number;
    TotalVendido?:number;
    created_at?:string;
    updated_at?:string;
}