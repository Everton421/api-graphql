import { Args, ArgsType, Field } from "type-graphql";


@ArgsType() 
export class ServicoArgs{
    @Field({nullable:true} )
    codigo:number

    @Field({nullable:true})
    aplicacao:string

    @Field({nullable:true})
    data_recadastro:string

    @Field({nullable:true})
    ativo:string

}