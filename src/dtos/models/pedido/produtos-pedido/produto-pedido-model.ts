import { Field, Float, Int, ObjectType } from "type-graphql";


@ObjectType()
export class ProdutoPedido{
    @Field()
    pedido:number

    @Field(()=>Int)
    codigo:number
    
    @Field(()=>Float)
    quantidade:number

    @Field(()=> Float)
    preco:number

    @Field(()=> Float)
    desconto:number
 
    @Field(()=> Float)
    total:number
    
    @Field({nullable:true})
    descricao:string
}