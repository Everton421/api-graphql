import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Produto{
    
    @Field()
    codigo:number

    @Field()
    descricao:string

    @Field()
    preco:number
    
    @Field()
    id:number

    @Field()
    estoque:number
    
    @Field()
    grupo:number

    @Field()
    origem:string

    @Field()
    num_fabricante:string

    @Field()
    num_original:string

    @Field()
    ativo:string

    @Field()
    sku:string
    
    @Field()
    marca:number
  
    
    @Field()
    class_fiscal:string
    
    @Field()
    cst:string
    
    @Field()
    data_recadastro:string

    @Field()
    data_cadastro:string

    @Field()
    observacoes1:string
    
    @Field()
    observacoes2:string

    @Field()
    observacoes3:string
    
    @Field()
    tipo:number

}