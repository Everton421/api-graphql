import { Field, Int, ObjectType } from "type-graphql";


@ObjectType()
export class Cliente {
    @Field(()=> Int)
    codigo:number
  
    @Field()
    id:string
    
    @Field()
    celular:string
    
    @Field()
    nome:string
    
    @Field()
    cep:string

    @Field()
    endereco:string
    
    @Field()
    ie:string

    @Field()
    numero:string
    
    @Field()
    cnpj:string

    @Field()
    ativo:string
    
    @Field()
    cidade:string
    
    @Field()
    data_cadastro:string
    
    @Field()
    data_recadastro:string

    @Field(()=>Int)
    vendedor:number

    @Field()
    bairro:string

    @Field()
    estado:string

}