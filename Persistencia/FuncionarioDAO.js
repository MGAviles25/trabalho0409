import Funcionario from "../Modelo/funcionario.js";
import conectar from "./conexao.js";

export default class FuncionarioDAO {

    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS funcionario (
                    func_codigo INT NOT NULL AUTO_INCREMENT,
                    func_nome VARCHAR(100) NOT NULL,
                    func_cargo VARCHAR(100) NOT NULL,
                    func_salario DECIMAL(10, 2) NOT NULL DEFAULT 0,
                    depto_codigo INT NOT NULL,
                    CONSTRAINT pk_funcionario PRIMARY KEY (func_codigo),
                    CONSTRAINT fk_funcionario_departamento FOREIGN KEY (depto_codigo) REFERENCES departamento(depto_codigo)
                );
            `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(funcionario) {
        if (funcionario instanceof Funcionario) {
            const sql = "INSERT INTO funcionario(func_nome, func_cargo, func_salario, depto_codigo) VALUES(?, ?, ?, ?)";
            const parametros = [funcionario.nome, funcionario.cargo, funcionario.salario, funcionario.deptoCodigo];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            funcionario.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(funcionario) {
        if (funcionario instanceof Funcionario) {
            const sql = "UPDATE funcionario SET func_nome = ?, func_cargo = ?, func_salario = ?, depto_codigo = ? WHERE func_codigo = ?";
            const parametros = [funcionario.nome, funcionario.cargo, funcionario.salario, funcionario.deptoCodigo, funcionario.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(funcionario) {
        if (funcionario instanceof Funcionario) {
            const sql = "DELETE FROM funcionario WHERE func_codigo = ?";
            const parametros = [funcionario.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta) {
        let sql = '';
        let parametros = [];
        const conexao = await conectar();
        let listaFuncionarios = [];

        if (!isNaN(parseInt(parametroConsulta))) {
            sql = "SELECT * FROM funcionario WHERE func_codigo = ? ORDER BY func_nome";
            parametros = [parametroConsulta];
        } else {
            if (!parametroConsulta) {
                parametroConsulta = '';
            }
            sql = "SELECT * FROM funcionario WHERE func_nome LIKE ? ORDER BY func_nome";
            parametros = ['%' + parametroConsulta + '%'];
        }

        const [registros] = await conexao.execute(sql, parametros);

        for (const registro of registros) {
            const funcionario = new Funcionario(
                registro.func_codigo,
                registro.func_nome,
                registro.func_cargo,
                registro.func_salario,
                registro.depto_codigo
            );
            listaFuncionarios.push(funcionario);
        }

        return listaFuncionarios;
    }
}
