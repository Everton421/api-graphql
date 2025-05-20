import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class TiposOs{

    @Field(()=>Int)
    codigo:number

    @Field()
    descricao:string

    @Field(()=>Int, { nullable: true })
    id:number

    @Field({ nullable: true })
    ativo:string

    @Field({ nullable: true })
    data_cadastro:string
    
    @Field({ nullable: true })
    data_recadastro:string

}