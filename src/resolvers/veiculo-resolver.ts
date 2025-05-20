import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { Veiculo } from "../dtos/models/veiculo/veiculo-model";
import { VeiculoArgs } from "../dtos/args/veiculo-args";
import { VeiculoRepository } from "../repository/veiculo/veiculo-repository";
import { CreateVeiculoInput } from "../dtos/inputs/veiculo/create-veiculo-input";
import { DateService } from "../service/date-service";
import { UpdateServicoInput } from "../dtos/inputs/servico/update-servico-input";
import { UpdateVeiculoInput } from "../dtos/inputs/veiculo/update-veiculo-input";


@Resolver()
export class VeiculoResolver{
 
    repository = new VeiculoRepository();
    dateService = new DateService()

    @Query( ()=> [Veiculo])
    async veiculos(@Args(){ ano, ativo, cliente, codigo, combustivel, cor, data_cadastro, data_recadastro, id, marca, modelo, placa}: VeiculoArgs){
        let params = { ano, ativo, cliente, codigo, combustivel, cor, data_cadastro, data_recadastro, id, marca, modelo, placa}
            let result = await this.repository.findByParam(params);
        return result
    }

    @Query(()=>Veiculo)
    async veiculo(@Args(){ ano, ativo, cliente,codigo,combustivel,cor,data_cadastro,data_recadastro,id,marca,modelo,placa }:VeiculoArgs){
        let params = { ano, ativo, cliente, codigo, combustivel, cor, data_cadastro, data_recadastro, id, marca, modelo, placa}
            let arrVeiculos = await this.repository.findByParam(params);
            let resultVeiculo = arrVeiculos[0] 
        return resultVeiculo;
     }

    @Mutation(()=> Veiculo)
    async createVeiculo(@Arg('dados') dados:CreateVeiculoInput){
        dados.data_cadastro = this.dateService.obterDataAtual();
        dados.data_recadastro = this.dateService.obterDataHoraAtual();
            let result = await this.repository.insert(dados);

            if( result.insertId > 0 ){
                let dados = await this.repository.findByCode(result.insertId)
                return dados[0];
            }
        } 


    @Mutation(()=> Veiculo)
    async updateVeiculo(@Arg('dados') dados: UpdateVeiculoInput){

        dados.data_recadastro = this.dateService.obterDataHoraAtual();

            let resultUpdateVeic = await this.repository.update(dados)

                if(resultUpdateVeic.serverStatus > 0){
                    return await this.repository.findByCode(dados.codigo);
                } 
         }
        


}