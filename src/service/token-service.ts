import jwt from 'jsonwebtoken'
import 'dotenv/config'


type decoded = {
        cnpj: string,
        email: string,
        senha: string,
        iat: number
}


interface responseDecodToken  { 
    erro:boolean,
    msg?:string
    payload?:decoded 
}

export class TokenService{


    async generatedToken( email:string, senha:string , cnpj:string):Promise<string> {

        let secret = String(process.env.SECRET);
        const token = jwt.sign(
                    { cnpj:cnpj, email: email, senha: senha }, secret  
                )
                return token
            }



    
    DecodedToken( token:string ): responseDecodToken {
        const secret = process.env.SECRET;
        if(!secret ){
            return { erro: true, msg: `secret nao informado`}
        }
        let decoded ;
            jwt.verify( token, secret , (err:any, decodedPayload: any )=>{
                    if(err){
            
                    if (err.name === 'TokenExpiredError') {
                            //return res.status(401).json({ msg: 'Token expirado.' });
                        console.log(err.name)
                        return { erro:"true", msg: `'Token expirado. ' ${err.name}`}

                    }
                     //   console.log(`Erro na verificação do jwt `, err.message);
                        return { erro:"true", msg: `Erro na verificação do jwt ${err.message}`}
                    }  
                    if(!decodedPayload || !decodedPayload.cnpj){
                        console.log("Payoad do jwt invalido ", decodedPayload);
                        return { erro:"true", msg: `Payoad do jwt invalido ${decodedPayload}`}
                    }
                    decoded = decodedPayload;
                    
                })
                
      return { erro: false ,   payload:decoded, msg:''}

}
        
    }
