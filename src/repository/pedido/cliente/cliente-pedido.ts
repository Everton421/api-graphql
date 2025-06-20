import { conn } from "../../../database/dataBaseConfig";


export class ClientePedidoRepository{


    async buscaCliente(dbName:any,codigo: number){
                return new Promise(   (resolve, reject) => {

                  let sql = ` SELECT   *,
          DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT(data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro 
        FROM ${dbName}.clientes WHERE codigo = ?  `

                 conn.query(sql, [codigo],   (err:any, result:any) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    })
                })
    }


       
           
}