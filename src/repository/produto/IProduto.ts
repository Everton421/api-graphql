import { RowDataPacket } from "mysql2";

export interface IProduto extends RowDataPacket{
 codigo:number
id:number
estoque:number
preco:number
grupo:number
origem:string
descricao:string
num_fabricante:string
num_original:string
sku:string
marca:number
ativo:string
class_fiscal:string
cst:string
data_recadastro:string
data_cadastro:string
observacoes1:string
observacoes2:string
observacoes3:string
tipo:number
}