import { ArgsType, Field,    Int } from "type-graphql";

@ArgsType()
export class FormaPagamentoArgs {
    
  @Field(()=>Int)
     codigo:number
     
     @Field(()=>Int)
     id:number

     @Field()
     descricao:string

     @Field(()=>Int)
     desc_maximo:number

     @Field(()=>Int)
     parcelas:number

     @Field(()=>Int)
     intervalo:number

     @Field(()=>Int)
     recebimento:number

     @Field()
     data_cadastro:string

     @Field(()=>Int)
     data_recadastro:string

     @Field(()=>Int)
     ativo:string

}