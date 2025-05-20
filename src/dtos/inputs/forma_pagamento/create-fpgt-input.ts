import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CreateFormaPagamentoInput {
     
   @Field(()=>Int,{ nullable: true})
     id:number

     @Field()
     descricao:string

     @Field(()=>Int,{ nullable: true})
     desc_maximo:number

     @Field(()=>Int)
     parcelas:number

     @Field(()=>Int)
     intervalo:number

     @Field(()=>Int,{ nullable: true})
     recebimento:number

     @Field( { nullable: true})
     data_cadastro:string

     @Field ({ nullable: true})
     data_recadastro:string

     @Field( { nullable: true})
     ativo:string

}