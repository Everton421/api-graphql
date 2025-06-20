import { FieldPacket, QueryError } from "mysql2";
import { conn } from "../../database/dataBaseConfig";
import { ServicoArgs } from "../../dtos/args/servico-args";
import { Servico } from "../../dtos/models/servicos/servico-model";
import { CreateServicoInput } from "../../dtos/inputs/servico/create-servico-input";
import { UpdateServicoInput } from "../../dtos/inputs/servico/update-servico-input";


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



    async findAll(dbname:string):Promise <Servico[]> {
        return new Promise((resolve, reject )=>{

            const sql = `
            select 
            *,
            DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT ( data_recadastro, '%Y-%m-%d %H:%m:%s') AS data_recadastro    
            from 
            ${dbname}.servicos
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

    async findByCode( codigo:number, dbname:string ):Promise<Servico[]> {
        return new Promise((resolve, reject )=>{

            const sql = `
            select 
            *,
            DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT ( data_recadastro, '%Y-%m-%d %H:%m:%s') AS data_recadastro    
            from 
            ${dbname}.servicos where codigo = ? 
            `
            conn.query(sql, codigo, ( err:any, result:any )=>{
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    }

    async findByParam( param:Partial<ServicoArgs>, dbname:string ): Promise <Servico[]> {
        return new Promise((resolve,reject ) =>{

            const sql = 
            `
            SELECT *, 
            DATE_FORMAT( data_cadastro, '%Y-%m-%d %H-%m-%s') as data_cadastro,
            DATE_FORMAT( data_recadastro, '%Y-%m-%d %H:%m:%s') as data_recadastro  
            FROM ${ dbname }.servicos 
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

                conn.query(finalSql, valueParamSql, ( err:any  ,result:any  )=>{
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


    async insert ( servico:CreateServicoInput, dbname:string): Promise<ResultSetHeader>{

       return new Promise(   ( resolve, reject)=>{
            let {
             
                valor,
                aplicacao,
                tipo_serv,
                data_cadastro,
                data_recadastro,
                ativo
                    } = servico

                const sql =` INSERT INTO  ${dbname}.servicos  
                             (
                            valor ,
                            aplicacao,
                            tipo_serv,
                            data_cadastro,
                            data_recadastro, 
                            ativo
                                ) VALUES (
                                     ? ,? ,? ,?, ?, ?
                                   )
                            `;

                            const values = [  valor ,  aplicacao ,  tipo_serv ,  data_cadastro ,   data_recadastro  ,  ativo  ]

                
                              conn.query(sql, values,  (err:any, result:ResultSetHeader | any )=>{
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

 async update(   servico:UpdateServicoInput, dbname:string ):Promise<ResultSetHeader>{
   
  
        return new Promise(  ( resolve, reject)=>{
            let sql = 
            `
            UPDATE ${ dbname }.servicos SET 
            
              `
                let conditions=[];
                let values=[];

                if( servico.aplicacao){
                    conditions.push(" aplicacao = ? ")
                    values.push(servico.aplicacao)
                }
                if(servico.ativo ){
                    conditions.push(" ativo = ? ")
                    values.push(servico.ativo)
                }
                if( servico.id){
                    conditions.push(" id = ? ")
                    values.push(servico.id)
                }
                if( servico.tipo_serv){
                    conditions.push(" tipo_serv = ? ")
                    values.push(servico.tipo_serv)
                }
                if(servico.valor ){
                    conditions.push(" valor = ? ")
                    values.push(servico.valor)
                }

                 if(servico.data_cadastro ){
                    conditions.push(" data_cadastro = ? ")
                    values.push(servico.data_cadastro)
                }
                if(servico.data_recadastro ){
                    conditions.push(" data_recadastro = ? ")
                    values.push(servico.data_recadastro)
                }
                let whereClause = " WHERE codigo = ? "
                values.push(servico.codigo)

                let finalSql = sql + conditions.join(" , ")+ whereClause;

       
              conn.query(finalSql,values, (err:QueryError | null, result:ResultSetHeader | any )=>{
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