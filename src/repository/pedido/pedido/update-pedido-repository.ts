import { conn } from "../../../database/dataBaseConfig";
import { InsertCompletePedidoInput } from "../../../dtos/inputs/pedido/pedido/complete-pedido-input";
import { InsertPedidoInput } from "../../../dtos/inputs/pedido/pedido/insert-pedido-input";
import { ParcelasPedido } from "../../../dtos/models/pedido/parcelas/parcelas-pedidos-model";
import { ProdutoPedido } from "../../../dtos/models/pedido/produtos-pedido/produto-pedido-model";
import { ServicoPedido } from "../../../dtos/models/pedido/servicos-pedido/servico-pedido-model";
import { DateService } from "../../../service/date-service";
import { ParcelasPedidoRepository } from "../parcelas-pedido/parcelas-pedido-repository";
import { ProdutosPedidoRepository } from "../produto-pedido/produtos-pedido-repository";
import { ServicoPedidoRepository } from "../servicos-pedido/servico-pedido-repository";

type ResultSetHeader = {
  fieldCount: number,
  affectedRows: number,
  insertId: number,
  info: string,
  serverStatus: number,
  warningStatus: number,
  changedRows: number
}
type returnUpdatePedido= {
   ok:boolean , erro: boolean , msg: string 
}

export class UpdatePedidoRepository{
            dateService = new DateService()
    
    private async  updateTable( empresa:any ,orcamento:InsertPedidoInput ) :Promise<ResultSetHeader >{
        return new Promise(async (resolve, reject) => {
            const sql = `
                UPDATE ${empresa}.pedidos  
                set 
            `
             let conditions= []
             let values= []
                        
                        if( orcamento.cliente.codigo){
                            conditions.push(' cliente = ? ');
                            values.push(orcamento.cliente.codigo);
                           }
                           if( orcamento.total_geral || orcamento.total_geral === 0  ){
                            conditions.push(' total_geral = ? ');
                            values.push(orcamento.total_geral);
                           }
                          if( orcamento.total_produtos || orcamento.total_produtos === 0 ){
                            conditions.push(' total_produtos = ? ');
                            values.push(orcamento.total_produtos);
                           }
                        if( orcamento.total_servicos || orcamento.total_servicos === 0  ){
                           conditions.push(' total_servicos = ? ');
                           values.push(orcamento.total_servicos);
                           }
                         if( orcamento.tipo_os || orcamento.tipo_os === 0  ){
                           conditions.push(' tipo_os = ? ');
                           values.push(orcamento.tipo_os);
                           }
                          if( orcamento.tipo || orcamento.tipo === 0  ){
                           conditions.push(' tipo = ? ');
                           values.push(orcamento.tipo);
                           }
                         if( orcamento.quantidade_parcelas){
                           conditions.push(' quantidade_parcelas = ? ');
                           values.push(orcamento.quantidade_parcelas);
                           }
                           if( orcamento.contato){
                           conditions.push(' contato = ? ');
                           values.push(orcamento.contato);
                           }
                           if( orcamento.veiculo || orcamento.veiculo === 0 ){
                           conditions.push(' veiculo = ? ');
                           values.push(orcamento.veiculo);
                           }
                          if( orcamento.forma_pagamento || orcamento.forma_pagamento === 0){
                           conditions.push(' forma_pagamento = ? ');
                           values.push(orcamento.forma_pagamento);
                           }
                          if( orcamento.observacoes){
                            conditions.push(' observacoes = ? ');
                            values.push(orcamento.observacoes);
                            }
                          if( orcamento.data_cadastro){
                            conditions.push(' data_cadastro = ? ');
                            values.push(orcamento.data_cadastro);
                            }

                            conditions.push(' data_recadastro = ? ');
                            values.push( this.dateService.obterDataHoraAtual());

                        if( orcamento.enviado){
                            conditions.push(' enviado = ? ');
                            values.push(orcamento.enviado);
                            }

                        if( orcamento.observacoes){
                            conditions.push(' observacoes = ? ');
                            values.push(orcamento.observacoes);
                            }
                        if( orcamento.situacao){
                            conditions.push(' situacao = ? ');
                            values.push(orcamento.situacao);
                            }
                                
                            let finalSql = sql;

                            let whereClause = ' WHERE codigo = ? '
                            values.push(orcamento.codigo)

                                if( conditions.length > 0 ){
                                    finalSql = sql + conditions.join(' , ') + whereClause
                                }

                                    //console.log(' ' ,finalSql)
                                    //console.log(values)
            conn.query(finalSql,values, (err:any, result:ResultSetHeader | any ) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.affectedRows);
                    }
            })
             
        })
    }

    async update( empresa:any ,orcamento: InsertCompletePedidoInput ):Promise<returnUpdatePedido>{

      return new Promise ( async (resolve, reject )=>{
       
        const produtosPedidoRepository = new ProdutosPedidoRepository();
        const servicoPedidoRepository = new ServicoPedidoRepository();
        const  parcelasPedidoRepository = new ParcelasPedidoRepository();

        const produtos = orcamento.produtos
        const servicos = orcamento.servicos
        const cliente = orcamento.cliente
        const parcelas = orcamento.parcelas

                    try{
                    await this.updateTable(empresa, orcamento )
                }catch(e){ console.log("Erro ao tentar atualizar tabela do pedido " , e  ) 
                    reject( { ok:false, erro:true, msg:"Erro ao tentar atualizar tabela do pedido" }) 
                }

                let validProdutos: ProdutoPedido[] =[];
                 try{ 
                    validProdutos = await produtosPedidoRepository.findProducts(empresa, orcamento.codigo);
                 }catch(e){
                        console.log(" Erro ao tentar validar os produtos do pedido ",e )
                    reject(  { ok:false, erro:true, msg: " Erro ao tentar validar os produtos do pedido " }) 
                 }
                if( validProdutos.length > 0 ){
                     try{ 
                         await produtosPedidoRepository.deleteProdutosPedido(empresa, orcamento.codigo);
                     }catch(e){
                            console.log(" Erro ao tentar excluir os produtos do pedido ", e)
                            reject(  { ok:false, erro:true, msg:" Erro ao tentar excluir os produtos do pedido " } )
                     }
                }
                if( produtos && produtos.length > 0 ){
                       try{ 
                        await produtosPedidoRepository.insertProducts(empresa,produtos, orcamento.codigo );

                    }catch(e){
                               console.log(" Erro ao tentar inserir os produtos do pedido ", e )
                            reject(  { ok:false, erro:true, msg:" Erro ao tentar inserir os produtos do pedido " }) 
                    }
                }


                let validServicos: ServicoPedido[]=[]

                    try{
                            validServicos = await servicoPedidoRepository.findServices(empresa, orcamento.codigo)
                    }catch(e){
                            console.log(" Erro ao tentar validar os servicos do pedido ", e)
                    reject(  { ok:false, erro:true, msg: " Erro ao tentar validar os servicos do pedido " } )
                    }

                    if( validServicos.length > 0 ){
                        try{ 
                         await servicoPedidoRepository.deleteServicosPedido(empresa, orcamento.codigo);
                     }catch(e){
                            console.log(" Erro ao tentar excluir os servicos do pedido ", e)
                            reject(  { ok:false, erro:true, msg:" Erro ao tentar excluir os servicos do pedido " }) 
                     }
                    }
                      if( servicos && servicos.length > 0 ){
                       try{ 
                        await servicoPedidoRepository.insert(empresa, servicos, orcamento.codigo);
                    }catch(e){
                               console.log(" Erro ao tentar inserir os servicos do pedido ", e )
                            reject(  { ok:false, erro:true, msg:" Erro ao tentar inserir os servicos do pedido " }) 
                    }
                   }

                   let validParcelas: ParcelasPedido[]=[]

                      try{
                            validParcelas = await parcelasPedidoRepository.findAll(empresa, orcamento.codigo)
                    }catch(e){
                            console.log(" Erro ao tentar validar as parcelas do pedido ", e)
                    reject(  { ok:false, erro:true, msg: " Erro ao tentar validar as parcelas do pedido " })
                    }

                    if( validParcelas.length > 0 ){
                        try{ 
                         await parcelasPedidoRepository.deleteParcelasPedido(empresa, orcamento.codigo);
                     }catch(e){
                            console.log(" Erro ao tentar excluir as parcelas do pedido ", e)
                            reject(  { ok:false, erro:true, msg:" Erro ao tentar excluir as parcelas  do pedido " } )
                     }
                    }
                    
                    if( parcelas && parcelas.length > 0 ){
                       try{ 
                        await parcelasPedidoRepository.insert( empresa, parcelas, orcamento.codigo);
                    }catch(e){
                               console.log(" Erro ao tentar inserir as parcelas do pedido ", e )
                            reject(  { ok:false, erro:true, msg:" Erro ao tentar inserir as parcelas do pedido " } )
                    }
                   }
                   resolve( { ok:true, erro:false, msg:"Parcelas registradas com sucesso"})

      })

    }   


}