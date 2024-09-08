import FuncionarioDAO from "../Persistencia/funcionarioDAO.js";

export default class Funcionario {
    #codigo;
    #nome;
    #cargo;
    #salario;
    #deptoCodigo;

    constructor(codigo = 0, nome = '', cargo = '', salario = 0, deptoCodigo = 0) {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#cargo = cargo;
        this.#salario = salario;
        this.#deptoCodigo = deptoCodigo;
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get cargo() {
        return this.#cargo;
    }

    set cargo(novoCargo) {
        this.#cargo = novoCargo;
    }

    get salario() {
        return this.#salario;
    }

    set salario(novoSalario) {
        this.#salario = novoSalario;
    }

    get deptoCodigo() {
        return this.#deptoCodigo;
    }

    set deptoCodigo(novoDeptoCodigo) {
        this.#deptoCodigo = novoDeptoCodigo;
    }

    toJSON() {
        return {
            codigo: this.#codigo,
            nome: this.#nome,
            cargo: this.#cargo,
            salario: this.#salario,
            deptoCodigo: this.#deptoCodigo
        };
    }

    async gravar() {
        const funcDAO = new FuncionarioDAO();
        await funcDAO.gravar(this);
    }

    async atualizar() {
        const funcDAO = new FuncionarioDAO();
        await funcDAO.atualizar(this);
    }

    async excluir() {
        const funcDAO = new FuncionarioDAO();
        await funcDAO.excluir(this);
    }

    async consultar(parametro) {
        const funcDAO = new FuncionarioDAO();
        return await funcDAO.consultar(parametro);
    }
}
