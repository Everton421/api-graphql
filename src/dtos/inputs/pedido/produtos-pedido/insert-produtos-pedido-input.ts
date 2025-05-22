    import { Field, Float, InputType, Int, ObjectType } from "type-graphql";


    @InputType()
export class InsertProdutosPedidoInput{
    
    
        @Field()
        pedido:number

        @Field(()=>Int)
         codigo:number
         
         @Field(()=>Int)
         quantidade:number

        @Field(()=> Float)
         desconto:number

         @Field(()=> Float)
         preco:number
    
        @Field(()=> Float)
         total:number
         @Field( { nullable:true } )
         descricao:string
        
}