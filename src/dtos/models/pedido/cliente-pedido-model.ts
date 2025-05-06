import { Field, Int, ObjectType } from "type-graphql";



@ObjectType()
export class ClientePedido{
    @Field(()=> Int)
    codigo:number

    @Field()
    nome:string
}