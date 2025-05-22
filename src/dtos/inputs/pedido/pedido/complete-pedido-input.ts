import { Field, InputType, Int } from "type-graphql"
import { ClientePedido } from "../../../models/pedido/cliente/clientePedido-model"
import { InsertProdutosPedidoInput } from "../produtos-pedido/insert-produtos-pedido-input"
import { InsertServicosPedidoInput } from "../servicos-pedido/insert-servicos-pedido-input"
import { InsertParcelasPedidoInput } from "../parcelas/insert-parcelas-pedido-input"
import { ClientePedidoInput } from "../cliente-pedido/cliente-pedido-input"



@InputType()
export class InsertCompletePedidoInput {


   @Field()
   codigo: number

   @Field(() => Int, { nullable: true })
   id: number

   @Field(() => Int)
   vendedor: number

   @Field()
   situacao: string

   @Field()
   contato: string

   @Field()
   descontos: number

   @Field()
   forma_pagamento: number

   @Field(() => Int)
   quantidade_parcelas: number

   @Field()
   total_geral: number

   @Field()
   total_produtos: number

   @Field()
   total_servicos: number

  
   @Field(() => Int)
   veiculo: number

   @Field()
   data_cadastro: string

   @Field()
   data_recadastro: string

   @Field(() => Int)
   tipo_os: number

   @Field()
   enviado: string

   @Field(() => Int)
   tipo: number

   @Field()
   observacoes: string

   @Field(()=> [InsertProdutosPedidoInput] ,{ nullable:true})
   produtos:InsertProdutosPedidoInput[]

   @Field(()=> [InsertServicosPedidoInput], { nullable:true} )
   servicos:InsertServicosPedidoInput[]

   @Field(()=> [InsertParcelasPedidoInput] , { nullable:true})
    parcelas:InsertParcelasPedidoInput[]

  @Field(() => ClientePedidoInput)
   cliente:  ClientePedidoInput


}
