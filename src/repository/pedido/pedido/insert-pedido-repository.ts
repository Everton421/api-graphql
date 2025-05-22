import { ResultSetHeader } from "mysql2";
import { conn } from "../../../database/dataBaseConfig";
import { InsertPedidoInput } from "../../../dtos/inputs/pedido/pedido/insert-pedido-input";
import { DateService } from "../../../service/date-service";
import { ClientePedidoRepository } from "../cliente/cliente-pedido";
import { ParcelasPedidoRepository } from "../parcelas-pedido/parcelas-pedido-repository";
import { ProdutosPedidoRepository } from "../produto-pedido/produtos-pedido-repository";
import { ServicoPedidoRepository } from "../servicos-pedido/servico-pedido-repository";
import { InsertCompletePedidoInput } from "../../../dtos/inputs/pedido/pedido/complete-pedido-input";

export class InsertPedidoRepository{
        
        dateService = new DateService()
    
        private produtosPedidoRepository = new ProdutosPedidoRepository();
        private  servicosPedidoRepository = new   ServicoPedidoRepository(); 
        private clientePedidoReposotory = new ClientePedidoRepository();
        private  parcelasRepository = new ParcelasPedidoRepository();


            async insert( empresa:string, pedido:InsertPedidoInput):Promise<ResultSetHeader> {
            return new Promise( async(resolve, reject)=>{
            
                let sql = `INSERT INTO 
                    ${empresa}.pedidos 
                    ( codigo ,  id ,  vendedor , situacao, contato ,  descontos ,  forma_pagamento ,  quantidade_parcelas ,  total_geral ,  total_produtos ,  total_servicos ,  cliente ,  veiculo ,  data_cadastro ,  data_recadastro ,  tipo_os ,  enviado, tipo, observacoes)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )   `

                    const values =  [pedido.codigo ,  pedido.id ,  pedido.vendedor ,  pedido.situacao, pedido.contato,  pedido.descontos ,  pedido.forma_pagamento ,  pedido.quantidade_parcelas ,  pedido.total_geral ,  pedido.total_produtos ,  pedido.total_servicos ,  pedido.cliente.codigo,  pedido.veiculo ,  pedido.data_cadastro ,  pedido.data_recadastro ,  pedido.tipo_os ,  pedido.enviado, pedido.tipo, pedido.observacoes ] 
                
                    conn.query(sql, values, (err:any, result:ResultSetHeader  ) => {
                                if (err) {
                                    console.log(err);
                                    reject(err)
                                } else {
                            resolve(result)
                                }

                            }) } 
                        )

            }


        async create(empresa:string, pedido:InsertCompletePedidoInput): Promise<InsertCompletePedidoInput>{
                const dataAtual = this.dateService.obterDataAtual();

                    pedido.data_cadastro = dataAtual;

                    const servicos  = pedido.servicos
                    const produtos  = pedido.produtos
                    const parcelas = pedido.parcelas

                      return new Promise( async (resolve,reject )=>{
                                try{
                                    let resultTaleOrder = await this.insert(empresa, pedido)
                                    if( resultTaleOrder.affectedRows > 0 ){
                                        if(produtos.length > 0 ){
                                            try{
                                               let resultInsertProductsOrder = await this.produtosPedidoRepository.insertProducts(empresa,produtos)
                                            }catch(e){ 
                                               console.log(` Erro ao tentar registrar os produtos do pedido `,e)
                                               return;
                                             }
                                        }
                                        if(servicos.length > 0 ){
                                            try{
                                              let resultInsertServicesOrder = await this.servicosPedidoRepository.insert(empresa, servicos);
                                           }catch(e){  return  console.log(` Erro ao tentar registrar os servicos do pedido ` )  }
                                        }

                                             try{
                                               let resultInsertParcelas  = await this.parcelasRepository.insert(empresa, parcelas, pedido.codigo);
                                             }catch(e){  return  console.log(` Erro ao tentar registrar as parcelas do pedido ` )  }

                                          resolve(pedido)
                                    } 
                                    
                                } catch(e){ 
                                    reject(e)
                                }
                                 
                        })


        }


}