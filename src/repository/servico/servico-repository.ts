import { FieldPacket, QueryError } from "mysql2";
import { conn } from "../../database/dataBaseConfig";
import { ServicoArgs } from "../../dtos/args/servico-args";
import { Servico } from "../../dtos/models/servicos/servico-model";
import { CreateServicoInput } from "../../dtos/inputs/create-servico-input";


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


    async create(servico:Servico){

        return new Promise( (resolve,reject ) =>{
            let {
            aplicacao,
            ativo,
            codigo,
            data_cadastro,
            data_recadastro,
            id,
            tipo_serv,
            valor,
            } = servico
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
                                     ${valor},
                                    '${aplicacao}',
                                    ${tipo_serv},
                                   '${data_cadastro}',
                                   '${data_recadastro}', 
                                  '${ativo}'
                                   )
                            `;

                let dados = [  valor, aplicacao, tipo_serv, data_cadastro, data_recadastro, ativo] 
                              conn.query(sql,   (err:any, result:ResultSetHeader )=>{
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

 async update( empresa:any, servico:any ){
  
  
        const {
            codigo,
            id,
            valor,
            aplicacao,
            tipo_serv,
            data_cadastro,
            data_recadastro,
            ativo
        } = servico;
  
        return new Promise( async( resolve, reject)=>{
            let sql = 
            `
            UPDATE ${empresa}.servicos SET 
              id = ${id},
              valor = ${valor},
              aplicacao = '${aplicacao}',
              tipo_serv = ${tipo_serv},
              data_cadastro = '${data_cadastro}',
              data_recadastro = '${data_recadastro}',
              ativo = '${ativo}'
                where codigo = ${codigo}
              `
       
            await conn.query(sql, (err:any, result:any )=>{
                if(err){
                    console.log(err)
                    reject(err);
               }else{
                   console.log(`servico atualizado com sucesso `)
                    resolve(result);
               }
            })
       
            })
    }

} 