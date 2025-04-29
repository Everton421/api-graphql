import { Query, Resolver } from "type-graphql";

@Resolver()
export class TesteResolver{

    @Query(()=> String)
    async teste(){
        return "teste" 

    }
}