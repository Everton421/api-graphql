

import {  Field, InputType, Int } from "type-graphql";

@InputType()
export class CreateVeiculoInput  {

   
    
    @Field(() => Int )
    id: number
    
    @Field(() => Int )
    cliente: string
    
    @Field()
    placa: string
    
    @Field()
    marca: string
    
    @Field()
    modelo: string
    
    @Field()
    ano: string
    
    @Field()
    cor: string
    
    @Field()
    combustivel: string

    @Field({ nullable: true })
    data_cadastro: string

    @Field({ nullable: true })
    data_recadastro: string

    @Field()
    ativo: string


}
