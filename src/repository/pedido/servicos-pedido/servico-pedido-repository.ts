import { QueryError } from "mysql2";
import { conn } from "../../../database/dataBaseConfig";
import { InsertServicosPedidoInput } from "../../../dtos/inputs/pedido/servicos-pedido/insert-servicos-pedido-input";
import { ServicoPedido } from "../../../dtos/models/pedido/servicos-pedido/servico-pedido-model";



type ResultSetHeader = {
  fieldCount: number,
  affectedRows: number,
  insertId: number,
  info: string,
  serverStatus: number,
  warningStatus: number,
  changedRows: number
}



  export class ServicoPedidoRepository{

   
        async   findServices( dbName:any,codigo: number) :Promise<ServicoPedido[]>{
            return new Promise(   (resolve, reject) => {
                const sql = ` select 
                sp.*, s.aplicacao  from ${dbName}.servicos_pedido sp 
                join ${dbName}.servicos s on s.codigo = sp.codigo
                where sp.pedido = ? `
                conn.query(sql, [codigo],   (err:any, result:ServicoPedido[] | any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
        }
   
        
    async insert(  dbName:any,servicos:InsertServicosPedidoInput[], pedido:number ):Promise<ResultSetHeader>{
         
        return new Promise(   (resolve, reject )=>{
  
            if (servicos.length > 0) {
              let i=1;
              for(let s of servicos){
                  let {
                   codigo,
                      valor,
                      quantidade,
                      desconto,
                      total,
                  } = s
    
                   if( !valor) valor = 0;
                   if( !quantidade) quantidade = 0;
                   if( !desconto) desconto = 0;
                   if( !total) total = 0;
     
                const sql =  ` INSERT INTO    ${dbName}.servicos_pedido  ( pedido ,  codigo ,  desconto ,  quantidade ,  valor ,  total ) VALUES ( ?, ?, ?, ?, ?, ?)   `;
  
                  let dados = [ pedido ,  codigo ,  desconto ,  quantidade ,  valor ,  total  ]
                  conn.query( sql,dados ,(error:any, resultado:ResultSetHeader | any)=>{
                     if(error){
                      console.log(" erro ao inserir servico do orcamento "+ error)
                             reject(" erro ao inserir servico do orcamento "+ error);
                     }else{
                      resolve(resultado)
                         console.log(`servico  inserido com sucesso`);
                     }
                  })
    
                  if(i === servicos.length){
                      return;
                  }
                  i++;
            
            } 
        }
          })
  }
      async   deleteServicosPedido( dbName:any, codigo: number):Promise<ResultSetHeader |  QueryError > {
              return new Promise(  (resolve, reject) => {
      
                  let sql2 = ` delete from ${dbName}.servicos_pedido
                                          where pedido = ${codigo}
                                      `
                   conn.query(sql2, (err: QueryError, result:ResultSetHeader) => {
                      if (err) {
                          reject(err);
                      } else {
                          resolve(result);
                      }
                  })
              })
      
          }

  }
