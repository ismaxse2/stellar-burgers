/// <reference types="cypress" />
declare global {
  namespace Cypress {
    interface Chainable {
      setupBurgerApiMocks(): Chainable<void>;
      visitConstructorWithAuth(): Chainable<void>;
      addIngredient(name: string): Chainable<void>;
      openFirstIngredientModal(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('setupBurgerApiMocks', () => {
  cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
    'getIngredients'
  );

  cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');

  cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
    'createOrder'
  );
});

Cypress.Commands.add('visitConstructorWithAuth', () => {
  cy.visit('/', {
    onBeforeLoad(win) {
      win.localStorage.setItem('refreshToken', 'test-refresh-token');
    }
  });

  cy.setCookie('accessToken', 'test-access-token');
  cy.wait('@getIngredients');
});

Cypress.Commands.add('addIngredient', (name: string) => {
  cy.contains(name).parents('li').contains('Добавить').click();
});

Cypress.Commands.add('openFirstIngredientModal', () => {
  cy.get('[data-cy^="ingredient-"]').first().click();
});

export {};
