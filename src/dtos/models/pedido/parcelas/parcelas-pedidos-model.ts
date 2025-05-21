import { Field, Float, ObjectType } from "type-graphql";

@ObjectType()

export class ParcelasPedido{

    @Field()
    pedido:number
    
    @Field()
    parcela:number
    
    @Field(()=>Float)
    valor:number

    @Field()
    vencimento:string

}