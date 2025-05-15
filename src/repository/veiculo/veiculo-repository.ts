import { conn } from "../../database/dataBaseConfig";
import { VeiculoArgs } from "../../dtos/args/veiculo-args";
import { CreateVeiculoInput } from "../../dtos/inputs/veiculo/create-veiculo-input";
import { UpdateVeiculoInput } from "../../dtos/inputs/veiculo/update-veiculo-input";
import { Veiculo } from "../../dtos/models/veiculo/veiculo-model";



type ResultSetHeader = {
     fieldCount: number,
    affectedRows: number,
    insertId: number,
    info: any,
    serverStatus: number,
    warningStatus: number,
    changedRows: number
}

export class VeiculoRepository{

    dbName = `\`${57473685000100}\``;

    async findAll():Promise <Veiculo[]> {
        return new Promise((resolve, reject )=>{

            const sql = `
            select 
            *,
            DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT ( data_recadastro, '%Y-%m-%d %H:%m:%s') AS data_recadastro    
            from 
            ${this.dbName}.veiculos
            `
            conn.query(sql, ( err:any, result:Veiculo[] )=>{
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    }

    async findByCode( codigo:number ):Promise<Veiculo[]> {
        return new Promise((resolve, reject )=>{

            const sql = `
            select 
            *,
            DATE_FORMAT(data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT ( data_recadastro, '%Y-%m-%d %H:%m:%s') AS data_recadastro    
            from 
            ${this.dbName}.veiculos where codigo = ? 
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


    async findByParam( param:Partial<VeiculoArgs> ): Promise <Veiculo[]> {
            return new Promise((resolve,reject ) =>{
    
                const sql = 
                `
                SELECT *, 
                DATE_FORMAT( data_cadastro, '%Y-%m-%d %H-%m-%s') as data_cadastro,
                DATE_FORMAT( data_recadastro, '%Y-%m-%d %H:%m:%s') as data_recadastro  
                FROM ${ this.dbName }.veiculos 
                `
    
                let conditions = [];
                let valueParamSql = [];
    
                if( param.codigo){
                    conditions.push( " codigo = ? ")
                    valueParamSql.push(param.codigo)
                }

                if( param.cliente){
                    conditions.push( " cliente = ? ")
                    valueParamSql.push(param.cliente)
                }

                if( param.combustivel){
                    conditions.push( " combustivel = ? ")
                    valueParamSql.push(param.combustivel)
                }
                
                if( param.cor){
                    conditions.push( " cor = ? ")
                    valueParamSql.push(param.cor)
                }

                if( param.id){
                    conditions.push( " id = ? ")
                    valueParamSql.push(param.id)
                }

                if( param.marca){
                    conditions.push( " marca = ? ")
                    valueParamSql.push(param.marca)
                }
                if( param.modelo){
                    conditions.push( " modelo = ? ")
                    valueParamSql.push(param.modelo)
                }
                if( param.placa){
                    conditions.push( " placa = ? ")
                    valueParamSql.push(param.placa)
                }
            
                
                if( param.ano ){
                    conditions.push( " ano = ? ");
                    valueParamSql.push(param.ano);
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
                            console.log("Erro ao tentar consultar os Veiculos")
                            reject(err)
                        }else{
                            resolve(result)
                        }
                    })
    
            })
        }

             async insert(veiculo: CreateVeiculoInput): Promise<ResultSetHeader> {
                return new Promise((resolve, reject) => {
                    let sql =
                        `  
                 INSERT INTO 
                 ${this.dbName}.veiculos
                      (   
                        id,
                        cliente,
                        placa,
                        marca,
                        modelo,
                        ano,
                        cor,
                        combustivel,
                        data_cadastro,
                        data_recadastro,
                        ativo
                       ) values
                        (
                          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );
                    `
                    const dados = [veiculo.id, veiculo.cliente, veiculo.placa, veiculo.marca, veiculo.modelo, veiculo.ano,
                    veiculo.cor, veiculo.combustivel,  veiculo.data_cadastro, veiculo.data_recadastro, veiculo.ativo]
        
                    conn.query(sql, dados, (err: any, result: ResultSetHeader | any) => {
                        if (err) reject(err);
                        resolve(result)
                    })
                })
            }
 

     async update(veiculo:UpdateVeiculoInput): Promise<ResultSetHeader>{
                return new Promise((resolve,reject ) =>{

                let sql = `
                    UPDATE ${ this.dbName }.veiculos SET 
                ` 

                let conditions=[]
                let values=[]

                if( veiculo.ano){
                    conditions.push(" ano = ? ")
                    values.push(veiculo.ano)
                }
                if( veiculo.ativo){
                    conditions.push(" ativo = ? ")
                    values.push(veiculo.ativo)
                }
                
                if( veiculo.cliente){
                    conditions.push(" cliente = ? ")
                    values.push(veiculo.cliente)
                }

                if( veiculo.combustivel){
                    conditions.push(" combustivel = ? ")
                    values.push(veiculo.combustivel)
                }
                if( veiculo.cor){
                    conditions.push(" cor = ? ")
                    values.push(veiculo.cor)
                }
                if( veiculo.data_cadastro){
                    conditions.push(" data_cadastro = ? ")
                    values.push(veiculo.data_cadastro)
                }
                if( veiculo.data_recadastro){
                    conditions.push(" data_recadastro = ? ")
                    values.push(veiculo.data_recadastro)
                }
                if(veiculo.id){
                    conditions.push(" id = ? ")
                    values.push(veiculo.id)
                }
                
                if(veiculo.marca){
                    conditions.push(" marca = ? ")
                    values.push(veiculo.marca)
                }
                if(veiculo.modelo){
                    conditions.push(" modelo = ? ")
                    values.push(veiculo.modelo)
                }
                
                if(veiculo.placa){
                    conditions.push(" placa = ? ")
                    values.push(veiculo.placa)
                }
                values.push(veiculo.codigo)

           let whereClause = " WHERE CODIGO = ? "
                
           let finalSql = conditions.join( ' , ') + whereClause
                
                   conn.query(finalSql, values, (err: any, result: ResultSetHeader | any) => {
                        if (err) reject(err);
                        resolve(result)
                    })

                })
                
                
            }
} 