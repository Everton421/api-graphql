import { Field, Int, ObjectType } from "type-graphql";


@ObjectType()
export class Cliente {
    @Field(()=> Int)
    codigo:number
  
    @Field()
    id:string
    
    @Field({nullable:true})
    celular:string
    
    @Field()
    nome:string
    
    @Field()
    cep:string

    @Field({nullable:true})
    endereco:string
    
    @Field({nullable:true})
    ie:string

    @Field({nullable:true})
    numero:string
    
    @Field()
    cnpj:string

    @Field()
    ativo:string
    
    @Field({nullable:true})
    cidade:string
    
    @Field()
    data_cadastro:string
    
    @Field()
    data_recadastro:string

    @Field(()=>Int)
    vendedor:number

    @Field({nullable:true})
    bairro:string

    @Field({nullable:true})
    estado:string

}