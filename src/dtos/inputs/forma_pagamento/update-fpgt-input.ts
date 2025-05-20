import { Field, InputType, Int } from "type-graphql";

@InputType()
export class UpdateFormaPagamentoInput {

      @Field()
     codigo:number
     
      @Field(()=>Int,{ nullable: true})
     id:number

     @Field({ nullable: true})
     descricao:string

     @Field(()=>Int,{ nullable: true})
     desc_maximo:number

     @Field(()=>Int, { nullable: true})
     parcelas:number

     @Field(()=>Int,{ nullable: true})
     intervalo:number

     @Field(()=>Int,{ nullable: true})
     recebimento:number

     @Field({ nullable: true}) 
     data_cadastro:string

     @Field({ nullable: true}) 
     data_recadastro:string

     @Field( { nullable: true}) 
     ativo:string

}