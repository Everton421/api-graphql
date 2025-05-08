import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class ClienteArgs  {

    @Field(()=>Int, {nullable:true}) 
    codigo:number

    @Field({nullable:true})
    cnpj:string

    @Field({nullable:true})
    nome:string

    @Field({nullable:true})
    id: string;

    @Field({nullable:true, description:"S=sim, N=nao"})
    ativo: string;

    @Field(()=>Int,{nullable:true , description:"Código do Vendedor"})
    vendedor: number;

    @Field( {nullable:true})
    data_recadastro: string;
}