import { ArgsType, Field, Int } from "type-graphql";


@ArgsType()
export class CategoriaArgs{
    
    @Field(()=>Int, { nullable:true })
    codigo:number
    
    @Field(()=> Int,  { nullable:true })
    id:number

    @Field(  { nullable:true })
    descricao:string
    
    @Field(  { nullable:true })
    ativo:string

    @Field( { nullable:true })
    data_cadastro:string

    @Field( { nullable:true })
    data_recadastro:string

}