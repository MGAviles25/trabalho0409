import DepartamentoDAO from "../Persistencia/DepartamentoDAO.js";

export default class Departamento {
    #codigo;
    #nome;

    constructor(codigo = 0, nome = '') {
        this.#codigo = codigo;
        this.#nome = nome;
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

    toJSON() {
        return {
            codigo: this.#codigo,
            nome: this.#nome
        };
    }

    async gravar() {
        const deptoDAO = new DepartamentoDAO();
        await deptoDAO.gravar(this);
    }

    async atualizar() {
        const deptoDAO = new DepartamentoDAO();
        await deptoDAO.atualizar(this);
    }

    async excluir() {
        const deptoDAO = new DepartamentoDAO();
        await deptoDAO.excluir(this);
    }

    async consultar(parametro) {
        const deptoDAO = new DepartamentoDAO();
        return await deptoDAO.consultar(parametro);
    }
}
