import { conn } from "../../../database/dataBaseConfig";

  export class ServicoPedidoRepository{

    dbName = `\`${57473685000100}\``;
   
        async   buscaServicosDoOrcamento( empresa:any,codigo: number) {
            return new Promise( async (resolve, reject) => {
                const sql = ` select 
                sp.*, s.aplicacao  from ${empresa}.servicos_pedido sp 
                join ${empresa}.servicos s on s.codigo = sp.codigo
                where sp.pedido = ? `
             await  conn.query(sql, [codigo], async (err:any, result:any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
        }
     
  }
