import { Field, InputType, Int } from "type-graphql"
import { ClientePedido } from "../../../models/pedido/cliente/clientePedido-model"



@InputType()
export class InsertPedidoInput {


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

   @Field(() => ClientePedido)
   cliente: ClientePedido


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


}
