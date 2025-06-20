import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Pedido } from "../dtos/models/pedido/pedido/pedido-model";
import { SelectPedidoRepository } from "../repository/pedido/pedido/select-pedido-repository";
import { PedidoArgs } from "../dtos/args/pedido-args";
import { InsertPedidoRepository } from "../repository/pedido/pedido/insert-pedido-repository";
import { InsertCompletePedidoInput } from "../dtos/inputs/pedido/pedido/complete-pedido-input";
import { GraphQLError } from "graphql";
import { UpdatePedidoRepository } from "../repository/pedido/pedido/update-pedido-repository";
import { DateService } from "../service/date-service";
import { TokenService } from "../service/token-service";


@Resolver(()=> Pedido)
export class PedidoResolver{
    
    selectPedidoRepository = new SelectPedidoRepository();
    insertPedidoRepository = new InsertPedidoRepository();
    updatePedidoRepository = new UpdatePedidoRepository();
    dateService = new DateService();
    tokenService = new TokenService();


    @Query( ()=>[Pedido] )
    async getPedidos(@Args(){ codigo, cliente,  nome,tipo, data_recadastro, vendedor }:PedidoArgs, @Ctx() context:any){
                  if(  !context.req.headers.token  ){
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                      } 
                     let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                     if(decoded.erro || decoded.payload === undefined) {
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                     }  

                        let cnpj = decoded.payload?.cnpj;
                     let db =   `\`${cnpj}\``
          let param:PedidoArgs  = { codigo, cliente, nome, tipo ,data_recadastro, vendedor };

        let aux:Pedido[] = await this.selectPedidoRepository.findComplete( db ,param );
        return aux;
    }
   
    @Query( ()=>Pedido )
    async getPedido(@Args(){ codigo, cliente,nome,tipo, data_recadastro, vendedor }: PedidoArgs, @Ctx() context:any  ){
              if(  !context.req.headers.token  ){
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                      } 
                     let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                     if(decoded.erro || decoded.payload === undefined) {
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                     }  
                        let cnpj = decoded.payload?.cnpj;
                       let db =   `\`${cnpj}\``

        let param:PedidoArgs  = { codigo ,cliente, nome, tipo ,data_recadastro, vendedor };
        let aux:Pedido[] = await this.selectPedidoRepository.findComplete( db, param );
        return aux[0];
    }



    @Mutation(()=>Pedido)
    async createPedido( @Arg('dados') dados:  InsertCompletePedidoInput , @Ctx() context:any  ) {
           let param :Partial<PedidoArgs>   =  { codigo: dados.codigo}

                  if(  !context.req.headers.token  ){
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                      } 
                     let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                     if(decoded.erro || decoded.payload === undefined) {
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                     }  
                        let cnpj = decoded.payload?.cnpj;
                       let db =   `\`${cnpj}\``

            const resultValidpedido = await this.selectPedidoRepository.findByparam( db, param  )
        if( resultValidpedido.length > 0 ){
               return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Já existe um pedido registrado com este codigo!" } })
        }
        if( !dados.situacao) dados.situacao = 'EA'
        if(!dados.data_cadastro) dados.data_cadastro = this.dateService.obterDataAtual();
        if(!dados.data_recadastro) dados.data_recadastro = this.dateService.obterDataHoraAtual();
        if(!dados.total_geral) dados.total_geral = 0;
        if(!dados.total_produtos) dados.total_produtos = 0 ;
        if( !dados.total_servicos) dados.total_servicos = 0;
        if( !dados.forma_pagamento) dados.forma_pagamento = 0;
        if( !dados.descontos) dados.descontos = 0;
        if( !dados.veiculo) dados.veiculo = 0;

        let aux = await this.insertPedidoRepository.create( db, dados)

        if( aux.codigo > 0 ){
            return dados;
        }else{
               return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Ocorreu um erro ao tentar registrar o pedido!" } })
        }
    }




    @Mutation(()=> Pedido)
        async updatePedido( @Arg('dados') dados: InsertCompletePedidoInput, @Ctx() context:any ){
                let param :Partial<PedidoArgs>   =  { codigo: dados.codigo}

                     if(  !context.req.headers.token  ){
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                      } 
                     let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                     if(decoded.erro || decoded.payload === undefined) {
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                     }  
                        let cnpj = decoded.payload?.cnpj;
                       let db =   `\`${cnpj}\``

                const resultValidpedido = await this.selectPedidoRepository.findByparam( db, param  )
            if(!dados.data_recadastro) dados.data_recadastro = this.dateService.obterDataHoraAtual();

                if(resultValidpedido.length > 0 ){
                   let aux = await this.updatePedidoRepository.update(db, dados)
                    if( aux.erro === false && aux.ok === true ){
                        let resultPedidoAtualizado = await this.selectPedidoRepository.findComplete(db, { codigo: dados.codigo})
                            if(resultPedidoAtualizado.length > 0  ){
                                return resultPedidoAtualizado[0]
                            }
                    }else{
              return  new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: aux.msg } })

                    }
                }else{
              return  new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: " O pedido não foi encontrado !" } })

                }

        }

}
