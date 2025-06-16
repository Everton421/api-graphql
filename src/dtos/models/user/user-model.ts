import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class User{
 
     @Field()
      nome:string
     @Field(()=>Int)
      codigo:number
}