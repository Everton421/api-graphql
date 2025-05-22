import { conn } from "../../../database/dataBaseConfig";
import { InsertServicosPedidoInput } from "../../../dtos/inputs/pedido/servicos-pedido/insert-servicos-pedido-input";

  export class ServicoPedidoRepository{

   
        async   findServices( empresa:any,codigo: number) {
            return new Promise(   (resolve, reject) => {
                const sql = ` select 
                sp.*, s.aplicacao  from ${empresa}.servicos_pedido sp 
                join ${empresa}.servicos s on s.codigo = sp.codigo
                where sp.pedido = ? `
                conn.query(sql, [codigo],   (err:any, result:any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
        }
   
        
    async insert(  empresa:any,servicos:InsertServicosPedidoInput[],  ){
         
        return new Promise(   (resolve, reject )=>{
  
            if (servicos.length > 0) {
              let i=1;
              for(let s of servicos){
                  let {
                    pedido,
                      codigo,
                      valor,
                      quantidade,
                      desconto,
                      total,
                  } = s
    
                   if( !valor) valor = 0;
                   if( !quantidade) quantidade = 0;
                   if( !desconto) desconto = 0;
                   if( !total) total = 0;
     
                const sql =  ` INSERT INTO    ${empresa}.servicos_pedido  ( pedido ,  codigo ,  desconto ,  quantidade ,  valor ,  total ) VALUES ( ?, ?, ?, ?, ?, ?)   `;
  
                  let dados = [ pedido ,  codigo ,  desconto ,  quantidade ,  valor ,  total  ]
                  conn.query( sql,dados ,(error:any, resultado:any)=>{
                     if(error){
                      console.log(" erro ao inserir servico do orcamento "+ error)
                             reject(" erro ao inserir servico do orcamento "+ error);
                     }else{
                      resolve(resultado)
                         console.log(`servico  inserido com sucesso`);
                     }
                  })
    
                  if(i === servicos.length){
                      return;
                  }
                  i++;
            
            } 
        }
          })
  }

  }
