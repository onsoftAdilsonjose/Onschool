import { Pessoa } from "./Pessoa";


export interface UserModel{
    id?:number
    email:string,
    password?:string,
    usertype?:string,
    banned_until?:string
    primeiro_nome?:string
    ultimo_nome?:string,
   nomePai?:string,
   nomeMae?:string,
   tatus?:string,
   pessoa_id?:string,
   dataofbirth?:string,
 
}

export interface IUserListModel{    
        id: number,
        TelefoneAlternativo: null,
        NumerodoTelefone: null,
        dataofbirth: string,
        banned_until: null,
        email: string,
        usertype:string,
        full_name: string,
        idade: number
    
}