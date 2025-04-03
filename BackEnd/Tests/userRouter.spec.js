const request = require('supertest');
const app = require('../index.js');

describe('Agendamentos', () => {
    it('Deve criar um agendamento', async () => {
        const response = await request(app)
            .post('/agendamento/confirmar')
            .send({
                "contratanteId": 1,
                "cuidadorId": 1,
                "data": "2023-06-01",
                "dataHoraInicio": "2023-06-01T10:00:00",
                "dataHoraTermino": "2023-06-01T12:00:00",
                "status": "pendente",
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });
});