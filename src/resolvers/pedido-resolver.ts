import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { Pedido } from "../dtos/models/pedido/pedido/pedido-model";
import { ProdutoPedido } from "../dtos/models/pedido/produtos-pedido/produto-pedido-model";
import { ServicoPedido } from "../dtos/models/pedido/servicos-pedido/servico-pedido-model";
import { SelectPedidoRepository } from "../repository/pedido/pedido/select-pedido-repository";
import { PedidoArgs } from "../dtos/args/pedido-args";
import { InsertPedidoRepository } from "../repository/pedido/pedido/insert-pedido-repository";
import { InsertProdutosPedidoInput } from "../dtos/inputs/pedido/produtos-pedido/insert-produtos-pedido-input";
import { InsertCompletePedidoInput } from "../dtos/inputs/pedido/pedido/complete-pedido-input";
import { GraphQLError } from "graphql";


@Resolver(()=> Pedido)
export class PedidoResolver{
    
    selectPedidoRepository = new SelectPedidoRepository();
    insertPedidoRepository = new InsertPedidoRepository();

    dbName = `\`${57473685000100}\``;

    @Query( ()=>[Pedido] )
    async getPedidos(@Args(){ cliente,  nome,tipo, data_recadastro, vendedor }:PedidoArgs){

          let param:PedidoArgs  = { cliente, nome, tipo ,data_recadastro, vendedor };

        let aux:Pedido[] = await this.selectPedidoRepository.findComplete( this.dbName ,param );
        return aux;
    }
   
    @Query( ()=>Pedido )

    async getPedido(@Args(){ cliente,nome,tipo, data_recadastro, vendedor }:PedidoArgs ){
        
        let param:PedidoArgs  = { cliente, nome, tipo ,data_recadastro, vendedor };

        let aux:Pedido[] = await this.selectPedidoRepository.findComplete( this.dbName, param );
        return aux[0];
    }

    @Mutation(()=>Pedido)
    async createPedido( @Arg('dados') dados:  InsertCompletePedidoInput ) {
        let aux = await this.insertPedidoRepository.create( this.dbName, dados)
        if( aux.codigo > 0 ){
            return dados;
        }else[
                new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Ocorreu um erro ao tentar registrar o pedido!" } })
            
        ]
    }


}
