import { conn } from "../../../database/dataBaseConfig";
import { InsertParcelasPedidoInput } from "../../../dtos/inputs/pedido/parcelas/insert-parcelas-pedido-input";

export class ParcelasPedidoRepository{

    async   finaAll(empresa:any,codigo: number) {
            return new Promise(   (resolve, reject) => {
                const sql = ` select *,  DATE_FORMAT(vencimento, '%Y-%m-%d') AS vencimento   from ${empresa}.parcelas where pedido = ? `
                 conn.query(sql, [codigo],   (err:any, result:any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
        }

    async insert(empresa:any,  parcelas:InsertParcelasPedidoInput[], codigoPedido:any){
      return new Promise(   (resolve, reject )=>{
            for(let p of parcelas){
                let i = 1;

               let {  parcela ,  valor ,vencimento    } = p     
          
          let sql = `  INSERT INTO ${empresa}.parcelas ( pedido ,  parcela ,  valor, vencimento ) VALUES ( ?  , ?,  ?, ?  )`;
          let dados = [ codigoPedido ,  parcela ,  valor ,vencimento ]
  
                    conn.query( sql,  dados , (err: any, resultParcelas:any) => {
                        if (err) {
                            console.log( "erro ao inserir parcelas !" + err)
                            
                        } else {
                            console.log('  Parcela inserida com sucesso '    )
                            resolve(codigoPedido)
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