import { conn } from "../../../database/dataBaseConfig";
import { Pedido } from "../../../dtos/models/pedido/pedido/pedido-model";
import { DateService } from "../../../service/date-service";
import { ProdutosPedidoRepository } from "../produto-pedido/produtos-pedido-repository";
import { ServicoPedidoRepository } from "../servicos-pedido/servico-pedido-repository";

export class PedidoRepository{

    dateService = new DateService()
    dbName = `\`${57473685000100}\``;

    produtosPedidoRepository = new ProdutosPedidoRepository();
    servicosPedidoRepository = new   ServicoPedidoRepository(); 


     async buscaPordata(empresa:any ,queryData:any, vendedor:number):Promise<Pedido[]>{ 
        let param_data:any;
         if (!queryData) {
            param_data = this.dateService.obterDataAtualSemHoras();
         } else {
             param_data = this.dateService.formatarData(queryData);
         }
        return new Promise( async ( resolve, reject )=>{

            const sql = `select co.*, c.nome  ,
             DATE_FORMAT(co.data_cadastro, '%Y-%m-%d') AS data_cadastro,
             DATE_FORMAT(co.data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro,
            CONVERT(observacoes USING utf8) as observacoes 
            from ${empresa}.pedidos as co
            join ${empresa}.clientes c on c.codigo = co.cliente
                where   co.data_recadastro >= '${param_data}' and co.vendedor = ${vendedor} 
            `;
            await conn.query(sql,   async (err:any, result:Pedido[]) => {
                if (err) {
                    console.log(err);
                    reject(err)
                } else {
            resolve(result)
                }
            })
    }) 
    }

      async findByParam(empresa:any ,  query:any ){

        let {
            dataInicial , 
            dataFinal ,
            vendedor, 
            cliente,
            cnpj,
            limit,
            nome,
            tipo
        } = query 

        
        return new Promise( async ( resolve, reject )=>{
            const baseSql = `
            SELECT pe.*, c.nome,
            DATE_FORMAT(pe.data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT(pe.data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro,
            CONVERT(observacoes USING utf8) AS observacoes
            FROM ${empresa}.pedidos AS pe
            JOIN ${empresa}.clientes c ON c.codigo = pe.cliente

        `;
        

        const conditions: string[] = [];
        const params: any[] = [];
            

        if(!limit || isNaN(limit)){
            limit = 20;
        }

       if( dataInicial && dataFinal){
        conditions.push(`pe.data_cadastro BETWEEN '${dataInicial}' AND '${dataFinal}'  `);
        }

        if (cliente) {
            conditions.push("pe.cliente = ?");
            params.push(Number(cliente));
        }
         
        if (vendedor) {
            conditions.push("pe.vendedor = ?");
            params.push(Number(vendedor));
        }
          
        if (cnpj) {
            conditions.push("c.cnpj = ?");
            params.push(Number(cnpj));
        }

        if (tipo) {
            conditions.push("pe.tipo = ?");
            params.push(Number(tipo));
        }

        if (nome) {
            conditions.push("c.nome like  ?");
            params.push(`%${nome}%`);  
        }
         
        let whereClause = "";
        
        if (conditions.length > 0) {
            whereClause = " WHERE " + conditions.join(" AND ");
            }

        let limitQuery = " LIMIT ? "

        params.push( Number(limit));  

        const finalSql = baseSql + whereClause + limitQuery     ;
          
            await conn.query(finalSql, params,  async (err:any, result:any) => {
                if (err) {
                    console.log(err);
                    reject(err)
                } else {
            resolve(result)
                }
            })  
            
    }) 
    }



    async findComplete(){

        try{
            const dadosPedidos:Pedido[] = await this.buscaPordata(this.dbName, this.dateService.obterDataHoraAtual(), 1 )
            const pedidoRegistrados = await Promise.all( dadosPedidos.map( async ( i) =>{
                    try{
                        const resultProdutos = await this.produtosPedidoRepository.buscaProdutosDoOrcamento(this.dbName, i.codigo)
                    }catch(e){ console.log(`erro ao tentar buscar produtos do pedido`,e)}

                     try{
                        const resultServicos = await this.servicosPedidoRepository.buscaServicosDoOrcamento(this.dbName, i.codigo)
                    }catch(e){ console.log(`erro ao tentar buscar servicos do pedido`,e)}
                    

            }))

        }catch(e){

        }

    }

}