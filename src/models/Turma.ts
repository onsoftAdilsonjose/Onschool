import { ReactNode } from "react";


export interface TurmaModel {
  id?:number, 
  nomeTurma: string,
  created_at?: string,
  updated_at?:string
  }

export interface CriarTurmaModel{
    curso: string;
    classe:string;
    periodo:string;
    turma:string;
    sala:string;
    cratedAt?:string;
    actionadd?: ReactNode;
    actionedit?: ReactNode;
    actionremove?: ReactNode
}


