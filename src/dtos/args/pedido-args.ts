import { ArgsType, Field, Int } from "type-graphql";


@ArgsType()
export class PedidoArgs{

        @Field (   {  nullable:true, description: " Filtra os Pedido igual ou após esta data "})
        data_recadastro:string

        @Field( ()=>Int,  {nullable:true}  )
        vendedor:number

        @Field(()=> Int, { nullable:true, description: " Codigo do Cliente Vinculado ao Pedido"})
        cliente:number

        @Field(  { nullable:true, description: " Codigo do referente ao tipo de pedido Codigo 1: Pedido de Venda - Codigo 3: Órdem de Servico  "})
        tipo:number

        @Field( { nullable:true, description:" Consulta o Pedido com base no nome do cliente"} )
        nome:string

        
}