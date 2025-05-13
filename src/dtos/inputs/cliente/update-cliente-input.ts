import { Field, InputType, Int } from "type-graphql";

@InputType()
export class UpdateClienteInput{
    @Field(() => Int, { nullable: true })
    codigo:number

    @Field(() => Int, { nullable: true })
     id: number
 
     @Field({ nullable: true })
     celular: string
 
     @Field({ nullable: true })
     nome: string
     
     @Field({ nullable: true })
     cep: string
 
     @Field({ nullable: true })
     endereco: string
 
     @Field({ nullable: true })
     ie: string
 
     @Field({ nullable: true })
     numero: string
 
     @Field({ nullable: true })
     cnpj: string
 
     @Field({ nullable: true })
     ativo: string
 
     @Field({ nullable: true })
     cidade: string
 
     @Field({ nullable: true })
     data_cadastro: string
 
     @Field({ nullable: true })
     data_recadastro: string
 
     @Field(() => Int,{ nullable: true })
     vendedor: number
 
     @Field({ nullable: true })
     bairro: string
 
       @Field({ nullable: true })
     estado: string
}