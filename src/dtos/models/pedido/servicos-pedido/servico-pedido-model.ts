import { Field, Float, Int, ObjectType } from "type-graphql";

@ObjectType()
export class ServicoPedido{
      @Field()
        pedido:number

      @Field(()=>Int)
      codigo:number
      
      @Field(()=>Float)
      quantidade:number
  
      @Field(()=> Float)
      valor:number
  
      @Field(()=> Float)
      desconto:number
   
      @Field(()=> Float)
      total:number
      
      @Field()
      aplicacao:string


}