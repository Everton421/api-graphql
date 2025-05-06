import { resolve } from "path";
import { Pedido } from "../../dtos/models/pedido/pedido-model";
import { conn } from "../../database/dataBaseConfig";
import { ClientePedido } from "../../dtos/models/pedido/cliente-pedido-model";


export class PedidoRepository{
    dbName = `\`${57473685000100}\``;

async findAll ():Promise<Pedido[]> {
   
 
    return new Promise((resolve, reject )=>{
       const  sql = ` SELECT 
       *,
       CAST ( observacoes AS  CHAR(10000) CHARACTER SET utf8) observacoes,
       DATE_FORMAT( data_cadastro , '%Y-%m-%d') as  data_cadastro,
       DATE_FORMAT( data_recadastro, '%Y-%m-%d %H:%m:%s') as data_recadastro
       FROM ${this.dbName}.pedidos;`
       
       conn.query(sql,   (err, result: Pedido[])=>{
            if(err){
                console.log( "Erro ao consultar os pedidos" ,err);
                reject(err)
            }else{
        
                if( result.length > 0 ){

                    const sqlCliente = ` SELECT codigo, nome  FROM ${this.dbName}.clientes where  codigo = ${result[0].cliente}` 
                      conn.query(sqlCliente, (errClient, resultCliente:ClientePedido[])=>{
                        if( errClient) throw errClient;
                        else{ 
                            if(resultCliente.length > 0 ){
                                console.log( resultCliente[0] )
                            result[0].cliente = resultCliente[0] 
                            }
                             
                          }
                    } )
                    //result[0].cliente = cliente ;
                   
                }
                console.log(result)

                resolve(result)
            }
       })
    })
    
     
}   

}