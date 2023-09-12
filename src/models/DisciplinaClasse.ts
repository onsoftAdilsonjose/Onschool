import { ReactNode } from "react";


export interface DisciplinaClasseModel{
    professor:string;
    disciplina:string;
    curso:string;
    turma:string;
    classe:string;
    periodo:string;
    sala:string;
    tipoDisciplina:string;
    anoLectivo:string
    cratedAt?:string;
    actionadd?: ReactNode;
    actionedit?: ReactNode;
    actionremove?: ReactNode
}