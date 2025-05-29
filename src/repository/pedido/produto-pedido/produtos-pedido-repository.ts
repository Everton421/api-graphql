import { QueryError  } from "mysql2";
import { conn } from "../../../database/dataBaseConfig";
import { InsertProdutosPedidoInput } from "../../../dtos/inputs/pedido/produtos-pedido/insert-produtos-pedido-input";
import { ProdutoPedido } from "../../../dtos/models/pedido/produtos-pedido/produto-pedido-model";


type ResultSetHeader = {
  fieldCount: number,
  affectedRows: number,
  insertId: number,
  info: string,
  serverStatus: number,
  warningStatus: number,
  changedRows: number
}

export class ProdutosPedidoRepository{


     async   findProducts(empresa:any, codigo: number):Promise<ProdutoPedido[]> {
            return new Promise(   (resolve, reject) => {
                const sql = ` select pp.*, p.descricao  
                from ${empresa}.produtos_pedido pp 
                join ${empresa}.produtos p on pp.codigo = p.codigo
                where pp.pedido = ? `
                 conn.query(sql, [codigo],   (err:any, result:any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
        }

     async insertProducts(empresa:any, produtos:InsertProdutosPedidoInput[] , pedido:number):Promise<ResultSetHeader |  QueryError > {

       return new Promise(   (resolve, reject )=>{
  
            let i=1;
            for(let p of produtos){
                let {
                    codigo,
                    preco,
                    quantidade,
                    desconto,
                    total,
                } = p
  
                 if( !preco) preco = 0;
                 if( !quantidade) quantidade = 0;
                 if( !desconto) desconto = 0;
               
                 if( !total) total = 0;
             
  
             const sql =  ` INSERT INTO ${empresa}.produtos_pedido ( pedido ,  codigo ,  desconto ,  quantidade ,  preco ,  total ) VALUES (? , ?, ?, ?, ?, ?) `;
                let dados = [ pedido, codigo, desconto, quantidade, preco, total ]
                conn.query( sql,dados ,(error:QueryError | null, resultado:ResultSetHeader | any )=>{
                   if(error){
                           reject(" erro ao inserir produto do orcamento "+ error);
                   }else{
                       console.log(`produto  inserido com sucesso`);
                    resolve(resultado)
                   }
                })
  
                if(i === produtos.length){
                    return;
                }
                i++;
            }
        })
        }

          async   deleteProdutosPedido( empresa:any, codigo: number):Promise<ResultSetHeader |  QueryError > {
            return new Promise(  (resolve, reject) => {
    
                let sql2 = ` delete from ${empresa}.produtos_pedido
                                        where pedido = ${codigo}
                                    `
                 conn.query(sql2, (err: QueryError, result:ResultSetHeader) => {
                    if (err) {
                        //console.log("erro ao tentar excluir produto ")
                        reject(err);
                    } else {
                        //console.log(`produto deletado do pedido ${codigo}  `,result)
                        resolve(result);
                    }
                })
            })
    
        }
        
}