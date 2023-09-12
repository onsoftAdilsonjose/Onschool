export interface Estudante{
ClassComExam:number
ConfirmacaoPreco:string
MatriculaPreco:string
Propina_Anual:string
ano_lectivo:string
anolectivoID:number
classeID:number
classe_name:string
id:number
nomeCurso:string
nomePeriodo:string
nomeSala:string
nomeTurma:string
primeiro_nome:string
reg_Numero:string
studentID:number
ultimo_nome:string   
}


interface atributoType{
    mesNome: string
    mesID: number,
    mesAnolectivoID: number,
    created_at:string
}


interface mesData{
    mesAnolectivoID?:number
    mesID:number
    mesNome:string
    MultaporMes:number

}

export interface EstudanteDetalhes{
    PagarApartir:atributoType
    EstudanteDetalhes:Estudante
    MescomDivida:atributoType[]
    EstudanteSaldo:number
    PagamentoMensal:number
    Divida:number
    MesesComMultas:number
    MesesPago:mesData[]
    ValorDaMulta:number
    countMeses:number
    mesesNomeComMulta:mesData[]
    multaOrDesconto:{
        Desconto:number
        DiaCobranca:number
        percetagem:number
    }
}




