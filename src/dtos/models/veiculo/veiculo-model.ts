import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Veiculo{
    @Field(()=> Int)   
    codigo:number

    @Field(()=> Int)   
    id:number

    @Field(()=> Int)   
    cliente:number
    
    @Field()   
    placa:string

    @Field()   
    marca:string

    @Field()   
    modelo:string
    
    @Field()   
    ano:string
    
    @Field()   
    cor:string
    
    @Field()   
    combustivel:string
    
    @Field()   
    data_cadastro:string
    
    @Field()   
    data_recadastro:string
    
    @Field()   
    ativo:string


}