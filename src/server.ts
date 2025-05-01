import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import  path  from 'node:path'
import { TesteResolver } from "./resolvers/teste-resolver";
import { ProdutoResolver } from "./resolvers/produto-resolver";
import { PedidoResolver } from "./resolvers/pedido-resolver";


async function main(){
    const schema = await buildSchema({
        resolvers: [ TesteResolver , ProdutoResolver, PedidoResolver],
        emitSchemaFile: path.resolve(__dirname, 'schema.gql')
    })
    
    const server = new ApolloServer({
            schema
    })

     const { url } = await server.listen()
    console.log(url);
}

main();