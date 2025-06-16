import { Field, ObjectType } from "type-graphql";
import { User } from "../user/user-model";

@ObjectType() 
export class Login{

    @Field()
    token:string

  @Field( ()=> User, { nullable:true})
    user:User


}