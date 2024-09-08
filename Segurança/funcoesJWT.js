import jwt from 'jsonwebtoken';

export function assinar(usuario){
    
    const token = jwt.sign({usuario}, process.env.CHAVE_SECRETA, {
            expiresIn: '1800s'});
        
    return token;

}

export function verificarAssinatura(){
    return jwt.verify(token, process.env.CHAVE_SECRETA);

}