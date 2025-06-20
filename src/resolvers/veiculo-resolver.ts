import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Veiculo } from "../dtos/models/veiculo/veiculo-model";
import { VeiculoArgs } from "../dtos/args/veiculo-args";
import { VeiculoRepository } from "../repository/veiculo/veiculo-repository";
import { CreateVeiculoInput } from "../dtos/inputs/veiculo/create-veiculo-input";
import { DateService } from "../service/date-service";
import { UpdateServicoInput } from "../dtos/inputs/servico/update-servico-input";
import { UpdateVeiculoInput } from "../dtos/inputs/veiculo/update-veiculo-input";
import { GraphQLError } from "graphql";
import { TokenService } from "../service/token-service";


@Resolver()
export class VeiculoResolver{
 
    repository = new VeiculoRepository();
    dateService = new DateService()
    tokenService = new TokenService();

    @Query( ()=> [Veiculo])
    async veiculos(@Args(){ ano, ativo, cliente, codigo, combustivel, cor, data_cadastro, data_recadastro, id, marca, modelo, placa}: VeiculoArgs, @Ctx() context:any){
        let params = { ano, ativo, cliente, codigo, combustivel, cor, data_cadastro, data_recadastro, id, marca, modelo, placa}
    
                  if(  !context.req.headers.token  ){
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                      } 
                     let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                     if(decoded.erro || decoded.payload === undefined) {
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                     }  

                        let cnpj = decoded.payload?.cnpj;
                     let db =   `\`${cnpj}\``

        let result = await this.repository.findByParam(params, db);
        return result
    }

    @Query(()=>Veiculo)
    async veiculo(@Args(){ ano, ativo, cliente,codigo,combustivel,cor,data_cadastro,data_recadastro,id,marca,modelo,placa }:VeiculoArgs, @Ctx() context:any){
        let params = { ano, ativo, cliente, codigo, combustivel, cor, data_cadastro, data_recadastro, id, marca, modelo, placa}
                  if(  !context.req.headers.token  ){
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                      } 
                     let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                     if(decoded.erro || decoded.payload === undefined) {
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                     }  

                        let cnpj = decoded.payload?.cnpj;
                     let db =   `\`${cnpj}\``
      
        let arrVeiculos = await this.repository.findByParam(params,db);
            let resultVeiculo = arrVeiculos[0] 
        return resultVeiculo;
     }

    @Mutation(()=> Veiculo)
    async createVeiculo(@Arg('dados') dados:CreateVeiculoInput, @Ctx() context:any){

               if(  !context.req.headers.token  ){
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                      } 
                     let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                     if(decoded.erro || decoded.payload === undefined) {
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                     }  

                        let cnpj = decoded.payload?.cnpj;
                     let db =   `\`${cnpj}\``
         
        dados.data_cadastro = this.dateService.obterDataAtual();
        dados.data_recadastro = this.dateService.obterDataHoraAtual();
            let result = await this.repository.insert(dados, db);

            if( result.insertId > 0 ){
                let dados = await this.repository.findByCode(result.insertId,db)
                return dados[0];
            }
        } 


    @Mutation(()=> Veiculo)
    async updateVeiculo(@Arg('dados') dados: UpdateVeiculoInput, @Ctx() context:any){

            if(  !context.req.headers.token  ){
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Token nao informado!" } })
                      } 
                     let decoded = await this.tokenService.DecodedToken(context.req.headers.token  );

                     if(decoded.erro || decoded.payload === undefined) {
                          return new GraphQLError('Erro', { extensions: { code: " CUSTOM_ERROR ", message: "Erro ao processar o token!" } })
                     }  

                        let cnpj = decoded.payload?.cnpj;
                     let db =   `\`${cnpj}\``

        dados.data_recadastro = this.dateService.obterDataHoraAtual();

            let resultUpdateVeic = await this.repository.update(dados, db)

                if(resultUpdateVeic.serverStatus > 0){
                    let aux = await this.repository.findByCode(dados.codigo, db);
                     
                return aux[0];
                } 
         }
        


}