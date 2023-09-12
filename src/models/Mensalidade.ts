

interface MensalidadeModel{
    id:number
    Propina_Anual:number
    Classe_id:number
    Curso_id:number
    Anolectivo_id:number
    ConfirmacaoPreco:number
    MatriculaPreco:number
     Periodo_id:number
    Turma_id:number
    Sala_id:number
}


interface MensalidadeModelList{
        id:number
        Propina_Anual: number,
        ConfirmacaoPreco: number,
        MatriculaPreco: number,
        nomeCurso: string,
        nomePeriodo: string,
        nomeTurma: string,
        nomeSala: string,
        classe_name: string,
        ano_lectivo: string,
        Classe_id: number,
        Anolectivo_id: number,
        Curso_id: number,
        Sala_id: number,
        Turma_id: number,
        Periodo_id: number,
        PagamentoMensal:number
    
}



export {MensalidadeModel,MensalidadeModelList}