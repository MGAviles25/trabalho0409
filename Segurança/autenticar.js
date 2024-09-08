import { assinar, verificarAssiantura } from "./funcoesJWT,js";

export function login(req,resp){

    const usuario = req.body.usuario;
    const senha = req.body.senho;

    if (usuario === 'admin' && senha === 'admin'){

        req.session.usuario = usuario;
    }
    else {
        resap.status(401).json({
                status: false,
                mensagem: 'Usuario ou senha inválido',
                token: assinar(usuario)}
            )
    }
}

export function logout(req,resp){
    
        req.session.destroy();
}

export function verificarAutenticacao(req, resp, next){

    const token = req.headers ['authorization'];
    let tokenVerificado = undefined;
    if (token){
        tokenVerificado = verificarAssinatura(token);
        if (tokenVerificado != undefinied && tokenVerificado.usuario == req.session.usuario ){
            next();
        }
    }
    else{
        resp.status(401).json(
            {
                status: false,
                mensagem: 'Token ausente!'
            }
        );
    }
}