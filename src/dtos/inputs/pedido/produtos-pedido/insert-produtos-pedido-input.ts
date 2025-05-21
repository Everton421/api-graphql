    import { Field, Float, InputType, Int, ObjectType } from "type-graphql";


    @InputType()
export class InsertProdutosPedidoInput{
    
    
        @Field()
        pedido:number

        @Field(()=>Int)
         codigo:number
         
        @Field(()=> Float)
         desconto:number

        @Field(()=>Int)
         quantidade:number

         @Field(()=> Float)
         preco:number
    
     
        @Field(()=> Float)
         total:number
        
}