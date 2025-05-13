import { FieldPacket, QueryError } from "mysql2";
import { conn } from "../../database/dataBaseConfig";
import { ServicoArgs } from "../../dtos/args/servico-args";
import { Servico } from "../../dtos/models/servicos/servico-model";
import { CreateServicoInput } from "../../dtos/inputs/servico/create-servico-input";  
import { UpdateProdutoInput } from "../../dtos/inputs/produto/update-produto-input";
import { UpdateServicoInput } from "../../dtos/inputs/servico/update-servico-input";
import { DateService } from "../../service/date-service";

type ResultSetHeader = {
     fieldCount: number,
    affectedRows: number,
    insertId: number,
    info: any,
    serverStatus: number,
    warningStatus: number,
    changedRows: number
}

export class ServicoRepository{

    dbName = `\`${57473685000100}\``;
    dateService = new DateService();
     

    async findAll():Promise <Servico[]> {
        return new Promise((resolve, reject )=>{

            const sql = `
            select 
            *,
            DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT ( data_recadastro, '%Y-%m-%d %H:%m:%s') AS data_recadastro    
            from 
            ${this.dbName}.servicos
            `
            conn.query(sql, ( err:any, result:Servico[] )=>{
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    }

    async findByCode( codigo:number ):Promise<Servico[]> {
        return new Promise((resolve, reject )=>{

            const sql = `
            select 
            *,
            DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT ( data_recadastro, '%Y-%m-%d %H:%m:%s') AS data_recadastro    
            from 
            ${this.dbName}.servicos where codigo = ? 
            `
            conn.query(sql, codigo, ( err, result:any )=>{
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    }

    async findByParam( param:Partial<ServicoArgs> ): Promise <Servico[]> {
        return new Promise((resolve,reject ) =>{

            const sql = 
            `
            SELECT *, 
            DATE_FORMAT( data_cadastro, '%Y-%m-%d %H-%m-%s') as data_cadastro,
            DATE_FORMAT( data_recadastro, '%Y-%m-%d %H:%m:%s') as data_recadastro  
            FROM ${ this.dbName }.servicos 
            `

            let conditions = [];
            let valueParamSql = [];

            if( param.codigo){
                conditions.push( " codigo = ? ")
                valueParamSql.push(param.codigo)
            }

            if( param.aplicacao ){
                conditions.push( " aplicacao like ? ");
                valueParamSql.push( `%${param.aplicacao}%`);
            }
            if(param.ativo){
                conditions.push(" ativo = ? ");
                valueParamSql.push(param.ativo);    
            }
            if(param.data_recadastro){
                conditions.push(" data_recadastro > ? ")
                valueParamSql.push(param.data_recadastro)
            }

            let whereClause = "";
            if( valueParamSql.length > 0 ){
                whereClause = ' WHERE '+conditions.join(" AND ")
            }

            let finalSql = sql + whereClause

                conn.query(finalSql, valueParamSql, ( err  ,result:any  )=>{
                    if(err){
                        console.log("Erro ao tentar consultar os Serviços")
                        reject(err)
                    }else{
                        resolve(result)
                    }
                })

        })
    }


 

    async insert ( servico:CreateServicoInput): Promise<ResultSetHeader>{

       return new Promise(   ( resolve, reject)=>{
            let {
             
                valor,
                aplicacao,
                tipo_serv,
                data_cadastro,
                data_recadastro,
                ativo
                    } = servico

                const sql =` INSERT INTO  ${this.dbName}.servicos  
                             (
                            valor ,
                            aplicacao,
                            tipo_serv,
                            data_cadastro,
                            data_recadastro, 
                            ativo
                                ) VALUES (
                                      ? ,
                                      ? ,
                                      ? ,
                                      ? ,
                                      ? ,
                                      ?  
                                   )
                            `;

                let dados = [  valor, aplicacao, tipo_serv, data_cadastro, data_recadastro, ativo] 
                              conn.query(sql,dados,   (err:any, result:ResultSetHeader | any )=>{
                                if(err){
                                     console.log(err)
                                     reject(err);
                                }else{
                                    console.log(`servico cadastrado com sucesso `)
                                    console.log(result)
                                     resolve(result);
                                }
                            })
                        })
        }

 async update(   servico:UpdateServicoInput ):Promise<ResultSetHeader>{
  
  
       
  
        return new Promise(  ( resolve, reject)=>{
          
              let sql = `UPDATE ${ this.dbName}.servicos SET `
       
            let paramSql = []
            let valueSql =[]

            if( servico.aplicacao){
                paramSql.push(" aplicacao = ? ");
                valueSql.push(servico.aplicacao);
            }

            if( servico.ativo){
                paramSql.push(" ativo = ? ")
                valueSql.push(servico.ativo)
            }

            if( servico.valor){
                paramSql.push(" valor = ? ")
                valueSql.push(servico.valor)
            }
            if(servico.tipo_serv){
                paramSql.push(" tipo_serv = ? ")
                valueSql.push(servico.tipo_serv)
            }
            if(servico.id){
                paramSql.push(" id = ? ")
                valueSql.push(servico.id)
            }
            if(servico.data_cadastro){
                paramSql.push(" data_cadastro = ? ")
                valueSql.push(servico.data_cadastro)
            }
                paramSql.push(" data_recadastro = ? ")
                valueSql.push( this.dateService.obterDataHoraAtual())
           
            valueSql.push(servico.codigo)

            paramSql.join(" , ")


            let finalSql = sql + paramSql + " WHERE codigo = ? "    
           // console.log("SQL : ", finalSql);
           // console.log("Values:", valueSql);

              conn.query(finalSql, valueSql, (err:any, result:ResultSetHeader | any )=>{
                if(err){
                    console.log(err)
                    reject(err);
               }else{
                   console.log(`servico atualizado com sucesso `)
                   console.log(result)
                    resolve(result);
               }
            })
             
       
            })
    }

} 