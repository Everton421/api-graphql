import { Field, Float, Int, ObjectType } from "type-graphql";


@ObjectType()
export class produtoPedido{
    @Field(()=>Int)
    codigo:number
    
    @Field(()=>Float)
    quantidade:number

    @Field(()=> Float)
    preco:number
}