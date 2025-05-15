

import {  Field, InputType, Int } from "type-graphql";

@InputType()
export class UpdateVeiculoInput  {

    @Field(() => Int, { nullable:true} )
    codigo: number
    
    @Field(() => Int, { nullable:true} )
    id: number
    
    @Field(() => Int,{ nullable:true})
    cliente: string
    
    @Field({ nullable:true})
    placa: string
    
    @Field({ nullable:true})
    marca: string
    
    @Field({ nullable:true})
    modelo: string
    
    @Field({ nullable:true})
    ano: string
    
    @Field({ nullable:true})
    cor: string
    
    @Field({ nullable:true})
    combustivel: string

    @Field({ nullable: true })
    data_cadastro: string

    @Field({ nullable: true })
    data_recadastro: string

    @Field({ nullable:true})
    ativo: string


}
