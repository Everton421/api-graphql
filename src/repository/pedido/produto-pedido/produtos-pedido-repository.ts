import { conn } from "../../../database/dataBaseConfig";


export class ProdutosPedidoRepository{


     async   buscaProdutosDoOrcamento(empresa:any, codigo: number) {
            return new Promise( async (resolve, reject) => {
                const sql = ` select pp.*, p.descricao  
                from ${empresa}.produtos_pedido pp 
                join ${empresa}.produtos p on pp.codigo = p.codigo
                where pp.pedido = ? `
               await conn.query(sql, [codigo], async (err:any, result:any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
        }
        
}