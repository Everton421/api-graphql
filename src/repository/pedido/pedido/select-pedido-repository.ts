import { conn } from "../../../database/dataBaseConfig";
import { PedidoArgs } from "../../../dtos/args/pedido-args";
import { Pedido } from "../../../dtos/models/pedido/pedido/pedido-model";
import { DateService } from "../../../service/date-service";
import { ClientePedidoRepository } from "../cliente/cliente-pedido";
import { ParcelasPedidoRepository } from "../parcelas-pedido/parcelas-pedido-repository";
import { ProdutosPedidoRepository } from "../produto-pedido/produtos-pedido-repository";
import { ServicoPedidoRepository } from "../servicos-pedido/servico-pedido-repository";


    type paramConsulta = {
        data_recadastro?:string
        vendedor?:number
    }

export class SelectPedidoRepository{

    dateService = new DateService()

    produtosPedidoRepository = new ProdutosPedidoRepository();
    servicosPedidoRepository = new   ServicoPedidoRepository(); 
    clientePedidoReposotory = new ClientePedidoRepository();
    parcelasRepository = new ParcelasPedidoRepository();


     async findByparam(empresa:any ,param:PedidoArgs ):Promise<Pedido[]>{ 

        return new Promise(   ( resolve, reject )=>{

            let sql = `select p.*,
             DATE_FORMAT(p.data_cadastro, '%Y-%m-%d') AS data_cadastro,
             DATE_FORMAT(p.data_recadastro, '%Y-%m-%d %H:%i:%s') AS data_recadastro,
            CONVERT(p.observacoes USING utf8) as observacoes 
            from ${empresa}.pedidos as p
             join ${empresa}.clientes as c on c.codigo = p.cliente
            `;

            let conditions= []
            let values= []
                if( param.data_recadastro) {
                    conditions.push( " p.data_recadastro >=  ? ")
                    values.push(param.data_recadastro)
                }
                if( param.vendedor){
                    conditions.push("  p.vendedor = ? ")
                    values.push(param.vendedor)
                }
                if( param.cliente){
                    conditions.push(" p.cliente = ? ")
                    values.push(param.cliente)
                }

                if (param.tipo) {
                    conditions.push("p.tipo = ?");
                    values.push(Number(param.tipo));
                }

                if (param.nome) {
                    conditions.push("c.nome like  ?");
                    values.push(`%${param.nome}%`);  
                }

                let whereClause ='' 
                let finalSql = sql 
                if(conditions.length > 0 ){
                    whereClause = " WHERE " + conditions.join(" AND ")
                }
                finalSql = sql + whereClause


              conn.query(finalSql, values, (err:any, result:any[]) => {
                if (err) {
                    console.log(err);
                    reject(err)
                } else {
            resolve(result)
                }
            })
    }) 
    }

    async findComplete( empresa:any ,param:PedidoArgs ) :Promise<Pedido[] | any>{

        try{
            const dadosPedidos:any[] = await this.findByparam(empresa, param )
            const pedidoRegistrados = await Promise.all( dadosPedidos.map( async ( i) =>{
                
                    let produtos:any = []
                    let servicos:any = []
                    let parcelas:any = []
                    let cliente
                    try{
                          produtos = await this.produtosPedidoRepository.findProducts(empresa, i.codigo)
                    }catch(e){ console.log(`erro ao tentar buscar produtos do pedido`,e)}

                     try{
                        servicos = await this.servicosPedidoRepository.findServices(empresa, i.codigo)
                    }catch(e){ console.log(`erro ao tentar buscar servicos do pedido`,e)}
                    
                     try{
                            let resultCliente:any = await this.clientePedidoReposotory.buscaCliente(empresa, i.cliente)
                             cliente = resultCliente.length > 0 ? resultCliente[0] : {};
                    }catch(e){ console.log(`erro ao tentar buscar o cliente do pedido`,e)}

                     try{
                              parcelas = await this.parcelasRepository.finaAll(empresa, i.codigo);
                    }catch(e){ console.log(`erro ao tentar buscar as parcelas do pedido`,e)}


                return{
                    ...i,
                    produtos, 
                    servicos,
                    cliente,
                    parcelas
                }
            }))
            console.log(pedidoRegistrados)
            return pedidoRegistrados;
        }catch(e){
            console.log(`Erro ao obter dados do pedido `, e)
        }

    }
    

}