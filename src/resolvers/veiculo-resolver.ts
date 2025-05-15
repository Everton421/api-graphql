import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { Veiculo } from "../dtos/models/veiculo/veiculo-model";
import { VeiculoArgs } from "../dtos/args/veiculo-args";
import { VeiculoRepository } from "../repository/veiculo/veiculo-repository";
import { CreateVeiculoInput } from "../dtos/inputs/veiculo/create-veiculo-input";


@Resolver()
export class VeiculoResolver{
 
    repository = new VeiculoRepository();

    @Query( ()=> [Veiculo])
    async veiculos(@Args(){ ano, ativo, cliente, codigo, combustivel, cor, data_cadastro, data_recadastro, id, marca, modelo, placa}: VeiculoArgs){
         
        let params = { ano, ativo, cliente, codigo, combustivel, cor, data_cadastro, data_recadastro, id, marca, modelo, placa}

            let result = this.repository.findByParam(params);
        return result
 
    }

@Mutation(()=> Veiculo)
async createVeiculo(@Arg('dados') dados:CreateVeiculoInput){
         let result = await this.repository.insert(dados);

        if( result.insertId > 0 ){
            let dados = await this.repository.findByCode(result.insertId)
            return dados[0];
        }
}   
    


}