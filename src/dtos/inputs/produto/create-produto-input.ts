import { Field, InputType, Int } from "type-graphql";


@InputType({ description:"Dados para a criação de um produto"})
export class CreateProdutoInput{

    @Field(()=> Int, { nullable:true })
    codigo:number

    @Field()
    descricao:string

    @Field()
    preco:number
    
    @Field(()=> Int, { nullable:true})
    id:number

    @Field(()=> Int, { nullable:true})
    estoque:number
    
    @Field(()=> Int, { nullable:true})
    grupo:number

    @Field({nullable:true})
    origem:string

    @Field({nullable:true})
    num_fabricante:string

    @Field({nullable:true})
    num_original:string

    @Field({ nullable:true })
    ativo:string

    @Field({ nullable:true })
    sku:string
    
    @Field(()=> Int, { nullable:true })
    marca:number
    
    @Field({ nullable:true })
    class_fiscal:string
   
    @Field({ nullable:true })
    cst:string
    
    @Field({ nullable:true })
    data_recadastro:string

    @Field({ nullable:true })
    data_cadastro:string

    @Field({ nullable:true })
    observacoes1:string
    
    @Field({ nullable:true })
    observacoes2:string

    @Field({ nullable:true })
    observacoes3:string

    @Field({ nullable:true })
    tipo:number
}