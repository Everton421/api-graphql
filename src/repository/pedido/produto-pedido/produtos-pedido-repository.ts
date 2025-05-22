import { ResultSetHeader } from "mysql2";
import { conn } from "../../../database/dataBaseConfig";
import { InsertProdutosPedidoInput } from "../../../dtos/inputs/pedido/produtos-pedido/insert-produtos-pedido-input";


export class ProdutosPedidoRepository{


     async   findProducts(empresa:any, codigo: number) {
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

     async insertProducts(empresa:any, produtos:InsertProdutosPedidoInput[] ):Promise<ResultSetHeader> {

       return new Promise(   (resolve, reject )=>{
  
            let i=1;
            for(let p of produtos){
                let {
                    pedido,
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
                conn.query( sql,dados ,(error:any, resultado:ResultSetHeader)=>{
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

          async   deleteProdutosPedido( empresa:any, codigo: number) {
            return new Promise( async(resolve, reject) => {
    
                let sql2 = ` delete from ${empresa}.produtos_pedido
                                        where pedido = ${codigo}
                                    `
               await conn.query(sql2, (err:any, result:any) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log(`produto deletado do pedido ${codigo}  `,result)
                        resolve(result);
                    }
                })
            })
    
        }
        
}