import { Field, InputType, Int } from "type-graphql"


@InputType()

export class ClientePedidoInput{
    @Field(()=> Int)
    codigo:number

    @Field({ nullable:true })
    nome:string
}