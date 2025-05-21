import { Args, Query, Resolver } from "type-graphql";
import { Pedido } from "../dtos/models/pedido/pedido/pedido-model";
import { ProdutoPedido } from "../dtos/models/pedido/produtos-pedido/produto-pedido-model";
import { ServicoPedido } from "../dtos/models/pedido/servicos-pedido/servico-pedido-model";
import { SelectPedidoRepository } from "../repository/pedido/pedido/select-pedido-repository";
import { PedidoArgs } from "../dtos/args/pedido-args";


@Resolver(()=> Pedido)
export class PedidoResolver{
    
    pedidoRepository = new SelectPedidoRepository();
    dbName = `\`${57473685000100}\``;

    @Query( ()=>[Pedido] )
    async getPedidos(@Args(){ cliente,  nome,tipo, data_recadastro, vendedor }:PedidoArgs){

          let param:PedidoArgs  = { cliente, nome, tipo ,data_recadastro, vendedor };

        let aux:Pedido[] = await this.pedidoRepository.findComplete( this.dbName ,param );
        return aux;
    }
   
    @Query( ()=>Pedido )

    async getPedido(@Args(){ cliente,nome,tipo, data_recadastro, vendedor }:PedidoArgs ){
        
        let param:PedidoArgs  = { cliente, nome, tipo ,data_recadastro, vendedor };

        let aux:Pedido[] = await this.pedidoRepository.findComplete( this.dbName, param );
        return aux[0];
    }


}
