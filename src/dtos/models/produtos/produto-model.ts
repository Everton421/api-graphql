import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Produto{
    
    @Field({nullable:true})
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

    
    @Field({nullable:true})
    num_fabricante:string

    @Field({nullable:true})
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

    @Field({nullable:true})
    observacoes1:string
    
    @Field({nullable:true})
    observacoes2:string

    @Field({nullable:true})
    observacoes3:string
    
    @Field()
    tipo:number

}