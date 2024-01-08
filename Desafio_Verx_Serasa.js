<reference types="cypress" />

describe('Manipulação Trello via API', () => {
    //declaraçao das constantes board, lista e cartao
    let id_quadro;
    let id_lista;
    let id_cartao;

    it('Cria um board', () => {
        //declaraçao das constantes key e token
        const title = 'Automação API Trello';
        const apiKey = Cypress.env("api_key");
        const apiToken = Cypress.env("api_token");

        cy.request({
            method: 'POST',
            url: `https://api.trello.com/1/boards/?name=${title}&key=${APIK}&token=${APIT}`,
            body: { defaultLists: false }
        }).then((response) => {
            expect(response.status).to.equal(200);
            id_quadro = response.body.id;
            expect(response.body.name).to.equal(title);
        });
    });

    it('Cria uma Lista via API', () => {
        //declaraçao das constantes key e token
        const title = 'Automação API Trello';
        const APIK = Cypress.env("APIK");
        const APIT = Cypress.env("APIT");

        expect(id_quadro).to.not.be.undefined;

        cy.request({
            method: 'POST',
            url: `https://api.trello.com/1/lists?name=${listName}&idBoard=${id_quadro}&key=${APIK}&token=${APIT}`,
        }).then((response) => {
            expect(response.status).to.equal(200);
            id_lista = response.body.id;
            expect(response.body.name).to.equal(title);
        });
    });

    it('Cria um Card via API', () => {
        //declaraçao das constantes key e token
        const title = 'Cria um Card';
        const APIK = Cypress.env("APIK");
        const APIT = Cypress.env("APIT");

        expect(id_lista).to.not.be.undefined;

        cy.request({
            method: 'POST',
            url: `https://api.trello.com/1/cards?idList=${id_lista}&key=${APIK}&token=${APIT}`,
            body: { name: title },
        }).then((response) => {
            expect(response.status).to.equal(200);
            id_cartao = response.body.id;
            expect(response.body.name).to.equal(title);
        })

    })

    it('Deleta o quadro via API', () => {
        //declaraçao das constantes key e token
        const APIK = Cypress.env("APIK");
        const APIT = Cypress.env("APIT");

        expect(id_quadro).to.not.be.undefined;

        cy.request({
            method: 'DELETE',
            url: `https://api.trello.com/1/boards/${id_quadro}?key=${APIK}&token=${APIT}`,
        }).then((response) => {
            expect(response.status).to.equal(200);
        });
    })
    it('Deleta o cartao via API', () => {
        //declaraçao das constantes key e token
        const APIK = Cypress.env("APIK");
        const APIT = Cypress.env("APIT");

        expect(id_cartao).to.not.be.undefined;

        cy.request({
            method: 'DELETE',
            url: `https://api.trello.com/1/cards/${id_cartao}?key=${APIK}&token=${APIT}`,
        }).then((response) => {
            expect(response.status).to.equal(200);
        });
    })

});
