import { Field, Float, ObjectType } from "type-graphql";


@ObjectType()
export class Servico{
    
    @Field()
    codigo:number
    
    @Field()
    id:number

    @Field(()=>Float)
    valor:number
    
    @Field()
    aplicacao:string
    
    @Field()
    tipo_serv:number
    
    @Field()
    data_cadastro:string

    @Field()
    data_recadastro:string

    @Field({description: "S=ativo N=inativo"})
    ativo:string


}