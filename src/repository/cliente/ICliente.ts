import { RowDataPacket } from "mysql2"

interface ICliente extends RowDataPacket {
 
codigo:number
id:string
celular:string
nome:string
cep:string
endereco:string
ie:string
numero:string
cnpj:string
ativo:string
cidade:string
data_cadastro:string
data_recadastro:string
vendedor:number
bairro:string
estado:string
    
} 