import { Field, InputType, Int } from "type-graphql";


@InputType({ description:"dados para a criação de um produto"})
export class CreateProdutoInput{

    @Field(()=> Int)
    codigo:number

    @Field()
    descricao:string

    @Field()
    preco:number
    
    @Field()
    id:number

    @Field()
    estoque:number
    
    @Field(()=> Int)
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
    
    @Field(()=> Int)
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