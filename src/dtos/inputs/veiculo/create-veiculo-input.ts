

import {  Field, InputType, Int } from "type-graphql";

@InputType()
export class CreateVeiculoInput  {

   
    
    @Field(() => Int, { nullable: true })
    id: number
    
    @Field(() => Int )
    cliente: string
    
    @Field()
    placa: string
    
    @Field({ nullable: true })
    marca: string
    
    @Field({ nullable: true })
    modelo: string
    
    @Field({ nullable: true })
    ano: string
    
    @Field({ nullable: true })
    cor: string
    
    @Field({ nullable: true })
    combustivel: string

    @Field({ nullable: true })
    data_cadastro: string

    @Field({ nullable: true })
    data_recadastro: string

    @Field({ nullable: true })
    ativo: string


}
