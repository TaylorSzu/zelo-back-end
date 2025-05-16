const request = require('supertest');
const app = require('/Users/Aluno SENAI.C308-LAB4-003/Documents/GitHub/zelo-back-end/src/index.js');
const userService = require('../Services/userServices.js');

describe('|----------Testes de Rotas--------|', () => {
    it('Porta do Servidor',  () => {
        expect(app.port).toBe(5171);
    });
    it('Rota Cuidador', async () => {
         expect(app.cuidadorRoutes).toBeDefined();
    });
    it('Rota Agendamento', async () => {
         expect(app.agendamentoRoutes).toBeDefined();
    });
    it('Rota Contratante', async () => {
         expect(app.contratanteRoutes).toBeDefined();
    });
    it('Rota Avaliacao', async () => {
         expect(app.avaliacaoRoutes).toBeDefined();
    });
    it('Rota Idoso', async () => {
         expect(app.idosoRoutes).toBeDefined();
    });
});

