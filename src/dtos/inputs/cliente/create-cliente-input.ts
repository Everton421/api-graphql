import { Field, InputType, Int } from "type-graphql";

@InputType({ description: " Dados para a criação de um cliente" })

export class CreateClienteInput {



    @Field(() => Int)
    id: number

    @Field({ nullable: true })
    celular: string

    @Field()
    nome: string
    
    @Field({ nullable: true })
    cep: string

    @Field({ nullable: true })
    endereco: string

    @Field({ nullable: true })
    ie: string

    @Field({ nullable: true })
    numero: string

    @Field()
    cnpj: string

    @Field({ nullable: true })
    ativo: string

    @Field({ nullable: true })
    cidade: string

    @Field({ nullable: true })
    data_cadastro: string

    @Field({ nullable: true })
    data_recadastro: string

    @Field(() => Int)
    vendedor: number

    @Field({ nullable: true })
    bairro: string

      @Field({ nullable: true })
    estado: string
}
