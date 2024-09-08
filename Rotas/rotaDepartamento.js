import { Router } from "express";
import DepartamentoCtrl from "../Controle/DepartamentoCtrl.js";

const deptoCtrl = new DepartamentoCtrl();
const rotaDepartamento = new Router();

rotaDepartamento
    .get('/', deptoCtrl.consultar)
    .get('/:termo', deptoCtrl.consultar)
    .post('/', deptoCtrl.gravar)
    .patch('/', deptoCtrl.atualizar)
    .put('/', deptoCtrl.atualizar)
    .delete('/', deptoCtrl.excluir);

export default rotaDepartamento;
