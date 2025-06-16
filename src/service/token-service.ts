import jwt from 'jsonwebtoken'
import 'dotenv/config'

export class TokenService{


    async generatedToken( email:string, senha:string ):Promise<string> {

        let secret = String(process.env.SECRET);
        const token = jwt.sign(
                    { cnpj:123, email: email, senha: senha }, secret  
                )
                return token
            }


            

        }