import { QueryError } from "mysql2";
import { conn } from "../../../database/dataBaseConfig";
import { InsertParcelasPedidoInput } from "../../../dtos/inputs/pedido/parcelas/insert-parcelas-pedido-input";
import { ParcelasPedido } from "../../../dtos/models/pedido/parcelas/parcelas-pedidos-model";


type ResultSetHeader = {
  fieldCount: number,
  affectedRows: number,
  insertId: number,
  info: string,
  serverStatus: number,
  warningStatus: number,
} 


export class ParcelasPedidoRepository{

    async   findAll(dbName:any,codigo: number):Promise<ParcelasPedido[]> {
            return new Promise(   (resolve, reject) => {
                const sql = ` select *,  DATE_FORMAT(vencimento, '%Y-%m-%d') AS vencimento   from ${dbName}.parcelas where pedido = ? `
                 conn.query(sql, [codigo],   (err: QueryError | null , result:ParcelasPedido[] | any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
        }

   async   deleteParcelasPedido( dbName:any, codigo: number):Promise<ResultSetHeader |  QueryError > {
              return new Promise(  (resolve, reject) => {
      
                  let sql2 = ` delete from ${dbName}.parcelas
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

    async insert(dbName:any,  parcelas:InsertParcelasPedidoInput[], codigoPedido:any) :Promise<ResultSetHeader >{
      return new Promise(   (resolve, reject )=>{
            for(let p of parcelas){
                let i = 1;

               let {  parcela ,  valor ,vencimento    } = p     
          
          let sql = `  INSERT INTO ${dbName}.parcelas ( pedido ,  parcela ,  valor, vencimento ) VALUES ( ?  , ?,  ?, ?  )`;
          let dados = [ codigoPedido ,  parcela ,  valor ,vencimento ]
  
                    conn.query( sql,  dados , (err: QueryError |  any, resultParcelas: ResultSetHeader | any   ) => {
                        if (err) {
                            console.log( "erro ao inserir parcelas !" + err)
                            
                        } else {
                            console.log('  Parcela inserida com sucesso '    )
                            resolve(resultParcelas)
                        }
                    }
                )

                  if(i === parcelas.length){
                           return;
                      }
                   i++;
            }
 
      })
  
    }
    }