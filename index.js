import express from 'express';
import cors from 'cors';
import rotaDepartamento from './Rotas/rotaDepartamento.js';
import rotaFuncionario from './Rotas/rotaFuncionario.js';
import session from 'express-session';
import dotenv from 'dotenv';
import rotaAutenticacao from './Rotas/rotaAutenticacao.js';
import {verificarAutenticacao} from './Segurança/autenticar.js';

dotenv.config();

const host = 'localhost';  
const porta = 3000;       
 
const app = express();

app.use(session({
    secret: process.env.CHAVE_SECRETA,
    resave: false,
    saveUnitialized: true,
    cookies: { maxAge: 1000 * 60 * 15 }

}))

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/departamento',verificarAutenticacao,rotaDepartamento);
app.use('/funcionario',verificarAutenticacao,rotaFuncionario);
app.use('/Autenticacao', rotaAutenticacao);

app.listen(porta, host, () => {
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
});
