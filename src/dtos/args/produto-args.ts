import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class ProdutoArgs{

 @Field( type => Int, {nullable:true})
 codigo:number

 @Field({nullable:true})
 descricao:string

 @Field(type => Int, {nullable:true})
 marca:number

 @Field(type => Int, {nullable:true})
 grupo:number

 @Field({nullable:true})
 origem:string

 @Field({nullable:true})
 num_fabricante:string

 @Field({nullable:true})
 num_original:string

 @Field({nullable:true})
 ativo:string

 @Field({nullable:true})
 sku:string

}