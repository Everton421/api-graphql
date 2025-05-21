import { InsertPedidoInput } from "../../../dtos/inputs/pedido/pedido/insert-pedido-input";
import { InsertServicosPedidoInput } from "../../../dtos/inputs/pedido/servicos-pedido/insert-servicos-pedido-input";
import { Pedido } from "../../../dtos/models/pedido/pedido/pedido-model";
import { DateService } from "../../../service/date-service";
import { ClientePedidoRepository } from "../cliente/cliente-pedido";
import { ParcelasPedidoRepository } from "../parcelas-pedido/parcelas-pedido-repository";
import { ProdutosPedidoRepository } from "../produto-pedido/produtos-pedido-repository";
import { ServicoPedidoRepository } from "../servicos-pedido/servico-pedido-repository";

export class InsertPedidoRepository{
        
        dateService = new DateService()
    
        produtosPedidoRepository = new ProdutosPedidoRepository();
        servicosPedidoRepository = new   ServicoPedidoRepository(); 
        clientePedidoReposotory = new ClientePedidoRepository();
        parcelasRepository = new ParcelasPedidoRepository();


            async insert( empresa:string, pedido:InsertPedidoInput){
            return new Promise( async(resolve, reject)=>{
            
                let sql = `INSERT INTO 
                    ${empresa}.pedidos 
                    ( codigo ,  id ,  vendedor , situacao, contato ,  descontos ,  forma_pagamento ,  quantidade_parcelas ,  total_geral ,  total_produtos ,  total_servicos ,  cliente ,  veiculo ,  data_cadastro ,  data_recadastro ,  tipo_os ,  enviado, tipo, observacoes)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )   `

                const values =  [pedido.codigo ,  pedido.id ,  pedido.vendedor ,  pedido.situacao, pedido.contato,  pedido.descontos ,  pedido.forma_pagamento ,  pedido.quantidade_parcelas ,  pedido.total_geral ,  pedido.total_produtos ,  pedido.total_servicos ,  pedido.cliente.codigo,  veiculo ,  data_cadastro ,  data_recadastro ,  tipo_os ,  enviado, tipo, observacoes ] 


                    })

            }


        async create(){
                const dataAtal = this.dateService.obterDataAtual();

                    const servicos  = pedido.servicos
                    const produtos = pedido.produtos
                    const parcelas = pedido.parcelas

        }


}