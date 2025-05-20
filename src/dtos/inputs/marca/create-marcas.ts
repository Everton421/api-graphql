import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CreateMarcasInput{

    @Field(()=> Int, {nullable:true})
    id:number

    @Field()
    descricao:string

    @Field({ nullable:true })
    data_cadastro:string

    @Field({ nullable:true })
    data_recadastro:string

    @Field({ nullable:true })
     ativo:string
}