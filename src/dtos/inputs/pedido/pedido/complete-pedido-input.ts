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

   @Field({ nullable:true})
   situacao: string

   @Field({ nullable:true})
   contato: string

   @Field({ nullable:true})
   descontos: number

   @Field({ nullable:true})
   forma_pagamento: number

   @Field(() => Int)
   quantidade_parcelas: number

   @Field({ nullable:true})
   total_geral: number

   @Field({ nullable:true})
   total_produtos: number

   @Field({ nullable:true})
   total_servicos: number
  
   @Field(() => Int,{ nullable:true})
   veiculo: number

   @Field({ nullable:true})
   data_cadastro: string

   @Field({ nullable:true})
   data_recadastro: string

   @Field(() => Int,{ nullable:true})
   tipo_os: number

   @Field({ nullable:true})
   enviado: string

   @Field(() => Int, { nullable:true})
   tipo: number

   @Field({ nullable:true})
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
