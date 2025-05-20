import { Query, Resolver } from "type-graphql";
import { Pedido } from "../dtos/models/pedido/pedido/pedido-model";
import { ProdutoPedido } from "../dtos/models/pedido/produtos-pedido/produto-pedido-model";
import { ServicoPedido } from "../dtos/models/pedido/servicos-pedido/servico-pedido-model";


@Resolver(()=> Pedido)
export class PedidoResolver{
    
    arrProduto:ProdutoPedido[] = [
        {
            codigo:1,
            preco:10.5,
            quantidade:2,
            desconto:0,
            descricao:"teste",
            total:10
        }
    ]
    arrServico:ServicoPedido[] =[
            {
                aplicacao:"teste",   
                codigo:1,
                valor:10,
                desconto:0,
                quantidade:1,
                total:10
            }
        ]

    pedidoFic: Pedido  =
     {
        cliente:{ codigo:1, nome:'cliente teste'},
        codigo:52156,
        produtos:  this.arrProduto ,
        servicos: this.arrServico,
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
