/// <reference types="cypress" />
import usuariosSchema from '../fixtures/contracts/usuarios.contract'

describe('Testes de API - Usuários (ServeRest)', () => {

    // 1. Teste de Contrato: Garante que a estrutura do JSON não mudou
    it('Deve validar o contrato de usuários com sucesso', () => {
        cy.request('https://serverest.dev/usuarios').then(response => {
            return usuariosSchema.validateAsync(response.body)
        })
    });

    // 2. Teste de Listagem (GET): Verifica se a API retorna os dados corretamente
    it('Deve listar usuários cadastrados com sucesso', () => {
        cy.request({
            method: 'GET',
            url: 'https://serverest.dev/usuarios'
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('usuarios')
            expect(response.duration).to.be.lessThan(500)
        })
    });

    // 3. Teste de Cadastro (POST): Cria um usuário novo com e-mail aleatório
    it('Deve cadastrar um usuário com sucesso', () => {
        let emailAleatorio = `mirla_qa${Math.floor(Math.random() * 100000)}@ebac.com.br`
        
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/usuarios',
            body: {
                "nome": "Mirla Software Engineer",
                "email": emailAleatorio,
                "password": "teste",
                "administrador": "true"
            }
        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
    });

    // 4. Teste de Erro (Cenário Negativo): Tenta cadastrar um e-mail já existente
    it('Deve validar erro ao cadastrar usuário com e-mail repetido', () => {
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/usuarios',
            failOnStatusCode: false, 
            body: {
                "nome": "Usuário Repetido",
                "email": "beltrano@qa.com.br", 
                "password": "teste",
                "administrador": "true"
            }
        }).then((response) => {
            expect(response.status).to.equal(400)
            expect(response.body.message).to.equal('Este email já está sendo usado')
        })
    });

});