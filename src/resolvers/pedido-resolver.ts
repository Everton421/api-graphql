import { Query, Resolver } from "type-graphql";
import { Pedido } from "../dtos/models/pedido/pedido/pedido-model";


@Resolver(()=> Pedido)
export class PedidoResolver{
    
    pedidoFic: Pedido  =
     {
        cliente:{ codigo:1, nome:'cliente teste'},
        codigo:52156,
        produtos: [ { codigo:1, preco:10.0, quantidade:1}],
         data_cadastro:'',
         data_recadastro:'',
         descontos:0,
         vendedor:1,
         contato:'',
         enviado:'S',
         forma_pagamento:1,
         id:0,
         quantidade_parcelas:1,
         total_produtos:0,
         total_servicos:0,
         observacoes:'',
         situacao:'',
         tipo:1,
         tipo_os:1,
         total_geral:0,
         veiculo:0
    } 
    @Query( ()=>Pedido)
    async getPedidos( ){
        return this.pedidoFic;
    }
}
