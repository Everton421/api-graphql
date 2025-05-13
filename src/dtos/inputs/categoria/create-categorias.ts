import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CreateCategoriaInput{

    @Field(()=> Int, {nullable:true})
    id:number

    @Field({ nullable:true })
    descricao:string

    @Field({ nullable:true })
    data_cadastro:string

    @Field({ nullable:true })
    data_recadastro:string

    @Field({ nullable:true })
     ativo:string
}