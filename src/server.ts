import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import  path  from 'node:path'
import { ProdutoResolver } from "./resolvers/produto-resolver";
import { PedidoResolver } from "./resolvers/pedido-resolver";
import { ClienteResolver } from "./resolvers/cliente-resolver";
import { ServicoResolver } from "./resolvers/servico-resolver";
import { CategoriaResolver } from "./resolvers/categoria-resolver";
import { VeiculoResolver } from "./resolvers/veiculo-resolver";
import { FormaPagamentoResolver } from "./resolvers/forma-pagamento-resolver";
import { MarcaResolver } from "./resolvers/marca-resolver";
import { TiposOsResolver } from "./resolvers/tipos_os-resolver";


async function main(){
    const schema = await buildSchema({
        resolvers: [ ClienteResolver ,VeiculoResolver, ProdutoResolver, PedidoResolver, ServicoResolver, CategoriaResolver,FormaPagamentoResolver, MarcaResolver, TiposOsResolver],
        emitSchemaFile: path.resolve(__dirname, 'schema.gql')
    })
    
    const server = new ApolloServer({
            schema
    })

     const { url } = await server.listen()
    console.log(url);
}

main();