import Departamento from "../Modelo/departamento.js";
import conectar from "./conexao.js";

export default class DepartamentoDAO {

    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS departamento(
                    depto_codigo INT NOT NULL AUTO_INCREMENT,
                    depto_nome VARCHAR(100) NOT NULL,
                    CONSTRAINT pk_departamento PRIMARY KEY(depto_codigo)
                );
            `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(departamento) {
        if (departamento instanceof Departamento) {
            const sql = "INSERT INTO departamento(depto_nome) VALUES(?)";
            const parametros = [departamento.nome];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            departamento.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(departamento) {
        if (departamento instanceof Departamento) {
            const sql = "UPDATE departamento SET depto_nome = ? WHERE depto_codigo = ?";
            const parametros = [departamento.nome, departamento.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(departamento) {
        if (departamento instanceof Departamento) {
            const sql = "DELETE FROM departamento WHERE depto_codigo = ?";
            const parametros = [departamento.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta) {
        let sql = '';
        let parametros = [];
        if (!isNaN(parseInt(parametroConsulta))) {
            sql = 'SELECT * FROM departamento WHERE depto_codigo = ? ORDER BY depto_nome';
            parametros = [parametroConsulta];
        } else {
            if (!parametroConsulta) {
                parametroConsulta = '';
            }
            sql = "SELECT * FROM departamento WHERE depto_nome LIKE ?";
            parametros = ['%' + parametroConsulta + '%'];
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        let listaDepartamentos = [];
        for (const registro of registros) {
            const departamento = new Departamento(registro.depto_codigo, registro.depto_nome);
            listaDepartamentos.push(departamento);
        }
        return listaDepartamentos;
    }
}
