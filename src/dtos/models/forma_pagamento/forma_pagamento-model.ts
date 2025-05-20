import { Field, Int, ObjectType } from "type-graphql";


@ObjectType()
export class FormaPagamento{

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

     @Field()
     data_recadastro:string

     @Field()
     ativo:string

}