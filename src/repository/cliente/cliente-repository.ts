import { rejects } from "assert";
import { resolve } from "path";
import { ICLiente } from "./ICliente";
import { conn } from "../../database/dataBaseConfig";
import { ClienteArgs } from "../../dtos/args/cliente-args";
import { Cliente } from "../../dtos/models/clientes/cliente-model";
import { CreateClienteInput } from "../../dtos/inputs/cliente/create-cliente-input";
import { UpdateClienteInput } from "../../dtos/inputs/cliente/update-cliente-input";
import { validate } from "graphql";

type ResultSetHeader = {
    fieldCount: number,
    affectedRows: number,
    insertId: number,
    info: any,
    serverStatus: number,
    warningStatus: number,
    changedRows: number
}

export class ClienteRepository {


    async findAll( dbname:string ): Promise<ICLiente[]> {
        return new Promise((resolve, reject) => {
            const sql = ` SELECT * FROM ${dbname}.clientes`;

            conn.query(sql, (err, result: ICLiente[]) => {
                if (err) {
                    console.log("Erro ao consultar clientes ", err)
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    async findByParam(param: Partial<ClienteArgs>, dbname:string ): Promise<ICLiente[]> {
        return new Promise((resolve, reject) => {

            const sql = `
            SELECT *,
            DATE_FORMAT( data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT( data_recadastro, '%Y-%m-%d %H:%i:%s') as data_recadastro
            FROM ${dbname}.clientes 
            `

            let conditions = [];
            let valueParamSql = [];

            if (param.codigo) {
                conditions.push(" codigo = ? ")
                valueParamSql.push(param.codigo);
            }
            if (param.nome) {
                conditions.push(" nome like   ? ")
                valueParamSql.push(`%${param.nome}$`);
            }
            if (param.ativo) {
                conditions.push(" ativo = ? ")
                valueParamSql.push(param.ativo);
            }
            if (param.cnpj) {
                conditions.push(" cnpj = ? ")
                valueParamSql.push(param.cnpj)
            }
            if (param.vendedor) {
                conditions.push(" vendedor = ? ")
                valueParamSql.push(param.vendedor)
            }
            if (param.data_recadastro) {
                conditions.push(" data_recadastro > ? ")
                valueParamSql.push(param.data_recadastro);
            }

            let whereClause = "";

            if (valueParamSql.length > 0) {
                whereClause = ' WHERE ' + conditions.join(" AND ")
            }

            let finalSql = sql + whereClause

            conn.query(finalSql, valueParamSql, (err, result: ICLiente[]) => {
                if (err) {
                    console.log("erro ao consultar os clientes ", err);
                    reject(err)
                } else {
                    resolve(result)
                }

            })

        })
    }

    async findByCode(code: number, dbname:string ): Promise<Cliente[]> {
        return new Promise((resolve, reject) => {
            const sql = `
            SELECT *,
            DATE_FORMAT( data_cadastro, '%Y-%m-%d') AS data_cadastro,
            DATE_FORMAT( data_recadastro, '%Y-%m-%d %H:%i:%s') as data_recadastro
            FROM ${dbname}.clientes WHERE codigo = ? 
            `
            conn.query(sql, code, (err, result: Cliente[] | any) => {
                if (err) {
                    console.log("erro ao consultar os clientes ", err);
                    reject(err)
                } else {
                    resolve(result)
                }

            })
        })

    }

    async insert(cliente: CreateClienteInput, dbname:string): Promise<ResultSetHeader> {
        return new Promise((resolve, reject) => {
            let sql =
                `  
         INSERT INTO 
         ${dbname}.clientes
              (   
                celular, 
                nome ,
                cep ,
                endereco ,
                ie ,
                numero ,
                cnpj ,
                cidade ,
                data_cadastro ,
                data_recadastro ,
                vendedor,
                bairro,
                estado 
               ) values
                (
                  ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );
            `
            const dados = [cliente.celular, cliente.nome, cliente.cep, cliente.endereco, cliente.ie, cliente.numero,
            cliente.cnpj, cliente.cidade, cliente.data_cadastro, cliente.data_recadastro, cliente.vendedor, cliente.bairro, cliente.estado]

            conn.query(sql, dados, (err: any, result: ResultSetHeader | any) => {
                if (err) reject(err);
                resolve(result)
            })
        })
    }

    async update(cliente: UpdateClienteInput, dbname:string):Promise<ResultSetHeader>{

        return new Promise((resolve, reject ) =>{
            let sql = `UPDATE ${dbname}.clientes SET 
            ` 

            let conditions=[];
            let values =[];

            if( cliente.ativo){
                conditions.push(" ativo = ? ")
                values.push(cliente.ativo);
            }
            if(cliente.bairro){
                conditions.push(" bairro = ? ")
                values.push(cliente.bairro)
            }
            if( cliente.celular){
                conditions.push(" celular = ? ")
                values.push(cliente.celular)
            }
            if(cliente.cep){
                conditions.push(" cep = ? ")
                values.push(cliente.cep)
            }
            if(cliente.cidade){
                conditions.push(" cidade = ? ")
                values.push(cliente.cidade)
            }
            if(cliente.cnpj){
                conditions.push( " cnpj = ? ")
                values.push(cliente.cnpj)
            }
            if(cliente.data_cadastro){
                conditions.push(" data_cadastro")
                values.push(cliente.data_cadastro)
            }   
            if( cliente.data_recadastro){
                conditions.push(" data_recadastro = ? ")
                values.push(cliente.data_recadastro)
            }
            if(cliente.endereco){
                conditions.push(" endereco = ? ")
                values.push(cliente.endereco)
            }
            if(cliente.estado){
                conditions.push(" estado = ? ")
                values.push(cliente.estado)
            }
            if(cliente.id){
                conditions.push(" id = ? ")
                values.push(cliente.id)
            }
            if(cliente.ie){
                conditions.push( " ie = ? ")
                values.push(cliente.ie)
            }   
            if(cliente.nome){
                conditions.push(" nome = ? ")
                values.push(cliente.nome)
            }   
            if(cliente.numero){
                conditions.push(" numero = ? ")
                values.push(cliente.numero)
            }

            if(cliente.vendedor){
                conditions.push(" vendedor = ? ")
                values.push(cliente.vendedor)
            }
                
            conditions.join(' , ')
            
            values.push(cliente.codigo)
            let finalSql =  sql + conditions + " WHERE codigo = ? "


                conn.query(finalSql, values , (err, result: ResultSetHeader | any )=>{
                    if(err){
                        reject(err)
                    }else{
                        console.log("cliente alterado com sucesso")
                        resolve(result)
                    }
                })

        })  
    }

}

