    import { Field, Float, InputType, Int, ObjectType } from "type-graphql";


    @InputType()
export class InsertParcelasPedidoInput{
    
    
        @Field()
        pedido:number

        @Field(()=>Int)
         parcela:number
         
         @Field(()=> Float)
         valor:number
     
        @Field()
         vencimento:string
        
}