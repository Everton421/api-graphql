
export interface UsuarioApi
{
codigo:number | string ,
nome:string,
email:string,
cnpj:string,
senha:string, 
responsavel:string       
telefone:string
}


export type newUser = Omit<UsuarioApi , "codigo"> 
